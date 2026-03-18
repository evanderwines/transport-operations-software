import UserController from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { destroy } from '@/routes/users';
import { PaginationType, User } from '@/types';
import { Form, Link } from '@inertiajs/react';
import { SetStateAction } from 'react';

interface DeleteAccountProps {
    user_id: string;
    isOpen: boolean;
    updateTable: (newUsers: PaginationType<User[]>) => void;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}


export const DeleteAccount = ({ user_id, isOpen, updateTable, setIsOpen }: DeleteAccountProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
                <DialogDescription>
                    Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                    to confirm you would like to permanently delete your account.
                </DialogDescription>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Link as="div" href={destroy(user_id)} onSuccess={() => setIsOpen(false)}>
                        <Button variant="destructive">
                            Delete User
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
