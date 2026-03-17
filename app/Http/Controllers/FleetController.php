<?php

namespace App\Http\Controllers;

use App\Models\Dispatch;
use App\Models\Reservation;
use App\Models\Driver;
use App\Models\Vehicle;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FleetController extends Controller
{
    public function index(Request $request)
    {
        $assignedDriverIds = Vehicle::whereNotNull('driver_id')->pluck('driver_id')->filter()->values();
        $availableDrivers = Driver::whereNotIn('driver_id', $assignedDriverIds)->get();

        return Inertia::render('admin/fleet-management', [
            'vehicles' => Vehicle::with('driver')->get(),
            'availableDrivers' => $availableDrivers,
        ]);
    }

    public function show($vehicle_id)
    {
        $assignedDriverIds = Vehicle::whereNotNull('driver_id')->pluck('driver_id')->filter()->values();
        $availableDrivers = Driver::whereNotIn('driver_id', $assignedDriverIds)->get();

        $vehicle_reservations = Reservation::whereIn('reservation_id', Dispatch::where("vehicle_id", $vehicle_id)
        ->pluck('reservation_id'))
        ->with('dispatch')
        ->orderBy(
            Dispatch::select('schedule')
                ->whereColumn('reservations.reservation_id', 'dispatches.reservation_id')
                    ->limit(1),
                'desc'
            )
        ->get();


        return Inertia::render('admin/fleet-details', [
            'vehicles' => Vehicle::with('driver')->get(),
            'selectedVehicle' => Vehicle::with('driver')->where('vehicle_id', $vehicle_id)->firstOrFail(),
            'reservations' => $vehicle_reservations,
            'availableDrivers' => $availableDrivers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate_number' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'capacity' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'driver_id' => ['nullable', 'string', 'max:255', 'exists:drivers,driver_id'],
        ]);

        if (! empty($validated['driver_id'])) {
            $alreadyAssigned = Vehicle::where('driver_id', $validated['driver_id'])->first();
            if ($alreadyAssigned) {
                return back()->withErrors([
                    'driver_id' => 'That driver is already assigned to a vehicle.',
                ]);
            }
        }

        Vehicle::create([
            'vehicle_id' => Str::orderedUuid(),
            'driver_id' => $validated['driver_id'] ?? null,
            'plate_number' => $validated['plate_number'],
            'model' => $validated['model'],
            'capacity' => $validated['capacity'] ?? null,
            'status' => $validated['status'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if (! empty($validated['driver_id'])) {
            Driver::where('driver_id', $validated['driver_id'])->update([
                'status' => 'ASSIGNED',
                'updated_at' => now(),
            ]);
        }

        return redirect()->route('fleet.index');
    }
}
