import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PaginationType } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { type Reservation } from "@/types";
import { Tab } from "@headlessui/react";
import { Button } from "./ui/button";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react"; import ReservationsLayout from "@/layouts/reservations/layout";
import { Pagination } from "./pagination";
import { SlidersHorizontal, UserPlus, PencilLine, Download, Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { DeleteReservation } from "./delete-reservation";
import { show, step } from "@/routes/reservations";
import { ColumnsMenu } from "./columns-menu";
import '../bootstrap';
import Task from "./task";
import reservations from '../routes/reservations/index';
import ReservationCard from "./reservation-card";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'User Management',
		href: '/user-management/students',
	},
];

const columns = [
	'Reservation ID',
	'Customer Name',
	'Email',
	'Contact Number',
	'Status',
	'Pickup Address',
	'Pickup LatLng',
	'Dropoff Address',
	'Dropoff LatLng',
	'Date',
	'Time',
	'Service Type',
	'Cargo Details',
	'Special Instructions',
	'Created At',
	'Updated At',
];


const defaultColumns = [
	0,
	1,
	4,
	5,
	7,
	9,
	10,
]


// const pusher = window.Echo.connector.pusher; 
// pusher.connection.bind('connected', () => { console.log("✅ Connected to Pusher"); });


export default function ReseravtionList({ reservations }: { reservations: PaginationType<Reservation[]> }) {


	const [reservation, setReservation] = useState<Reservation[]>(reservations.data);
	const [visibleColumns, setVisibleColumns] = useState<number[]>(JSON.parse(sessionStorage.getItem('visibleColumns') || '[]').length > 0 ? JSON.parse(sessionStorage.getItem('visibleColumns') || '[]') : defaultColumns);
	const [filteredReservations, setFilteredReservations] = useState<Reservation[][]>(reservation.map(student => Object.values(student)).map(row => row.filter((_, index) => visibleColumns.includes(index))));
	const [searchInput, setSearchInput] = useState('');

	const updateTable = (newReservation: PaginationType<Reservation[]>) => {
		setReservation(newReservation.data);
	}

	useEffect(() => {
		const channel = window.Echo.channel("reservations");

		channel.listen(".ReservationCreated", (e: { reservation: Reservation }) => {
			setReservation(prev => {
				if (prev.some(r => r.reservation_id === e.reservation.reservation_id)) {
					return prev;
				}
				return [...prev, e.reservation];
			});
		});


		channel.listen(".ReservationDeleted", (e: { reservation_id: string }) => {
			console.log(e);
			setReservation(prev => prev.filter(item => item.reservation_id !== e.reservation_id));
		});

		return () => {
			window.Echo.leave("reservations");
		};
	}, []);



	useEffect(() => {

		sessionStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));

		const lowerSearchInput = searchInput.toLowerCase();
		const newFilteredStudents = reservation.map(reservation =>
			// Convert each reservation object's values to array and filter based on visible columns
			Object.values(reservation)).map(row =>
				row.filter((_, index) =>
					visibleColumns.includes(index))).filter(row => {
						// Check if any item in the row includes the search input
						return row.some(item =>
							item.toString().toLowerCase().includes(lowerSearchInput)
						);
					});
		setFilteredReservations(newFilteredStudents);
	}, [reservation, visibleColumns, searchInput])

	return (
		<div>
			<div className="justify-between flex items-center py-3 px-0 rounded-t-lg mb-1">
				<h2 className="text-xl font-bold">Reservations</h2>
				<div className="flex gap-2.5">
					{/* <div className="hidden md:block">
						<ColumnsMenu columns={columns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
					</div> */}

					<Button variant="outline" size="sm" className="hidden md:flex text-xs"><SlidersHorizontal />Filter</Button>
					<Button variant="outline" size="sm" className="hidden md:flex text-xs"><Download />Export</Button>
					<Link href={step("1", { query: { date: "today" } })}>
						<Button variant="outline" size="sm" className="text-xs text-white bg-sky-500 hover:bg-sky-300 hover:text-white"><Plus />New Reservation</Button>
					</Link>

				</div>
			</div>
			{/* <channelDataTable
				columns={columns.filter((_, index) => visibleColumns.includes(index))}
				data={filteredReservations}
				searchInput={searchInput}
				doDelete={doDelete}
				viewLink={(id) => retrieve.url({ reservation_id: id })}
			/>
			<Pagination data={reservations} /> */}


			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{reservation.map((r, index) => (
					<ReservationCard reservation={r} updateTable={updateTable} />
				))}
			</div>


		</div>



	);
}