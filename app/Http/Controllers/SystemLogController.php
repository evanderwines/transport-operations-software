<?php

namespace App\Http\Controllers;

use App\Models\SystemLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SystemLogController extends Controller
{
    public function index(Request $request)
    {
        $query = SystemLog::query();

        $search = trim((string) $request->query('q', ''));
        $action = $request->query('action');
        $module = $request->query('module');
        $dateFrom = $request->query('date_from');
        $dateTo = $request->query('date_to');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', '%'.$search.'%')
                    ->orWhere('performed_to', 'like', '%'.$search.'%')
                    ->orWhere('module', 'like', '%'.$search.'%')
                    ->orWhere('action', 'like', '%'.$search.'%');
            });
        }

        if ($action) {
            $query->where('action', $action);
        }

        if ($module) {
            $query->where('module', $module);
        }

        if ($dateFrom && $dateTo) {
            $query->whereBetween('datelog', [$dateFrom, $dateTo]);
        } elseif ($dateFrom) {
            $query->where('datelog', '>=', $dateFrom);
        } elseif ($dateTo) {
            $query->where('datelog', '<=', $dateTo);
        }

        $logs = (clone $query)
            ->orderBy('datelog', 'desc')
            ->orderBy('timelog', 'desc')
            ->paginate(25)
            ->withQueryString();

        $actionCounts = (clone $query)
            ->selectRaw('action, count(*) as total')
            ->groupBy('action')
            ->pluck('total', 'action');

        $moduleCounts = (clone $query)
            ->selectRaw('module, count(*) as total')
            ->groupBy('module')
            ->pluck('total', 'module');

        $modules = SystemLog::query()->select('module')->distinct()->orderBy('module')->pluck('module');
        $actions = SystemLog::query()->select('action')->distinct()->orderBy('action')->pluck('action');

        return Inertia::render('admin/system-logs', [
            'logs' => $logs,
            'filters' => [
                'q' => $search,
                'action' => $action,
                'module' => $module,
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
            ],
            'stats' => [
                'total' => $logs->total(),
                'actions' => $actionCounts,
                'modules' => $moduleCounts,
            ],
            'modules' => $modules,
            'actions' => $actions,
        ]);
    }
}
