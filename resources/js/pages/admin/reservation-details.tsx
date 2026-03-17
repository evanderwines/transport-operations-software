import { BreadcrumbItem, SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import ReservationsLayout from '@/layouts/reservations/layout';
import { usePage } from '@inertiajs/react';
import reservations, { index } from '@/routes/reservations';
import { Reservation } from '../../types/index';
import MapRoute from '@/components/map-route';
import ReservationDetailsLayout from '@/layouts/reservation-details/layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import FloatingReservationDetails from '@/components/floating-reservation-details';
import ReservationMapView from '@/components/reservation-map-view';


export default function ReservationDetails() {
    const { props } = usePage<{ reservation: Reservation }>();


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Reservations',
            href: index().url,
        },
        {
            title: props.reservation.customer.name,
            href: "",
        },
    ];


    return (
        <SidebarProvider >
            <AppLayout breadcrumbs={breadcrumbs}>
                <ReservationDetailsLayout>
                    <div className='flex-3 relative overflow- bg-gray-200' style={{ height: "calc(100vh - 80px)", width: "100%" }}>
                        <FloatingReservationDetails reservation={props.reservation} />
                        <ReservationMapView reservation={props.reservation} />
                    </div>
                </ReservationDetailsLayout>
            </AppLayout>
        </SidebarProvider>
    );
}
