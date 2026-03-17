import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginationType, SharedData, SystemLogEntry } from '@/types';
import { usePage, router, Link } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMemo, useState } from 'react';
import Heading from '@/components/heading';

interface LogsPageProps {
    logs: PaginationType<SystemLogEntry[]>;
    filters: {
        q?: string;
        action?: string;
        module?: string;
        date_from?: string;
        date_to?: string;
    };
    stats: {
        total: number;
        actions: Record<string, number>;
        modules: Record<string, number>;
    };
    modules: string[];
    actions: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'System Logs',
        href: '/logs',
    },
];

export default function SystemLogs() {
    const { props } = usePage<LogsPageProps & SharedData>();
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    const [query, setQuery] = useState(props.filters.q ?? '');
    const [action, setAction] = useState(props.filters.action ?? '');
    const [module, setModule] = useState(props.filters.module ?? '');
    const [dateFrom, setDateFrom] = useState(props.filters.date_from ?? '');
    const [dateTo, setDateTo] = useState(props.filters.date_to ?? '');

    const summary = useMemo(() => {
        const adds = props.stats.actions.ADD ?? 0;
        const updates = props.stats.actions.UPDATE ?? 0;
        const deletes = props.stats.actions.DELETE ?? 0;
        return { adds, updates, deletes };
    }, [props.stats.actions]);

    const applyFilters = (event: React.FormEvent) => {
        event.preventDefault();
        router.get('/logs', {
            q: query || undefined,
            action: action || undefined,
            module: module || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setQuery('');
        setAction('');
        setModule('');
        setDateFrom('');
        setDateTo('');
        router.get('/logs', {}, { replace: true });
    };

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 px-4 py-6">
                    <Heading title='System Logs' />


                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-lg border bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase text-gray-500">Total Entries</p>
                            <p className="mt-2 text-2xl font-semibold">{props.stats.total}</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase text-gray-500">Adds</p>
                            <p className="mt-2 text-2xl font-semibold">{summary.adds}</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase text-gray-500">Updates</p>
                            <p className="mt-2 text-2xl font-semibold">{summary.updates}</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 shadow-sm">
                            <p className="text-xs uppercase text-gray-500">Deletes</p>
                            <p className="mt-2 text-2xl font-semibold">{summary.deletes}</p>
                        </div>
                    </div>


                    <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm">
                        <div className="grid grid-cols-12 border-b bg-gray-50 px-4 py-3 text-xs font-semibold uppercase text-gray-500">
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Action</div>
                            <div className="col-span-2">Module</div>
                            <div className="col-span-3">Performed To</div>
                            <div className="col-span-3">Description</div>
                        </div>
                        <div className="divide-y">
                            {props.logs.data.map((log, index) => (
                                <div key={`${log.datelog}-${log.timelog}-${index}`} className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm">
                                    <div className="col-span-2 text-gray-600">
                                        <p className="font-medium">{log.datelog}</p>
                                        <p className="text-xs text-gray-400">{log.timelog}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <Badge
                                            variant={log.action === 'DELETE' ? 'destructive' : log.action === 'ADD' ? 'default' : 'secondary'}
                                        >
                                            {log.action}
                                        </Badge>
                                    </div>
                                    <div className="col-span-2 text-gray-700">{log.module}</div>
                                    <div className="col-span-3 text-gray-600">{log.performed_to}</div>
                                    <div className="col-span-3 text-gray-600">{log.description}</div>
                                </div>
                            ))}
                            {props.logs.data.length === 0 && (
                                <div className="px-4 py-10 text-center text-sm text-gray-500">
                                    No logs found for the selected filters.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-3 text-xs text-gray-500 md:flex-row md:items-center">
                        <span>
                            Showing {props.logs.from ?? 0}-{props.logs.to ?? 0} of {props.logs.total} entries
                        </span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={!props.logs.prev_page_url} asChild>
                                <Link href={props.logs.prev_page_url ?? ''}>Previous</Link>
                            </Button>
                            <Button variant="outline" size="sm" disabled={!props.logs.next_page_url} asChild>
                                <Link href={props.logs.next_page_url ?? ''}>Next</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </SidebarProvider>
    );
}
