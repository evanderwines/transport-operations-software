<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MyActiveReservationsController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with([
            'customer',
            'dispatch',
            'dispatch.vehicle',
            'dispatch.vehicle.driver',
        ])
            ->where('customer_id', $request->user()->id)
            ->whereIn('status', ['EN ROUTE', 'GOING TO PICKUP', 'GOING TO DROPOFF', 'WAITING']);

        $search = trim((string) $request->query('q', ''));

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('reservation_id', 'like', '%'.$search.'%')
                    ->orWhere('service_type', 'like', '%'.$search.'%')
                    ->orWhere('pickup_address', 'like', '%'.$search.'%')
                    ->orWhere('dropoff_address', 'like', '%'.$search.'%')
                    ->orWhereHas('dispatch.vehicle', function ($vq) use ($search) {
                        $vq->where('model', 'like', '%'.$search.'%')
                            ->orWhere('plate_number', 'like', '%'.$search.'%');
                    })
                    ->orWhereHas('dispatch.vehicle.driver', function ($dq) use ($search) {
                        $dq->where('name', 'like', '%'.$search.'%');
                    });
            });
        }

        $reservations = $query->get();

        return Inertia::render('customer/active-reservations', [
            'reservations' => $reservations,
            'filters' => [
                'q' => $search,
            ],
        ]);
    }


    public function show(Request $request, $selectedReservation)
    {
        $query = Reservation::with([
            'customer',
            'dispatch',
            'dispatch.vehicle',
            'dispatch.vehicle.driver',
        ])
            ->where('customer_id', $request->user()->id)
            ->whereIn('status', ['EN ROUTE', 'GOING TO PICKUP', 'GOING TO DROPOFF', 'WAITING']);

        $search = trim((string) $request->query('q', ''));

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('reservation_id', 'like', '%'.$search.'%')
                    ->orWhere('service_type', 'like', '%'.$search.'%')
                    ->orWhere('pickup_address', 'like', '%'.$search.'%')
                    ->orWhere('dropoff_address', 'like', '%'.$search.'%')
                    ->orWhereHas('dispatch.vehicle', function ($vq) use ($search) {
                        $vq->where('model', 'like', '%'.$search.'%')
                            ->orWhere('plate_number', 'like', '%'.$search.'%');
                    })
                    ->orWhereHas('dispatch.vehicle.driver', function ($dq) use ($search) {
                        $dq->where('name', 'like', '%'.$search.'%');
                    });
            });
        }

        $reservations = $query->get();

        return Inertia::render('customer/active-reservations', [
            'reservations' => $reservations,
            'selectedReservation' => $reservations->firstWhere('reservation_id', $selectedReservation),
            'filters' => [
                'q' => $search,
            ],
        ]);
    }
}
