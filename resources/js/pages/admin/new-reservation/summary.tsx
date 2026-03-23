import ReservationController from '@/actions/App/Http/Controllers/ReservationController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import CreateReservationLayout from '@/layouts/create-reservation/layout';
import { BreadcrumbItem, User, Vehicle } from '@/types';
import { Form, Link, usePage } from '@inertiajs/react';
import { CalendarDays, Clock3, MapPin, Package, Truck, UserRound } from 'lucide-react';

type SummaryData = {
    customer_id: string;
    date: string;
    time: string | null;
    vehicle_id: string | null;
    pickup_address: string | null;
    pickup_latlng: string | null;
    dropoff_address: string | null;
    dropoff_latlng: string | null;
    service_type: string | null;
    cargo_details: string | null;
    special_instructions: string | null;
};

const formatDate = (date: string | null) => {
    if (!date) {
        return 'Not set';
    }

    const [year, month, day] = date.split('-').map(Number);
    const value = new Date(year, (month ?? 1) - 1, day ?? 1);

    if (Number.isNaN(value.getTime())) {
        return date;
    }

    return value.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

const formatTime = (time: string | null) => {
    if (!time) {
        return 'Not set';
    }

    const [hours, minutes] = time.split(':').map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return time;
    }

    const value = new Date();
    value.setHours(hours, minutes, 0, 0);

    return value.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });
};

const Summary = () => {
    const { props } = usePage<{
        summary: SummaryData;
        selectedVehicle?: Vehicle | null;
        customer?: Pick<User, 'id' | 'name' | 'email'> | null;
        edit_mode?: boolean;
        edit_reservation_id?: string;
    }>();

    const editMode = Boolean(props.edit_mode && props.edit_reservation_id);
    const editId = props.edit_reservation_id;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Reservations', href: '/reservations' },
        {
            title: editMode ? 'Edit' : 'Create',
            href: editMode ? `/reservations/${editId}/edit` : '/reservations/create/select',
        },
    ];

    const backHref = editMode ? `/reservations/${editId}/edit/step/4` : '/reservations/create/step/4';

    const selectedVehicle = props.selectedVehicle;
    const customer = props.customer;
    const summary = props.summary;

    const routeDetails = [
        {
            label: 'Pick-up address',
            value: summary.pickup_address || 'No pick-up address selected.',
            helper: summary.pickup_latlng || 'Waiting for location coordinates.',
        },
        {
            label: 'Drop-off address',
            value: summary.dropoff_address || 'No drop-off address selected.',
            helper: summary.dropoff_latlng || 'Waiting for location coordinates.',
        },
    ];

    return (
        <SidebarProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <CreateReservationLayout>
                    <div className="space-y-6">
                        <div className="max-w-3xl space-y-2">
                            <h2 className="text-2xl font-semibold tracking-tight">Review reservation summary</h2>
                            <p className="text-sm text-muted-foreground">
                                Confirm the schedule, route, and service details before saving this reservation.
                            </p>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CalendarDays className="size-5" />
                                            Schedule
                                        </CardTitle>
                                        <CardDescription>Reservation timing and assigned vehicle.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Date</p>
                                            <p className="mt-2 font-medium">{formatDate(summary.date)}</p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Requested time</p>
                                            <p className="mt-2 flex items-center gap-2 font-medium">
                                                <Clock3 className="size-4 text-muted-foreground" />
                                                {formatTime(summary.time)}
                                            </p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Vehicle</p>
                                            <p className="mt-2 flex items-center gap-2 font-medium">
                                                <Truck className="size-4 text-muted-foreground" />
                                                {selectedVehicle?.model || summary.vehicle_id || 'No vehicle selected'}
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {selectedVehicle?.plate_number
                                                    ? `Plate no. ${selectedVehicle.plate_number}`
                                                    : 'Vehicle details unavailable.'}
                                            </p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Driver</p>
                                            <p className="mt-2 font-medium">{selectedVehicle?.driver?.name || 'No driver assigned yet'}</p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {selectedVehicle?.capacity
                                                    ? `Capacity: ${selectedVehicle.capacity}`
                                                    : 'Assignment will use the selected vehicle.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="size-5" />
                                            Route summary
                                        </CardTitle>
                                        <CardDescription>Review the selected origin and destination.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {routeDetails.map((detail) => (
                                            <div key={detail.label} className="rounded-lg border p-4">
                                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{detail.label}</p>
                                                <p className="mt-2 font-medium">{detail.value}</p>
                                                <p className="mt-2 text-sm text-muted-foreground">{detail.helper}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Package className="size-5" />
                                            Service details
                                        </CardTitle>
                                        <CardDescription>Business details attached to this request.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Service type</p>
                                            <p className="mt-2 font-medium">{summary.service_type || 'No service type selected'}</p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Cargo details</p>
                                            <p className="mt-2 text-sm leading-6 text-foreground">
                                                {summary.cargo_details || 'No cargo details were provided.'}
                                            </p>
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Special instructions</p>
                                            <p className="mt-2 text-sm leading-6 text-foreground">
                                                {summary.special_instructions || 'No special instructions were provided.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <UserRound className="size-5" />
                                            Request owner
                                        </CardTitle>
                                        <CardDescription>User linked to this reservation request.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-lg border p-4">
                                            <p className="font-medium">{customer?.name || 'Unknown user'}</p>
                                            <p className="mt-1 text-sm text-muted-foreground">{customer?.email || 'Email unavailable'}</p>
                                            <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">Customer ID</p>
                                            <p className="mt-1 text-sm text-foreground">{summary.customer_id}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Form
                                    {...ReservationController.processStep5.form()}
                                    options={{
                                        preserveScroll: true,
                                    }}
                                >
                                    {({ processing }) => (
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <Button type="button" variant="outline" asChild>
                                                <Link href={backHref} preserveState={false}>
                                                    Back to Step 4
                                                </Link>
                                            </Button>

                                            <Button disabled={processing} className="sm:min-w-36">
                                                {processing ? 'Saving...' : editMode ? 'Update reservation' : 'Save reservation'}
                                            </Button>
                                        </div>
                                    )}
                                </Form>
                            </div>
                        </div>
                    </div>
                </CreateReservationLayout>
            </AppLayout>
        </SidebarProvider>
    );
};

export default Summary;
