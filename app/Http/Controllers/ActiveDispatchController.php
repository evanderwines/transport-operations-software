<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ActiveDispatchController extends Controller
{
    public function index(Request $request)
    {
        $reservations = Reservation::with([
            'dispatch',
            'dispatch.vehicle',
            'dispatch.vehicle.driver',
        ])->whereIn('status', ['EN ROUTE', 'GOING TO PICKCUP', 'GOING TO DROPOFF', 'WAITING'])
        ->get();

        return Inertia::render('admin/active-dispatches', [
            'reservations' => $reservations,
        ]);
    }


    public function show(Request $request, $selectedReservation)
    {
        $reservations = Reservation::with([
            'dispatch',
            'dispatch.vehicle',
            'dispatch.vehicle.driver',
        ])->whereIn('status', ['EN ROUTE', 'GOING TO PICKCUP', 'GOING TO DROPOFF', 'WAITING'])
        ->get();

        return Inertia::render('admin/active-dispatches', [
            'reservations' => $reservations,
            'selectedReservation' => $reservations->firstWhere('reservation_id', $selectedReservation),
        ]);
    }
}
