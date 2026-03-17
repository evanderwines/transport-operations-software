import SearchBar from '@/components/search-bar';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Driver, SharedData, Vehicle } from '@/types';
import { router, usePage } from '@inertiajs/react';
import FleetmanagementLayout from '@/layouts/fleet-management/layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMemo, useState, type FormEvent } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reservations',
        href: ""
    },
];


const FleetManagement = () => {
    const props = usePage<{ vehicles: Vehicle[], selectedVehicle?: Vehicle, availableDrivers: Driver[] }>().props;
    const isOpen = usePage<SharedData>().props.sidebarOpen;
    const [plateNumber, setPlateNumber] = useState("");
    const [model, setModel] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("AVAILABLE");
    const [driverId, setDriverId] = useState<string>("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const stats = useMemo(() => {
        const total = props.vehicles.length;
        const available = props.vehicles.filter((v) => v.status === "AVAILABLE").length;
        const assigned = props.vehicles.filter((v) => v.driver_id).length;
        const unassigned = total - assigned;
        const maintenance = props.vehicles.filter((v) => v.status === "MAINTENANCE").length;
        return { total, available, assigned, unassigned, maintenance };
    }, [props.vehicles]);

    const handleCreateVehicle = (event: FormEvent) => {
        event.preventDefault();

        router.post("/fleet", {
            plate_number: plateNumber,
            model,
            capacity,
            status,
            driver_id: driverId || null,
        }, {
            onSuccess: () => {
                setPlateNumber("");
                setModel("");
                setCapacity("");
                setStatus("AVAILABLE");
                setDriverId("");
                setIsCreateOpen(false);
            },
        });
    };

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <FleetmanagementLayout vehicles={props.vehicles} selectedVehicle={props.selectedVehicle} >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">Fleet Overview</h2>
                                <p className="text-sm text-gray-500">Live snapshot of your vehicles and assignments.</p>
                            </div>
                            <Button onClick={() => setIsCreateOpen(true)}>Add Vehicle</Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                            <div className="rounded-lg border bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase text-gray-500">Total Vehicles</p>
                                <p className="mt-2 text-2xl font-semibold">{stats.total}</p>
                            </div>
                            <div className="rounded-lg border bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase text-gray-500">Available</p>
                                <p className="mt-2 text-2xl font-semibold">{stats.available}</p>
                            </div>
                            <div className="rounded-lg border bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase text-gray-500">Assigned</p>
                                <p className="mt-2 text-2xl font-semibold">{stats.assigned}</p>
                            </div>
                            <div className="rounded-lg border bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase text-gray-500">Unassigned</p>
                                <p className="mt-2 text-2xl font-semibold">{stats.unassigned}</p>
                            </div>
                            <div className="rounded-lg border bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase text-gray-500">Maintenance</p>
                                <p className="mt-2 text-2xl font-semibold">{stats.maintenance}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="rounded-lg border bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">Utilization Trend</p>
                                    <span className="text-xs text-gray-500">Last 7 days</span>
                                </div>
                                <div className="mt-4 grid grid-cols-7 gap-2">
                                    {[32, 45, 38, 62, 71, 58, 66].map((value, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2">
                                            <div className="h-50 w-6 rounded-full bg-gray-100">
                                                <div
                                                    className="w-full rounded-full bg-gradient-to-t from-gray-200 to-black"
                                                    style={{ height: `${value}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-gray-400">D{index + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg border bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">Status Mix</p>
                                    <span className="text-xs text-gray-500">Today</span>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {[
                                        { label: "Available", value: stats.available, color: "bg-emerald-500" },
                                        { label: "Assigned", value: stats.assigned, color: "bg-sky-500" },
                                        { label: "Unassigned", value: stats.unassigned, color: "bg-amber-500" },
                                        { label: "Maintenance", value: stats.maintenance, color: "bg-rose-500" },
                                    ].map((item) => {
                                        const percent = stats.total ? Math.round((item.value / stats.total) * 100) : 0;
                                        return (
                                            <div key={item.label} className="space-y-1">
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{item.label}</span>
                                                    <span>{item.value} · {percent}%</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-gray-100">
                                                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${percent}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {isCreateOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Add Vehicle</h2>
                                    <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Close</Button>
                                </div>
                                <p className="text-sm text-gray-500">Create a new vehicle and assign a driver.</p>

                                <form onSubmit={handleCreateVehicle} className="mt-4 space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-600">Plate Number</label>
                                        <Input value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} required />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Model</label>
                                        <Input value={model} onChange={(e) => setModel(e.target.value)} required />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Capacity</label>
                                        <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Status</label>
                                        <select
                                            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="AVAILABLE">AVAILABLE</option>
                                            <option value="UNAVAILABLE">UNAVAILABLE</option>
                                            <option value="MAINTENANCE">MAINTENANCE</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Driver</label>
                                        <select
                                            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                                            value={driverId}
                                            onChange={(e) => setDriverId(e.target.value)}
                                        >
                                            <option value="">Unassigned</option>
                                            {props.availableDrivers.map((driver) => (
                                                <option key={driver.driver_id} value={driver.driver_id}>
                                                    {driver.name} ({driver.driver_id})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                        <Button type="submit">Create Vehicle</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </FleetmanagementLayout>
            </AppLayout>
        </SidebarProvider>
    )
}

export default FleetManagement
