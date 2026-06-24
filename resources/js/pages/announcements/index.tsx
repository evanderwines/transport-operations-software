import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowUpRight, CalendarClock, Eye, MapPin, Megaphone, Pencil, Plus, Sparkles, Trash2, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import AnnouncementDeleteDialog from '@/components/announcement-delete-dialog';
import AnnouncementFormDialog from '@/components/announcement-form-dialog';
import AnnouncementPreviewDialog from '@/components/announcement-preview-dialog';
import { useModal } from '@/components/context/modal-context';
import Heading from '@/components/heading';
import { Modal } from '@/components/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { Announcement, BreadcrumbItem, ModalType, PaginationType, SharedData } from '@/types';

interface AnnouncementPageProps extends SharedData {
    announcements: PaginationType<Announcement[]>;
    filters: {
        q?: string;
        status?: string;
        audience?: string;
        scope?: string;
    };
    stats: {
        total: number;
        published: number;
        upcoming: number;
        featured: number;
    };
    statuses: string[];
    audiences: string[];
    canManage: boolean;
    defaultScope: string;
    modal: ModalType;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Announcements',
        href: '/announcements',
    },
];

const audienceLabels: Record<string, string> = {
    ALL: 'All Users',
    CUSTOMER: 'Customers',
    DRIVER: 'Drivers',
    ADMINISTRATOR: 'Administrators',
};

const scopeLabels: Record<string, string> = {
    all: 'All events',
    upcoming: 'Upcoming',
    ongoing: 'Ongoing',
    past: 'Past events',
};

const statusVariant = (status: string) => {
    if (status === 'CANCELLED') {
        return 'destructive' as const;
    }

    if (status === 'PUBLISHED') {
        return 'default' as const;
    }

    if (status === 'POSTPONED') {
        return 'secondary' as const;
    }

    return 'outline' as const;
};

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return 'Schedule not available';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
};

const formatDateRange = (start?: string | null, end?: string | null) => {
    if (!start) {
        return 'Schedule not available';
    }

    if (!end) {
        return formatDateTime(start);
    }

    return `${formatDateTime(start)} to ${formatDateTime(end)}`;
};

export default function AnnouncementsIndex() {
    const { props } = usePage<AnnouncementPageProps>();
    const { content, createModal } = useModal();
    const isOpen = props.sidebarOpen;

    const [query, setQuery] = useState(props.filters.q ?? '');
    const [status, setStatus] = useState(props.filters.status ?? 'all');
    const [audience, setAudience] = useState(props.filters.audience ?? 'all');
    const [scope, setScope] = useState(props.filters.scope ?? props.defaultScope);

    const [previewAnnouncement, setPreviewAnnouncement] = useState<Announcement | null>(null);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);

    useEffect(() => {
        setQuery(props.filters.q ?? '');
        setStatus(props.filters.status ?? 'all');
        setAudience(props.filters.audience ?? 'all');
        setScope(props.filters.scope ?? props.defaultScope);
    }, [props.defaultScope, props.filters.audience, props.filters.q, props.filters.scope, props.filters.status]);

    useEffect(() => {
        if (props.modal?.status) {
            createModal(props.modal);
        }
    }, [createModal, props.modal]);

    const statCards = useMemo(
        () => [
            {
                label: 'Visible Events',
                value: props.stats.total,
                detail: 'Records in the current list scope',
            },
            {
                label: 'Published',
                value: props.stats.published,
                detail: 'Live announcements ready to view',
            },
            {
                label: 'Upcoming',
                value: props.stats.upcoming,
                detail: 'Events still ahead on the calendar',
            },
            {
                label: 'Featured',
                value: props.stats.featured,
                detail: 'Priority events pinned to the top',
            },
        ],
        [props.stats.featured, props.stats.published, props.stats.total, props.stats.upcoming],
    );

    const applyFilters = (event: React.FormEvent) => {
        event.preventDefault();

        router.get(
            '/announcements',
            {
                q: query || undefined,
                status: status === 'all' ? undefined : status,
                audience: audience === 'all' ? undefined : audience,
                scope: scope === props.defaultScope ? undefined : scope,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        router.get('/announcements', {}, { replace: true });
    };

    const openCreateModal = () => {
        setEditingAnnouncement(null);
        setIsFormOpen(true);
    };

    const openEditModal = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setIsFormOpen(true);
    };

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Announcements" />

                <div className="space-y-6 p-4">
                    <section className="overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-800 to-amber-700 px-6 py-7 text-white shadow-sm">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs tracking-[0.35em] text-white/60 uppercase">Events Module</p>
                                <h1 className="mt-3 text-3xl font-semibold tracking-tight">Announcement board for company events</h1>
                                <p className="mt-2 text-sm text-white/75">
                                    Publish briefings, training schedules, assemblies, celebrations, and internal event updates in one place.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                    <p className="text-xs tracking-[0.18em] text-white/60 uppercase">Current View</p>
                                    <p className="mt-2 text-lg font-semibold">
                                        {scopeLabels[props.filters.scope ?? props.defaultScope] ?? 'All events'}
                                    </p>
                                </div>
                                {props.canManage && (
                                    <Button type="button" variant="secondary" onClick={openCreateModal}>
                                        <Plus className="h-4 w-4" />
                                        New event
                                    </Button>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((card) => (
                            <article key={card.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                                <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">{card.label}</p>
                                <p className="mt-3 text-3xl font-semibold text-neutral-900">{card.value}</p>
                                <p className="mt-3 text-sm text-neutral-500">{card.detail}</p>
                            </article>
                        ))}
                    </section>

                    <section className="rounded-2xl border bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                            <Heading
                                title="Event announcements"
                                description={
                                    props.canManage
                                        ? 'Create, publish, and maintain internal event postings for the transport operations team.'
                                        : 'See the latest event announcements that are relevant to your role.'
                                }
                            />
                            {props.canManage && (
                                <Button type="button" onClick={openCreateModal}>
                                    <Megaphone className="h-4 w-4" />
                                    Create announcement
                                </Button>
                            )}
                        </div>

                        <form onSubmit={applyFilters} className="grid gap-3 border-t pt-5 lg:grid-cols-[1.4fr_repeat(3,minmax(0,0.8fr))]">
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search title, venue, summary, organizer"
                            />

                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    {props.statuses.map((statusOption) => (
                                        <SelectItem key={statusOption} value={statusOption}>
                                            {statusOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={audience} onValueChange={setAudience}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All audiences</SelectItem>
                                    {props.audiences.map((audienceOption) => (
                                        <SelectItem key={audienceOption} value={audienceOption}>
                                            {audienceLabels[audienceOption] ?? audienceOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex gap-2">
                                <Select value={scope} onValueChange={setScope}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Scope" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(scopeLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="submit">Apply</Button>
                            </div>
                        </form>

                        <div className="mt-3 flex justify-end">
                            <Button type="button" variant="ghost" onClick={clearFilters}>
                                Clear filters
                            </Button>
                        </div>
                    </section>

                    {props.announcements.data.length > 0 ? (
                        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                            {props.announcements.data.map((announcement) => (
                                <article
                                    key={announcement.announcement_id}
                                    className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge variant={statusVariant(announcement.status)}>{announcement.status}</Badge>
                                                <Badge variant="outline">
                                                    <Users className="h-3 w-3" />
                                                    {audienceLabels[announcement.audience] ?? announcement.audience}
                                                </Badge>
                                                {announcement.is_featured && (
                                                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                                                        <Sparkles className="h-3 w-3" />
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>

                                            <h2 className="mt-4 text-xl font-semibold text-neutral-900">{announcement.title}</h2>
                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">{announcement.summary}</p>
                                        </div>

                                        <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-700">
                                            <CalendarClock className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-5 space-y-3 text-sm text-neutral-600">
                                        <div className="flex items-start gap-2">
                                            <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                                            <span>{formatDateRange(announcement.starts_at, announcement.ends_at)}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                                            <span>{announcement.venue}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                                            <span>{announcement.organizer ?? 'Organizer to be announced'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-xl border bg-neutral-50 p-4 text-sm text-neutral-600">
                                        <p>
                                            Published by{' '}
                                            <span className="font-medium text-neutral-900">{announcement.creator_name ?? 'Unknown user'}</span>
                                        </p>
                                        <p className="mt-1">
                                            {announcement.published_at ? formatDateTime(announcement.published_at) : 'Not published yet'}
                                        </p>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <Button type="button" variant="outline" size="sm" onClick={() => setPreviewAnnouncement(announcement)}>
                                            <Eye className="h-4 w-4" />
                                            View details
                                        </Button>

                                        {announcement.registration_link && (
                                            <Button size="sm" asChild>
                                                <a href={announcement.registration_link} target="_blank" rel="noreferrer">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                    Open link
                                                </a>
                                            </Button>
                                        )}

                                        {props.canManage && (
                                            <Button type="button" variant="secondary" size="sm" onClick={() => openEditModal(announcement)}>
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </Button>
                                        )}

                                        {props.canManage && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setAnnouncementToDelete(announcement)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </section>
                    ) : (
                        <section className="rounded-2xl border border-dashed bg-white px-6 py-12 text-center shadow-sm">
                            <h2 className="text-xl font-semibold text-neutral-900">No event announcements found</h2>
                            <p className="mt-2 text-sm text-neutral-500">
                                Try a broader filter, or create the first event announcement for the team.
                            </p>
                            {props.canManage && (
                                <div className="mt-5">
                                    <Button type="button" onClick={openCreateModal}>
                                        <Plus className="h-4 w-4" />
                                        Create first event
                                    </Button>
                                </div>
                            )}
                        </section>
                    )}

                    <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border bg-white px-5 py-4 text-sm text-neutral-500 shadow-sm md:flex-row md:items-center">
                        <span>
                            Showing {props.announcements.from ?? 0}-{props.announcements.to ?? 0} of {props.announcements.total} announcements
                        </span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={!props.announcements.prev_page_url} asChild>
                                <Link href={props.announcements.prev_page_url ?? ''}>Previous</Link>
                            </Button>
                            <Button variant="outline" size="sm" disabled={!props.announcements.next_page_url} asChild>
                                <Link href={props.announcements.next_page_url ?? ''}>Next</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <AnnouncementFormDialog
                    open={isFormOpen}
                    onOpenChange={(nextOpen) => {
                        setIsFormOpen(nextOpen);
                        if (!nextOpen) {
                            setEditingAnnouncement(null);
                        }
                    }}
                    announcement={editingAnnouncement}
                    statuses={props.statuses}
                    audiences={props.audiences}
                />

                <AnnouncementPreviewDialog
                    open={!!previewAnnouncement}
                    onOpenChange={(nextOpen) => {
                        if (!nextOpen) {
                            setPreviewAnnouncement(null);
                        }
                    }}
                    announcement={previewAnnouncement}
                />

                <AnnouncementDeleteDialog
                    open={!!announcementToDelete}
                    onOpenChange={(nextOpen) => {
                        if (!nextOpen) {
                            setAnnouncementToDelete(null);
                        }
                    }}
                    announcement={announcementToDelete}
                />

                <Modal content={content} />
            </AppLayout>
        </SidebarProvider>
    );
}
