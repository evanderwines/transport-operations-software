import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
    CalendarClock,
    ClipboardList,
    ShieldCheck,
    Truck,
    Users,
    Wrench,
} from 'lucide-react';

interface DashboardMetricGroup {
    reservations: {
        total: number;
        today: number;
        active: number;
        completed: number;
    };
    fleet: {
        total: number;
        available: number;
        maintenance: number;
        assigned: number;
    };
    users: {
        customers: number;
        drivers: number;
        admins: number;
        drivers_without_vehicle: number;
    };
    dispatches_today: number;
    logs_today: number;
}

interface DashboardBreakdownItem {
    label: string;
    count: number;
    percentage: number;
}

interface DashboardTrendPoint {
    label: string;
    reservations: number;
    activity: number;
}

interface UpcomingDispatch {
    reservation_id: string;
    schedule: string;
    customer_name: string | null;
    vehicle_model: string | null;
    driver_name: string | null;
    status: string | null;
}

interface RecentLog {
    datelog: string;
    timelog: string;
    action: string;
    module: string;
    performed_to: string;
    description: string;
}

interface AdminDashboardProps {
    metrics: DashboardMetricGroup;
    trends: {
        activity: DashboardTrendPoint[];
    };
    breakdowns: {
        reservation_statuses: DashboardBreakdownItem[];
        fleet_statuses: DashboardBreakdownItem[];
        user_roles: DashboardBreakdownItem[];
    };
    upcomingDispatches: UpcomingDispatch[];
    recentLogs: RecentLog[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<SharedData & AdminDashboardProps>();
    const isOpen = props.sidebarOpen;
    const trendMax = Math.max(
        1,
        ...props.trends.activity.flatMap((point) => [point.reservations, point.activity]),
    );

    const metricCards = [
        {
            title: 'Reservations',
            value: props.metrics.reservations.total,
            detail: `${props.metrics.reservations.today} created today`,
            icon: ClipboardList,
        },
        {
            title: 'Active Dispatches',
            value: props.metrics.reservations.active,
            detail: `${props.metrics.dispatches_today} scheduled today`,
            icon: CalendarClock,
        },
        {
            title: 'Fleet Ready',
            value: props.metrics.fleet.available,
            detail: `${props.metrics.fleet.total} total vehicles`,
            icon: Truck,
        },
        {
            title: 'Customers',
            value: props.metrics.users.customers,
            detail: `${props.metrics.users.drivers} drivers in system`,
            icon: Users,
        },
        {
            title: 'System Activity',
            value: props.metrics.logs_today,
            detail: `${props.metrics.reservations.completed} completed reservations`,
            icon: ShieldCheck,
        },
    ];

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="space-y-6 p-4">
                    <section className="overflow-hidden rounded-2xl border bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-700 px-6 py-7 text-white shadow-sm">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin Console</p>
                                <h1 className="mt-3 text-3xl font-semibold tracking-tight">Transport operations at a glance</h1>
                                <p className="mt-2 text-sm text-white/70">
                                    Real-time counts from reservations, fleet, users, dispatches, and activity logs.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                    <p className="text-white/60">Assigned Fleet</p>
                                    <p className="mt-1 text-xl font-semibold">{props.metrics.fleet.assigned}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                    <p className="text-white/60">Maintenance</p>
                                    <p className="mt-1 text-xl font-semibold">{props.metrics.fleet.maintenance}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                    <p className="text-white/60">Admins</p>
                                    <p className="mt-1 text-xl font-semibold">{props.metrics.users.admins}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                    <p className="text-white/60">Drivers Unassigned</p>
                                    <p className="mt-1 text-xl font-semibold">{props.metrics.users.drivers_without_vehicle}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                        {metricCards.map((card) => {
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

                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-900">7-Day Activity</h2>
                                    <p className="text-sm text-neutral-500">Reservations created versus total logged actions.</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-neutral-500">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-900" />
                                        Reservations
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                                        Logs
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-7 gap-3">
                                {props.trends.activity.map((point) => (
                                    <div key={point.label} className="flex flex-col items-center gap-3">
                                        <div className="flex h-56 items-end gap-2">
                                            <div
                                                className="w-5 rounded-t-full bg-neutral-900 transition-all"
                                                style={{ height: `${Math.max(8, (point.reservations / trendMax) * 100)}%` }}
                                                title={`${point.reservations} reservations`}
                                            />
                                            <div
                                                className="w-5 rounded-t-full bg-neutral-300 transition-all"
                                                style={{ height: `${Math.max(8, (point.activity / trendMax) * 100)}%` }}
                                                title={`${point.activity} logs`}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-medium text-neutral-700">{point.label}</p>
                                            <p className="text-[11px] text-neutral-400">{point.reservations}/{point.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <div className="grid gap-4">
                            <article className="rounded-2xl border bg-white p-5 shadow-sm">
                                <h2 className="text-lg font-semibold text-neutral-900">Reservation Statuses</h2>
                                <div className="mt-4 space-y-4">
                                    {props.breakdowns.reservation_statuses.map((item) => (
                                        <div key={item.label}>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-neutral-700">{item.label}</span>
                                                <span className="text-neutral-500">{item.count} · {item.percentage}%</span>
                                            </div>
                                            <div className="mt-2 h-2 rounded-full bg-neutral-100">
                                                <div className="h-2 rounded-full bg-neutral-900" style={{ width: `${item.percentage}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>

                            <article className="rounded-2xl border bg-white p-5 shadow-sm">
                                <h2 className="text-lg font-semibold text-neutral-900">Fleet Statuses</h2>
                                <div className="mt-4 space-y-4">
                                    {props.breakdowns.fleet_statuses.map((item) => (
                                        <div key={item.label}>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-neutral-700">{item.label}</span>
                                                <span className="text-neutral-500">{item.count} · {item.percentage}%</span>
                                            </div>
                                            <div className="mt-2 h-2 rounded-full bg-neutral-100">
                                                <div className="h-2 rounded-full bg-neutral-700" style={{ width: `${item.percentage}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-900">Upcoming Dispatches</h2>
                                    <p className="text-sm text-neutral-500">Next scheduled trips from the dispatch table.</p>
                                </div>
                                <div className="rounded-xl bg-neutral-100 p-3 text-neutral-700">
                                    <CalendarClock className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mt-5 space-y-3">
                                {props.upcomingDispatches.length === 0 && (
                                    <div className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-neutral-500">
                                        No upcoming dispatches on the schedule.
                                    </div>
                                )}

                                {props.upcomingDispatches.map((dispatch) => (
                                    <div key={`${dispatch.reservation_id}-${dispatch.schedule}`} className="rounded-xl border px-4 py-3">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="font-medium text-neutral-900">{dispatch.reservation_id}</p>
                                                <p className="text-sm text-neutral-500">
                                                    {dispatch.customer_name ?? 'Unknown customer'} · {dispatch.vehicle_model ?? 'No vehicle'}
                                                </p>
                                                <p className="text-sm text-neutral-400">{dispatch.driver_name ?? 'No driver assigned'}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="secondary">{dispatch.status ?? 'UNKNOWN'}</Badge>
                                                <p className="mt-2 text-sm text-neutral-600">{dispatch.schedule}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
                                    <p className="text-sm text-neutral-500">Latest system log entries across modules.</p>
                                </div>
                                <div className="rounded-xl bg-neutral-100 p-3 text-neutral-700">
                                    <Wrench className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                {props.recentLogs.map((log) => (
                                    <div key={`${log.datelog}-${log.timelog}-${log.performed_to}`} className="flex gap-3">
                                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-neutral-900" />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge variant={log.action === 'DELETE' ? 'destructive' : 'secondary'}>{log.action}</Badge>
                                                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{log.module}</span>
                                            </div>
                                            <p className="mt-2 text-sm text-neutral-800">{log.description}</p>
                                            <p className="mt-1 text-xs text-neutral-500">
                                                {log.performed_to} · {log.datelog} {log.timelog}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </section>
                </div>
            </AppLayout>
        </SidebarProvider>
    );
}
