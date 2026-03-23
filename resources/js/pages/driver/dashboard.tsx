import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, CheckCircle2, ClipboardList, Truck } from 'lucide-react';

interface DriverDashboardProps {
    metrics: {
        assigned_vehicle: {
            vehicle_id: string;
            plate_number: string;
            model: string;
            status: string;
        } | null;
        total_tasks: number;
        active_tasks: number;
        completed_tasks: number;
        today_tasks: number;
    };
    breakdowns: {
        task_statuses: Array<{
            label: string;
            count: number;
            percentage: number;
        }>;
    };
    upcomingTasks: Array<{
        reservation_id: string;
        customer_name: string | null;
        schedule: string | null;
        status: string;
        pickup_address: string;
        dropoff_address: string;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Driver Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<SharedData & DriverDashboardProps>();
    const isOpen = props.sidebarOpen;

    const cards = [
        {
            title: 'Total Tasks',
            value: props.metrics.total_tasks,
            detail: 'All assigned reservations',
            icon: ClipboardList,
        },
        {
            title: 'Active Tasks',
            value: props.metrics.active_tasks,
            detail: 'Currently on the road',
            icon: CalendarClock,
        },
        {
            title: 'Completed',
            value: props.metrics.completed_tasks,
            detail: 'Finished deliveries',
            icon: CheckCircle2,
        },
        {
            title: 'Today',
            value: props.metrics.today_tasks,
            detail: 'Scheduled for today',
            icon: Truck,
        },
    ];

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="space-y-6 p-4">
                    <section className="rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 px-6 py-7 text-white shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Driver Overview</p>
                        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight">Your route and workload snapshot</h1>
                                <p className="mt-2 text-sm text-white/70">
                                    Quick access to assigned vehicle, task status, and the next trips on your queue.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Assigned Vehicle</p>
                                {props.metrics.assigned_vehicle ? (
                                    <>
                                        <p className="mt-2 text-xl font-semibold">
                                            {props.metrics.assigned_vehicle.model}&nbsp;    
                                            <span className='text-xs text-white/60'>
                                            {props.metrics.assigned_vehicle.plate_number}
                                            </span>
                                        </p>
                                        <Badge className="mt-3 bg-white text-slate-900">{props.metrics.assigned_vehicle.status}</Badge>
                                    </>
                                ) : (
                                    <p className="mt-2 text-sm text-white/70">No vehicle assigned yet.</p>
                                )}
                            </div>
                        </div>
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

                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900">Task Status Mix</h2>
                            <div className="mt-5 space-y-4">
                                {props.breakdowns.task_statuses.length > 0 ? (
                                    props.breakdowns.task_statuses.map((item) => (
                                        <div key={item.label}>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-neutral-700">{item.label}</span>
                                                <span className="text-neutral-500">{item.count} - {item.percentage}%</span>
                                            </div>
                                            <div className="mt-2 h-2 rounded-full bg-neutral-100">
                                                <div className="h-2 rounded-full bg-slate-900" style={{ width: `${item.percentage}%` }} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-neutral-500">No task history yet.</p>
                                )}
                            </div>
                        </article>

                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900">Upcoming Tasks</h2>
                            <div className="mt-5 space-y-3">
                                {props.upcomingTasks.length > 0 ? (
                                    props.upcomingTasks.map((task) => (
                                        <div key={`${task.reservation_id}-${task.schedule}`} className="rounded-xl border px-4 py-3">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <p className="font-medium text-neutral-900">{task.reservation_id}</p>
                                                    <p className="text-sm text-neutral-500">{task.customer_name ?? 'Unknown customer'}</p>
                                                    <p className="mt-1 text-xs text-neutral-500">
                                                        {task.pickup_address.split(',')[0]} to {task.dropoff_address.split(',')[0]}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="secondary">{task.status}</Badge>
                                                    <p className="mt-2 text-sm text-neutral-600">{task.schedule ?? 'No schedule'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-neutral-500">
                                        No upcoming tasks in your queue.
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

