import { useForm } from '@inertiajs/react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Announcement } from '@/types';

interface AnnouncementFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    announcement?: Announcement | null;
    statuses: string[];
    audiences: string[];
}

interface AnnouncementFormData {
    title: string;
    summary: string;
    description: string;
    starts_at: string;
    ends_at: string;
    venue: string;
    organizer: string;
    audience: string;
    status: string;
    capacity: string;
    registration_link: string;
    contact_name: string;
    contact_email: string;
    is_featured: boolean;
}

const toDateTimeLocalValue = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const createDefaultForm = (): AnnouncementFormData => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(9, 0, 0, 0);

    const end = new Date(start);
    end.setHours(12, 0, 0, 0);

    return {
        title: '',
        summary: '',
        description: '',
        starts_at: toDateTimeLocalValue(start),
        ends_at: toDateTimeLocalValue(end),
        venue: '',
        organizer: '',
        audience: 'ALL',
        status: 'DRAFT',
        capacity: '',
        registration_link: '',
        contact_name: '',
        contact_email: '',
        is_featured: false,
    };
};

const toFormData = (announcement: Announcement): AnnouncementFormData => ({
    title: announcement.title,
    summary: announcement.summary,
    description: announcement.description,
    starts_at: announcement.starts_at_input ?? '',
    ends_at: announcement.ends_at_input ?? '',
    venue: announcement.venue,
    organizer: announcement.organizer ?? '',
    audience: announcement.audience,
    status: announcement.status,
    capacity: announcement.capacity?.toString() ?? '',
    registration_link: announcement.registration_link ?? '',
    contact_name: announcement.contact_name ?? '',
    contact_email: announcement.contact_email ?? '',
    is_featured: announcement.is_featured,
});

export default function AnnouncementFormDialog({ open, onOpenChange, announcement, statuses, audiences }: AnnouncementFormDialogProps) {
    const isEditing = Boolean(announcement);

    const { data, setData, post, patch, processing, errors, clearErrors } = useForm<AnnouncementFormData>(createDefaultForm());

    useEffect(() => {
        if (!open) {
            return;
        }

        if (announcement) {
            setData(toFormData(announcement));
        } else {
            setData(createDefaultForm());
        }

        clearErrors();
    }, [announcement, clearErrors, open, setData]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            clearErrors();
        }

        onOpenChange(nextOpen);
    };

    const handleFeaturedChange = (checked: CheckedState) => {
        setData('is_featured', checked === true);
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                handleOpenChange(false);
            },
        };

        if (announcement) {
            patch(`/announcements/${announcement.announcement_id}`, options);
            return;
        }

        post('/announcements', options);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit event announcement' : 'Create event announcement'}</DialogTitle>
                    <DialogDescription>Set up the event details, publication status, and who should see this announcement.</DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="announcement-title">Title</Label>
                            <Input
                                id="announcement-title"
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                                placeholder="Driver town hall and safety briefing"
                                required
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="announcement-summary">Summary</Label>
                            <Textarea
                                id="announcement-summary"
                                value={data.summary}
                                onChange={(event) => setData('summary', event.target.value)}
                                placeholder="Short highlight that appears on the event card."
                                className="min-h-24"
                                required
                            />
                            <InputError message={errors.summary} />
                        </div>

                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="announcement-description">Full Description</Label>
                            <Textarea
                                id="announcement-description"
                                value={data.description}
                                onChange={(event) => setData('description', event.target.value)}
                                placeholder="Share the full agenda, reminders, dress code, or expected attendees."
                                className="min-h-36"
                                required
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-starts-at">Starts At</Label>
                            <Input
                                id="announcement-starts-at"
                                type="datetime-local"
                                value={data.starts_at}
                                onChange={(event) => setData('starts_at', event.target.value)}
                                required
                            />
                            <InputError message={errors.starts_at} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-ends-at">Ends At</Label>
                            <Input
                                id="announcement-ends-at"
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(event) => setData('ends_at', event.target.value)}
                            />
                            <InputError message={errors.ends_at} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-venue">Venue</Label>
                            <Input
                                id="announcement-venue"
                                value={data.venue}
                                onChange={(event) => setData('venue', event.target.value)}
                                placeholder="Operations Hub, Mandaluyong"
                                required
                            />
                            <InputError message={errors.venue} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-organizer">Organizer</Label>
                            <Input
                                id="announcement-organizer"
                                value={data.organizer}
                                onChange={(event) => setData('organizer', event.target.value)}
                                placeholder="Operations Team"
                            />
                            <InputError message={errors.organizer} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Audience</Label>
                            <Select value={data.audience} onValueChange={(value) => setData('audience', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    {audiences.map((audience) => (
                                        <SelectItem key={audience} value={audience}>
                                            {audience}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.audience} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-capacity">Capacity</Label>
                            <Input
                                id="announcement-capacity"
                                type="number"
                                min={1}
                                value={data.capacity}
                                onChange={(event) => setData('capacity', event.target.value)}
                                placeholder="100"
                            />
                            <InputError message={errors.capacity} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-link">Registration Link</Label>
                            <Input
                                id="announcement-link"
                                type="url"
                                value={data.registration_link}
                                onChange={(event) => setData('registration_link', event.target.value)}
                                placeholder="https://example.com/register"
                            />
                            <InputError message={errors.registration_link} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-contact-name">Contact Person</Label>
                            <Input
                                id="announcement-contact-name"
                                value={data.contact_name}
                                onChange={(event) => setData('contact_name', event.target.value)}
                                placeholder="Maria Santos"
                            />
                            <InputError message={errors.contact_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="announcement-contact-email">Contact Email</Label>
                            <Input
                                id="announcement-contact-email"
                                type="email"
                                value={data.contact_email}
                                onChange={(event) => setData('contact_email', event.target.value)}
                                placeholder="events@company.com"
                            />
                            <InputError message={errors.contact_email} />
                        </div>
                    </div>

                    <div className="rounded-xl border bg-neutral-50 p-4">
                        <div className="flex items-start gap-3">
                            <Checkbox checked={data.is_featured} onCheckedChange={handleFeaturedChange} />
                            <div className="space-y-1">
                                <Label className="text-sm">Feature this event on the module</Label>
                                <p className="text-sm text-neutral-500">
                                    Featured events stay at the top of the list so urgent or flagship activities are easier to spot.
                                </p>
                            </div>
                        </div>
                        <InputError message={errors.is_featured} className="mt-3" />
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {isEditing ? 'Save changes' : 'Create announcement'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
