import { SidebarProvider } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Reservation, User } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { index, update } from '@/routes/task';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L, { LatLng, LatLngBounds } from 'leaflet';
import RoutingMachine from '../../components/routing-machine';
import { useEffect, useRef, useState } from 'react';

import '../../bootstrap';
import CurrentLocation from '@/components/current_location';
import axios from 'axios';
import { Separator } from '@/components/ui/separator';
import { ChevronUp, Dot, Locate, LocateFixed, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';


import AvatarImageSource from '../../../../public/assets/images/avatar.png';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import MapRoute from '@/components/map-route';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task Details',
        href: index().url,
    },
];



const TaskDetails = () => {
    const { props } = usePage<{ reservation: Reservation, auth: { user: User } }>();

    console.log(props.reservation);

    const date = new Date(props.reservation.dispatch.schedule).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const schedule = new Date(props.reservation.dispatch.schedule);
    const pickup = props.reservation.pickup_address.split(",").at(0) + ", " + props.reservation.pickup_address.split(",").at(-4);
    const dropoff = props.reservation.dropoff_address.split(',')[0] + ", " + props.reservation.dropoff_address.split(",").at(-4);


    const setBounds = (map: L.Map, bounds: LatLngBounds) => {
        map.fitBounds(bounds);
    }


    const [position, setPosition] = useState<LatLng>(new LatLng(14.77255, 120.97353));
    const [routes, setRoute] = useState<LatLng[]>([]);
    const [vehicleLoc, setVehicleLoc] = useState()
    const [status, setStatus] = useState<string>(props.reservation.status || '');

    const [driverFocus, setDriverFocus] = useState(false);

    const getNextAction = (current: string) => {
        if (!current || current === 'ASSIGNED' || current === 'PENDING') {
            return { label: 'Start', status: 'GOING TO PICKUP' };
        }
        if (current === 'GOING TO PICKUP') {
            return { label: 'Arrived at Pick Up', status: 'WAITING' };
        }
        if (current === 'WAITING') {
            return { label: 'Going to Dropoff', status: 'GOING TO DROPOFF' };
        }
        if (current === 'GOING TO DROPOFF') {
            return { label: 'Arrived at Dropoff', status: 'COMPLETE' };
        }
        return null;
    };

    const nextAction = getNextAction(status);

    const handleStatusUpdate = () => {
        if (!nextAction) return;

        router.post(`/tasks/${props.reservation.reservation_id}/status`, { status: nextAction.status }, {
            preserveScroll: true,
            onSuccess: () => {
                setStatus(nextAction.status);
            },
        });
    };



    useEffect(() => {

        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;

                    setPosition(new LatLng(latitude, longitude));

                    console.log(pos);

                    axios.post(update().url, {
                        vehicle_id: props.reservation.dispatch.vehicle_id,
                        latitude,
                        longitude,
                    }).catch(console.error);
                },
                (err) => console.error("Geolocation error:", err),
                { enableHighAccuracy: true }
            );
        };

        updateLocation();

        const interval = setInterval(updateLocation, 5000);

        return () => clearInterval(interval);

    }, []);



    return (
        <SidebarProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className=''>

                    <div className='relative' style={{ width: '100vw', height: '70vh' }}>

                        <Button className='absolute right-2 top-10 z-10' size="icon" variant="outline" onClick={() => setDriverFocus(!driverFocus)}>
                            {
                                driverFocus ? <LocateFixed /> : <Locate /> 
                            }
                        </Button>

                        <MapRoute reservation={props.reservation} padding={0} driverFocus={driverFocus} />

                    </div>

                    <div className='rounded-xl bg-white -translate-y-10'>
                        <div className='mb-3 rounded mx-auto translate-y-2 w-15 h-1 bg-gray-500'></div>

                        <div className="flex justify-between items-center p-3">

                            <div className=''>
                                <p className='text-sm'>{date}</p>
                                <p className='text-xs text-gray-500'>Appointment date</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                {nextAction && (
                                    <Button className='bg-sky-400' onClick={handleStatusUpdate}>
                                        <Send />
                                        {nextAction.label}
                                    </Button>
                                )}
                                <ChevronUp size={15} className='mx-3' />
                            </div>

                        </div>
                        <Separator />

                        <div className='p-3 border-b-8'>
                            <div className='flex items-center justify-between pb-2 border-b'>
                                <div className='flex gap-2 items-center'>
                                    <Avatar className='size-10'>
                                        <AvatarImage src={AvatarImageSource} />
                                    </Avatar>

                                    <div>
                                        <p className='font-bold text-sm'>{props.reservation.customer.name}</p>
                                        <p className='text-xs text-gray-500 flex items-center'>
                                            Pickup <Dot size={10} />
                                            <span className='w-50 truncate'>{pickup}</span>
                                        </p>
                                    </div>
                                </div>


                                <div className='mex-3 rounded-full p-2 border'>
                                    <Phone size={20} className='text-gray-500' />
                                </div>
                            </div>

                            <div className='flex items-center gap-2 mt-2 text-gray-700'>
                                <MapPin size={20} />
                                <p className='text-sm'>{dropoff}</p>
                            </div>
                        </div>

                        <div>
                            <p>Appointment</p>
                            <div>
                                <p>Time Request</p>
                                <p>{schedule.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <p>Date</p>
                                <p>{schedule.toLocaleDateString('default', { hour: 'numeric', minute: '2-digit' })}</p>
                            </div>
                        </div>





                    </div>

                </div>
            </AppLayout>
        </SidebarProvider>
    )
}

export default TaskDetails
