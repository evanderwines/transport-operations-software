import { useEffect, useState } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import { Tab } from "@headlessui/react";
import { SlidersHorizontal, Download, Plus } from "lucide-react";

import { Button } from "./ui/button";
import { DataTable } from "@/components/data-table";
import { Pagination } from "./pagination";
import { ColumnsMenu } from "./columns-menu";
import { BreadcrumbItem, PaginationType } from "@/types";
import { type User } from "@/types";
import '../bootstrap';
import user, { customer } from "@/routes/user";
import CreateUserModal from "./create-user-modal";
import UserViewModal from "./user-view-modal";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "User Management",
        href: "/users",
    },
    {
        title: "Customers",
        href: customer().url,
    },
];

const columns = [
    "ID",
    "Name",
    "Email",
    "Verified At",
    "Created At",
    "Updated At",
];

const defaultColumns = [0, 1, 2, 3, 4, 5];

export default function UserList() {
    const { props } = usePage<{ users: PaginationType<User[]> }>();


    const [users, setUsers] = useState<User[]>(props.users.data);
    const [open, setOpen] = useState(false);
    const [viewModalId, setViewModalId] = useState<string | number | null>(null);

    const sessionKey = "visibleUserColumns";
    const stored = JSON.parse(sessionStorage.getItem(sessionKey) || "[]");
    const initialVisible = Array.isArray(stored) && stored.length > 0 ? stored : defaultColumns;

    const [visibleColumns, setVisibleColumns] = useState<number[]>(initialVisible);

    const [filteredUsers, setFilteredUsers] = useState<string[][]>([]);

    useEffect(() => {
        setUsers(props.users.data);
        setFilteredUsers(users
            .map((u) => Object.values(u))
            .map((row) => row.filter((_, idx) => visibleColumns.includes(idx)))
            .map((row) => row.map((cell) => (cell === null ? "" : String(cell))))
        )
    }, [props.users])

    const [searchInput, setSearchInput] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    const doDelete = (id: string) => {
        setIsOpenDeleteModal(true);
        setSelectedUserId(id);
    };

    const updateTable = (newUsers: PaginationType<User[]>) => {
        setUsers(newUsers.data);
    };

    useEffect(() => {
        sessionStorage.setItem(sessionKey, JSON.stringify(visibleColumns));

        const lowerSearch = searchInput.toLowerCase();

        const newFiltered = users
            .map((u) => Object.values(u))
            .map((row) => row.filter((_, idx) => visibleColumns.includes(idx)))
            .map((row) => row.map((cell) => (cell === null ? "" : String(cell))))
            .filter((row) =>
                row.some((cell) => cell.toLowerCase().includes(lowerSearch))
            );

        setFilteredUsers(newFiltered);
    }, [users, visibleColumns, searchInput]);

    return (
        <div>
            <div className="justify-between flex items-center py-3 px-0 rounded-t-lg mb-1">
                <p className="font-bold text-sm"></p>
                <div className="flex gap-2.5">
                    <div className="hidden md:block">
                        <ColumnsMenu
                            columns={columns}
                            visibleColumns={visibleColumns}
                            setVisibleColumns={setVisibleColumns}
                        />
                    </div>

                    <Button variant="outline" size="sm" className="hidden md:flex text-xs">
                        <SlidersHorizontal />
                        Filter
                    </Button>
                    

                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-white bg-sky-500 hover:bg-sky-300 hover:text-white"
                        onClick={() => setOpen(true)}
                    >
                        <Plus />
                        New User
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns.filter((_, index) => visibleColumns.includes(index))}
                data={filteredUsers}
                searchInput={searchInput}
                doDelete={doDelete}
                setViewModalId={setViewModalId}
            // viewLink={(id) => retrieveUser.url({ user_id: id })}
            />

            {/* <Pagination data={props.users} /> */}

            {viewModalId && <UserViewModal viewModalId={viewModalId} setViewModalId={setViewModalId} />}


            {open && <CreateUserModal setOpen={setOpen} />}
            {/* <DeleteReservation
                reservation_id={selectedUserId}
                isOpen={isOpenDeleteModal}
                setIsOpen={setIsOpenDeleteModal}
                updateTable={updateTable}
            /> */}
        </div>
    );
}
