import { PaginationType } from "@/types";
import { usePage, router, Link } from "@inertiajs/react";
import { type Reservation } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { SlidersHorizontal, Plus } from "lucide-react";
import { step } from "@/routes/reservations";
import "../bootstrap";
import ReservationCard from "./reservation-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function ReseravtionList({ reservations }: { reservations: PaginationType<Reservation[]> }) {
	const [reservation, setReservation] = useState<Reservation[]>(reservations.data);
	const { filters, statuses, serviceTypes } = usePage<{
		filters?: { q?: string; status?: string; service_type?: string; date_from?: string; date_to?: string };
		statuses?: string[];
		serviceTypes?: string[];
	}>().props;

	const [searchInput, setSearchInput] = useState(filters?.q ?? "");
	const [statusFilter, setStatusFilter] = useState(filters?.status ?? "");
	const [serviceTypeFilter, setServiceTypeFilter] = useState(filters?.service_type ?? "");
	const [dateFrom, setDateFrom] = useState(filters?.date_from ?? "");
	const [dateTo, setDateTo] = useState(filters?.date_to ?? "");

	const updateTable = (newReservation: PaginationType<Reservation[]>) => {
		setReservation(newReservation.data);
	};

	useEffect(() => {
		setReservation(reservations.data);
	}, [reservations.data]);

	useEffect(() => {
		const channel = window.Echo.channel("reservations");

		channel.listen(".ReservationCreated", (e: { reservation: Reservation }) => {
			setReservation((prev) => {
				if (prev.some((r) => r.reservation_id === e.reservation.reservation_id)) {
					return prev;
				}
				return [...prev, e.reservation];
			});
		});

		channel.listen(".ReservationDeleted", (e: { reservation_id: string }) => {
			setReservation((prev) => prev.filter((item) => item.reservation_id !== e.reservation_id));
		});

		return () => {
			window.Echo.leave("reservations");
		};
	}, []);

	const applyFilters = (event: React.FormEvent) => {
		event.preventDefault();

		router.get(
			"/reservations",
			{
				q: searchInput || undefined,
				status: statusFilter === "none" ? "" : statusFilter || undefined,
				service_type: serviceTypeFilter === "none" ? "" : serviceTypeFilter || undefined,
				date_from: dateFrom || undefined,
				date_to: dateTo || undefined,
			},
			{
				preserveState: true,
				replace: true,
			}
		);
	};

	const clearFilters = () => {
		setSearchInput("");
		setStatusFilter("");
		setServiceTypeFilter("");
		setDateFrom("");
		setDateTo("");
		router.get("/reservations", {}, { replace: true });
	};

	return (
		<div>
			<div className="justify-between flex items-center py-3 px-0 rounded-t-lg mb-3">
				<h2 className="text-xl font-bold">Reservations</h2>
				<form onSubmit={applyFilters} className="flex flex-wrap items-end gap-2.5">
					<div className="w-56">
						<label className="text-xs uppercase text-gray-500">Search</label>
						<Input
							type="text"
							placeholder="Search reservation, customer, address"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
					</div>
					<div className="w-36">
						<Select
							onValueChange={(e) => setStatusFilter(e)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">All</SelectItem>

								{(statuses ?? []).map((status) => (
									<SelectItem key={status} value={status}>
										{status}
									</SelectItem>
								))}

							</SelectContent>
						</Select>
					</div>
					<div className="w-36">
						<Select
							onValueChange={(e) => setServiceTypeFilter(e)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Service" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="">All</SelectItem>

								{(serviceTypes ?? []).map((service) => (
									<SelectItem key={service} value={service}>
										{service}
									</SelectItem>
								))}

							</SelectContent>
						</Select>
					</div>
					<Button type="submit" variant="outline" className="text-xs">
						<SlidersHorizontal />
						Apply filter
					</Button>
					<Link href={step("1", { query: { date: "today" } })}>
						<Button className="">
							<Plus />
							New Reservation
						</Button>
					</Link>
				</form>
			</div>

			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{reservation.map((r) => (
					<ReservationCard key={r.reservation_id} reservation={r} updateTable={updateTable} />
				))}
			</div>
		</div>
	);
}
