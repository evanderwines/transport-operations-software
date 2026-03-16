import { SidebarProvider } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Reservation } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { index, show } from '@/routes/task';
import { LatLng } from 'leaflet';
import Task from '@/components/task';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: index().url,
    },
];



const Tasks = () => {
    const props = usePage<{ reservations: Reservation[] }>().props;


    return (
        <SidebarProvider>
            <AppLayout breadcrumbs={breadcrumbs}>

                <div className='p-2'>
                    {props.reservations.map((reservation, index) => {


                        
                        return (
                            <Link as="div" href={show(reservation.reservation_id)} key={index} className='p-2 border-b'>
                                <Task reservation={reservation}  />
                            </Link>
                        )
                    })}
                </div>
            </AppLayout>
        </SidebarProvider>
    )
}

export default Tasks