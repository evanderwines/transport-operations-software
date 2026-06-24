import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Announcement } from '@/types';

interface AnnouncementDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    announcement: Announcement | null;
}

export default function AnnouncementDeleteDialog({ open, onOpenChange, announcement }: AnnouncementDeleteDialogProps) {
    const { delete: destroy, processing } = useForm({});

    const handleDelete = () => {
        if (!announcement) {
            return;
        }

        destroy(`/announcements/${announcement.announcement_id}`, {
            preserveScroll: true,
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog open={open && !!announcement} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete event announcement?</DialogTitle>
                    <DialogDescription>
                        This will permanently remove <span className="font-medium text-neutral-900">{announcement?.title}</span> from the
                        announcements module.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={processing}>
                        Delete announcement
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
