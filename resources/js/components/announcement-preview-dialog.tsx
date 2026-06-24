import { CalendarClock, Link2, Mail, MapPin, Star, UserRound, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Announcement } from '@/types';

interface AnnouncementPreviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    announcement: Announcement | null;
}

const audienceLabels: Record<string, string> = {
    ALL: 'All Users',
    CUSTOMER: 'Customers',
    DRIVER: 'Drivers',
    ADMINISTRATOR: 'Administrators',
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
        return 'Not set';
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

export default function AnnouncementPreviewDialog({ open, onOpenChange, announcement }: AnnouncementPreviewDialogProps) {
    return (
        <Dialog open={open && !!announcement} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{announcement?.title ?? 'Event details'}</DialogTitle>
                    <DialogDescription className="sr-only">Detailed preview of the selected event announcement.</DialogDescription>
                </DialogHeader>

                {announcement && (
                    <div className="space-y-6">
                        <div className="rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-800 to-amber-700 p-5 text-white">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-white text-slate-900">{announcement.status}</Badge>
                                <Badge variant="outline" className="border-white/30 text-white">
                                    {audienceLabels[announcement.audience] ?? announcement.audience}
                                </Badge>
                                {announcement.is_featured && (
                                    <Badge variant="outline" className="border-amber-200 text-amber-100">
                                        <Star className="h-3 w-3" />
                                        Featured
                                    </Badge>
                                )}
                            </div>

                            <p className="mt-4 text-lg font-semibold">{announcement.summary}</p>
                            <p className="mt-3 text-sm text-white/75">
                                Published {announcement.published_at ? formatDateTime(announcement.published_at) : 'when ready to go live'}
                            </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                    <CalendarClock className="h-4 w-4" />
                                    Schedule
                                </div>
                                <p className="mt-2 text-sm text-neutral-600">{formatDateRange(announcement.starts_at, announcement.ends_at)}</p>
                            </div>

                            <div className="rounded-xl border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                    <MapPin className="h-4 w-4" />
                                    Venue
                                </div>
                                <p className="mt-2 text-sm text-neutral-600">{announcement.venue}</p>
                            </div>

                            <div className="rounded-xl border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                    <Users className="h-4 w-4" />
                                    Audience
                                </div>
                                <p className="mt-2 text-sm text-neutral-600">
                                    {audienceLabels[announcement.audience] ?? announcement.audience}
                                    {announcement.capacity ? ` - Capacity ${announcement.capacity}` : ''}
                                </p>
                            </div>

                            <div className="rounded-xl border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                    <UserRound className="h-4 w-4" />
                                    Organizer
                                </div>
                                <p className="mt-2 text-sm text-neutral-600">{announcement.organizer ?? 'Not specified yet'}</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border p-5">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-base font-semibold text-neutral-900">Event Details</h3>
                                <Badge variant={statusVariant(announcement.status)}>{announcement.status}</Badge>
                            </div>
                            <p className="mt-4 text-sm leading-6 whitespace-pre-line text-neutral-600">{announcement.description}</p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                    <UserRound className="h-4 w-4" />
                                    Contact Person
                                </div>
                                <p className="mt-2 text-sm text-neutral-600">{announcement.contact_name ?? 'No contact person provided'}</p>
                            </div>

                            <div className="rounded-xl border p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                                    <Mail className="h-4 w-4" />
                                    Contact Email
                                </div>
                                <p className="mt-2 text-sm text-neutral-600">{announcement.contact_email ?? 'No contact email provided'}</p>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-neutral-50 p-4 text-sm text-neutral-600">
                            <p>
                                Created by <span className="font-medium text-neutral-900">{announcement.creator_name ?? 'Unknown user'}</span>
                            </p>
                            <p className="mt-1">Last updated {formatDateTime(announcement.updated_at)}</p>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                                Close
                            </Button>
                            {announcement.registration_link && (
                                <Button asChild>
                                    <a href={announcement.registration_link} target="_blank" rel="noreferrer">
                                        <Link2 className="h-4 w-4" />
                                        Open registration link
                                    </a>
                                </Button>
                            )}
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
