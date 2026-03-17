import SearchBar from '@/components/search-bar';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Driver, SharedData, Vehicle } from '@/types';
import { router, usePage } from '@inertiajs/react';
import FleetmanagementLayout from '@/layouts/fleet-management/layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, type FormEvent } from 'react';


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
            },
        });
    };

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <FleetmanagementLayout vehicles={props.vehicles} selectedVehicle={props.selectedVehicle} >
                    <div className="max-w-2xl rounded-lg border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Add Vehicle</h2>
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

                            <div className="pt-2">
                                <Button type="submit">Create Vehicle</Button>
                            </div>
                        </form>
                    </div>
                </FleetmanagementLayout>
            </AppLayout>
        </SidebarProvider>
    )
}

export default FleetManagement
