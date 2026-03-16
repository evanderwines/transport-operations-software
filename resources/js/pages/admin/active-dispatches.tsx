import ActiveDisptach from '@/components/active-dispatch'
import MapRoute from '@/components/map-route'
import SearchBar from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { index } from '@/routes/active-dispatches'
import { BreadcrumbItem, Reservation, SharedData } from '@/types'
import { usePage } from '@inertiajs/react'
import { ChevronDown, CornerDownRight, FlagTriangleRight, Gauge, MapPin, Pin, Route, SlidersHorizontal, Star, Timer } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import TabOrderDetails from '@/components/tab-order-details'
import { useState } from 'react'
import TabDriverInformation from '@/components/tab-driver-information'
import FloatingReservationDetails from '@/components/floating-reservation-details'

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Active Dispatches',
		href: index().url,
	},
];

const ActiveDispatches = () => {
	const props = usePage<{ reservations: Reservation[], selectedReservation: Reservation }>().props;
	const isOpen = usePage<SharedData>().props.sidebarOpen;

	const selectedReservation = props.selectedReservation || props.reservations[0];

	const summary = [
		{ text: "Current Location", value: "W Service Road", icon: <MapPin size={12} color='white' /> },
		{ text: "Current Speed", value: '76 mph', icon: <Gauge size={12} color='white' /> },
		{ text: "ETA", value: "11:42 am", icon: <Timer size={12} color='white' /> },
		{ text: "Distance", value: "15/120 mi", icon: <Route size={12} color='white' /> },
	]

	console.log(props.reservations);

	




	return (
		<SidebarProvider defaultOpen={isOpen}>
			<AppLayout breadcrumbs={breadcrumbs} >
				<div className='flex flex-row'>
					<div className='flex-1 p-4 pt-4.5'>
						<p className='font-bold mb-4 text-sm'>Active disptaches (1)</p>
						<div className='flex items-center gap-2 mb-3'>
							<SearchBar />
							<Button variant="outline" className="hidden md:flex text-xs"><SlidersHorizontal />Filter</Button>
						</div>

						<div>
							{
								props.reservations.map((reservation) => (
									<ActiveDisptach key={reservation.reservation_id} reservation={reservation} selectedReservation={selectedReservation.reservation_id} />
								))
							}
						</div>
					</div>
					<div className='flex-3 relative rounded-s-md overflow-hidden' style={{ height: "calc(100vh - 85px)", width: "100%" }}>
						<div className="w-160 flex justify-center gap-10 absolute top-5 left-[50%] -translate-x-[50%] z-99 bg-white rounded-md pb-4 pt-5 shadow-md ps-7 pe-8 ">
							{
								summary.map((item, index) => {
									return (
										<div className='flex items-center gap-2' key={index}>
											<div className='p-2 bg-blue-400 flex items-center justify-center rounded-full shadow-sm'>
												{item.icon}
											</div>
											<div>
												<p className='text-xs font-bold'>{item.text}</p>
												<p className='text-xs text-gray-500'>{item.value}</p>
											</div>
										</div>
									)
								})
							}
						</div>
						
						<FloatingReservationDetails reservation={selectedReservation} />	

						


						{selectedReservation && <MapRoute reservation={selectedReservation} padding={400} />}

					</div>
				</div>
			</AppLayout>
		</SidebarProvider>
	)
}

export default ActiveDispatches