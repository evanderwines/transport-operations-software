import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { BriefcaseBusiness, CheckCircle2, Clock3, PackageSearch } from 'lucide-react';

interface CustomerDashboardProps {
    metrics: {
        total_reservations: number;
        active_reservations: number;
        completed_reservations: number;
        new_this_month: number;
    };
    breakdowns: {
        service_types: Array<{
            label: string;
            count: number;
            percentage: number;
        }>;
    };
    recentReservations: Array<{
        reservation_id: string;
        status: string;
        service_type: string;
        schedule: string | null;
        driver_name: string | null;
        vehicle_model: string | null;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<SharedData & CustomerDashboardProps>();
    const isOpen = props.sidebarOpen;

    const cards = [
        {
            title: 'Total Reservations',
            value: props.metrics.total_reservations,
            detail: 'All bookings on your account',
            icon: BriefcaseBusiness,
        },
        {
            title: 'Active',
            value: props.metrics.active_reservations,
            detail: 'Trips currently moving',
            icon: Clock3,
        },
        {
            title: 'Completed',
            value: props.metrics.completed_reservations,
            detail: 'Finished reservations',
            icon: CheckCircle2,
        },
        {
            title: 'This Month',
            value: props.metrics.new_this_month,
            detail: 'New bookings this month',
            icon: PackageSearch,
        },
    ];

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="space-y-6 p-4">
                    <section className="rounded-2xl border bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-700 px-6 py-7 text-white shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Customer Overview</p>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Your reservations, simplified</h1>
                        <p className="mt-2 max-w-2xl text-sm text-white/70">
                            A quick view of current bookings, completed trips, and the services you use most often.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {cards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article key={card.title} className="rounded-2xl border bg-white p-5 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{card.title}</p>
                                            <p className="mt-3 text-3xl font-semibold text-neutral-900">{card.value}</p>
                                        </div>
                                        <div className="rounded-xl bg-neutral-100 p-3 text-neutral-700">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-neutral-500">{card.detail}</p>
                                </article>
                            );
                        })}
                    </section>

                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.8fr_1.2fr]">
                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900">Service Types</h2>
                            <div className="mt-5 space-y-4">
                                {props.breakdowns.service_types.length > 0 ? (
                                    props.breakdowns.service_types.map((item) => (
                                        <div key={item.label}>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-neutral-700">{item.label}</span>
                                                <span className="text-neutral-500">{item.count} - {item.percentage}%</span>
                                            </div>
                                            <div className="mt-2 h-2 rounded-full bg-neutral-100">
                                                <div className="h-2 rounded-full bg-emerald-700" style={{ width: `${item.percentage}%` }} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-neutral-500">No reservation data yet.</p>
                                )}
                            </div>
                        </article>

                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900">Recent Reservations</h2>
                            <div className="mt-5 space-y-3">
                                {props.recentReservations.length > 0 ? (
                                    props.recentReservations.map((reservation) => (
                                        <div key={reservation.reservation_id} className="rounded-xl border px-4 py-3">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <p className="font-medium text-neutral-900">{reservation.reservation_id}</p>
                                                    <p className="text-sm text-neutral-500">{reservation.service_type}</p>
                                                    <p className="mt-1 text-xs text-neutral-500">
                                                        {reservation.vehicle_model ?? 'Vehicle pending'} - {reservation.driver_name ?? 'Driver pending'}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="secondary">{reservation.status}</Badge>
                                                    <p className="mt-2 text-sm text-neutral-600">{reservation.schedule ?? 'No schedule yet'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-neutral-500">
                                        You do not have any reservations yet.
                                    </div>
                                )}
                            </div>
                        </article>
                    </section>
                </div>
            </AppLayout>
        </SidebarProvider>
    );
}

