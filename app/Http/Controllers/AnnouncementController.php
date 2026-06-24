<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\SystemLog;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    private const STATUSES = [
        'DRAFT',
        'PUBLISHED',
        'POSTPONED',
        'CANCELLED',
        'ARCHIVED',
    ];

    private const AUDIENCES = [
        'ALL',
        'CUSTOMER',
        'DRIVER',
        'ADMINISTRATOR',
    ];

    private const DEFAULT_ADMIN_SCOPE = 'all';

    private const DEFAULT_USER_SCOPE = 'upcoming';

    public function index(Request $request): Response
    {
        $user = $request->user();
        $canManage = $user?->role === 'ADMINISTRATOR';
        $defaultScope = $canManage ? self::DEFAULT_ADMIN_SCOPE : self::DEFAULT_USER_SCOPE;
        $visibleStatuses = $canManage ? self::STATUSES : ['PUBLISHED', 'POSTPONED', 'CANCELLED'];
        $visibleAudiences = $canManage
            ? self::AUDIENCES
            : array_values(array_unique(array_filter(['ALL', $user?->role])));

        $search = trim((string) $request->query('q', ''));
        $status = (string) $request->query('status', '');
        $audience = (string) $request->query('audience', '');
        $scope = (string) $request->query('scope', $defaultScope);

        if (! in_array($scope, ['all', 'upcoming', 'ongoing', 'past'], true)) {
            $scope = $defaultScope;
        }

        if ($status !== '' && ! in_array($status, $visibleStatuses, true)) {
            $status = '';
        }

        if ($audience !== '' && ! in_array($audience, $visibleAudiences, true)) {
            $audience = '';
        }

        $query = $this->visibleQueryFor($user?->role, $canManage)
            ->with(['creator:id,name', 'updater:id,name']);

        if ($search !== '') {
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('title', 'like', '%'.$search.'%')
                    ->orWhere('summary', 'like', '%'.$search.'%')
                    ->orWhere('venue', 'like', '%'.$search.'%')
                    ->orWhere('organizer', 'like', '%'.$search.'%');
            });
        }

        if ($status !== '' && in_array($status, self::STATUSES, true)) {
            $query->where('status', $status);
        }

        if ($audience !== '' && in_array($audience, self::AUDIENCES, true)) {
            $query->where('audience', $audience);
        }

        $this->applyScopeFilter($query, $scope);

        $stats = $this->buildStats(clone $query);

        $query->orderByDesc('is_featured');

        if ($scope === 'past') {
            $query->orderByDesc('starts_at');
        } else {
            $query->orderBy('starts_at');
        }

        $announcements = $query->paginate(9)->withQueryString();

        return Inertia::render('announcements/index', [
            'announcements' => [
                ...$announcements->toArray(),
                'data' => $announcements->getCollection()
                    ->map(fn (Announcement $announcement) => $this->serializeAnnouncement($announcement))
                    ->values()
                    ->all(),
            ],
            'filters' => [
                'q' => $search,
                'status' => $status,
                'audience' => $audience,
                'scope' => $scope,
            ],
            'stats' => $stats,
            'statuses' => $visibleStatuses,
            'audiences' => $visibleAudiences,
            'canManage' => $canManage,
            'defaultScope' => $defaultScope,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $this->authorizeManagement($request);
        $validated = $this->validateAnnouncement($request);

        dd($validated);

        $announcement = Announcement::create([
            ...$this->payloadForPersistence($validated, $user->id),
            'announcement_id' => (string) Str::orderedUuid(),
            'created_by' => $user->id,
        ]);

        SystemLog::create([
            'datelog' => now()->toDateString(),
            'timelog' => now()->format('H:i:s'),
            'action' => 'ADD',
            'module' => 'ANNOUNCEMENTS',
            'performed_to' => (string) $announcement->announcement_id,
            'description' => 'Event announcement "'.$announcement->title.'" was created.',
        ]);

        return back()->with([
            'modal_status' => 'success',
            'modal_action' => 'create',
            'modal_title' => 'Announcement created!',
            'modal_message' => 'Event announcement "'.$announcement->title.'" is now in the module.',
        ]);
    }

    public function update(Request $request, Announcement $announcement): RedirectResponse
    {
        $user = $this->authorizeManagement($request);
        $validated = $this->validateAnnouncement($request);

        $announcement->update($this->payloadForPersistence($validated, $user->id, $announcement));

        SystemLog::create([
            'datelog' => now()->toDateString(),
            'timelog' => now()->format('H:i:s'),
            'action' => 'UPDATE',
            'module' => 'ANNOUNCEMENTS',
            'performed_to' => (string) $announcement->announcement_id,
            'description' => 'Event announcement "'.$announcement->title.'" was updated.',
        ]);

        return back()->with([
            'modal_status' => 'success',
            'modal_action' => 'update',
            'modal_title' => 'Announcement updated!',
            'modal_message' => 'Event announcement "'.$announcement->title.'" was updated successfully.',
        ]);
    }

    public function destroy(Request $request, Announcement $announcement): RedirectResponse
    {
        $this->authorizeManagement($request);

        $title = $announcement->title;
        $announcementId = $announcement->announcement_id;
        $announcement->delete();

        SystemLog::create([
            'datelog' => now()->toDateString(),
            'timelog' => now()->format('H:i:s'),
            'action' => 'DELETE',
            'module' => 'ANNOUNCEMENTS',
            'performed_to' => (string) $announcementId,
            'description' => 'Event announcement "'.$title.'" was deleted.',
        ]);

        return back()->with([
            'modal_status' => 'success',
            'modal_action' => 'delete',
            'modal_title' => 'Announcement deleted!',
            'modal_message' => 'Event announcement "'.$title.'" was removed successfully.',
        ]);
    }

    private function authorizeManagement(Request $request)
    {
        abort_unless($request->user()?->role === 'ADMINISTRATOR', 403);

        return $request->user();
    }

    private function visibleQueryFor(?string $role, bool $canManage): Builder
    {
        $query = Announcement::query();

        if (! $canManage) {
            $query->whereIn('status', ['PUBLISHED', 'POSTPONED', 'CANCELLED'])
                ->where(function (Builder $builder) use ($role) {
                    $builder->where('audience', 'ALL');

                    if ($role) {
                        $builder->orWhere('audience', $role);
                    }
                });
        }

        return $query;
    }

    private function applyScopeFilter(Builder $query, string $scope): void
    {
        $now = now();

        switch ($scope) {
            case 'past':
                $query->whereRaw('COALESCE(ends_at, starts_at) < ?', [$now]);
                break;

            case 'ongoing':
                $query->where('starts_at', '<=', $now)
                    ->where(function (Builder $builder) use ($now) {
                        $builder->whereNull('ends_at')
                            ->orWhere('ends_at', '>=', $now);
                    });
                break;

            case 'upcoming':
                $query->whereRaw('COALESCE(ends_at, starts_at) >= ?', [$now->copy()->startOfDay()]);
                break;

            case 'all':
            default:
                break;
        }
    }

    private function buildStats(Builder $query): array
    {
        $now = now()->startOfDay();

        return [
            'total' => (clone $query)->count(),
            'published' => (clone $query)->where('status', 'PUBLISHED')->count(),
            'upcoming' => (clone $query)->whereRaw('COALESCE(ends_at, starts_at) >= ?', [$now])->count(),
            'featured' => (clone $query)->where('is_featured', true)->count(),
        ];
    }

    private function validateAnnouncement(Request $request): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'venue' => ['required', 'string', 'max:255'],
            'organizer' => ['nullable', 'string', 'max:255'],
            'audience' => ['required', 'string', Rule::in(self::AUDIENCES)],
            'status' => ['required', 'string', Rule::in(self::STATUSES)],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'registration_link' => ['nullable', 'url', 'max:255'],
            'contact_name' => ['nullable', 'string', 'max:255'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'is_featured' => ['nullable', 'boolean'],
        ]);

        $validated['title'] = trim($validated['title']);
        $validated['summary'] = trim($validated['summary']);
        $validated['description'] = trim($validated['description']);
        $validated['venue'] = trim($validated['venue']);
        $validated['organizer'] = $this->nullableTrim($validated['organizer'] ?? null);
        $validated['registration_link'] = $this->nullableTrim($validated['registration_link'] ?? null);
        $validated['contact_name'] = $this->nullableTrim($validated['contact_name'] ?? null);
        $validated['contact_email'] = $this->nullableTrim($validated['contact_email'] ?? null);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['capacity'] = $validated['capacity'] ?? null;
        $validated['ends_at'] = $validated['ends_at'] ?? null;

        return $validated;
    }

    private function payloadForPersistence(array $validated, int $userId, ?Announcement $announcement = null): array
    {
        return [
            'title' => $validated['title'],
            'summary' => $validated['summary'],
            'description' => $validated['description'],
            'starts_at' => $validated['starts_at'],
            'ends_at' => $validated['ends_at'],
            'venue' => $validated['venue'],
            'organizer' => $validated['organizer'],
            'audience' => $validated['audience'],
            'status' => $validated['status'],
            'capacity' => $validated['capacity'],
            'registration_link' => $validated['registration_link'],
            'contact_name' => $validated['contact_name'],
            'contact_email' => $validated['contact_email'],
            'is_featured' => $validated['is_featured'],
            'published_at' => $this->resolvePublishedAt($validated['status'], $announcement),
            'updated_by' => $userId,
        ];
    }

    private function resolvePublishedAt(string $status, ?Announcement $announcement = null)
    {
        if ($status === 'DRAFT') {
            return null;
        }

        return $announcement?->published_at ?? now();
    }

    private function serializeAnnouncement(Announcement $announcement): array
    {
        return [
            'announcement_id' => $announcement->announcement_id,
            'title' => $announcement->title,
            'summary' => $announcement->summary,
            'description' => $announcement->description,
            'starts_at' => $announcement->starts_at?->toIso8601String(),
            'ends_at' => $announcement->ends_at?->toIso8601String(),
            'starts_at_input' => $announcement->starts_at?->format('Y-m-d\TH:i'),
            'ends_at_input' => $announcement->ends_at?->format('Y-m-d\TH:i'),
            'venue' => $announcement->venue,
            'organizer' => $announcement->organizer,
            'audience' => $announcement->audience,
            'status' => $announcement->status,
            'capacity' => $announcement->capacity,
            'registration_link' => $announcement->registration_link,
            'contact_name' => $announcement->contact_name,
            'contact_email' => $announcement->contact_email,
            'is_featured' => (bool) $announcement->is_featured,
            'published_at' => $announcement->published_at?->toIso8601String(),
            'created_at' => $announcement->created_at?->toIso8601String(),
            'updated_at' => $announcement->updated_at?->toIso8601String(),
            'creator_name' => $announcement->creator?->name,
            'updater_name' => $announcement->updater?->name,
        ];
    }

    private function nullableTrim(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $trimmed = trim($value);

        return $trimmed === '' ? null : $trimmed;
    }
}
