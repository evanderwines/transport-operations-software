import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Reservation, VehicleLocation } from "@/types";
import { useEffect, useState } from "react";

import L, { LatLng } from 'leaflet';

import '../bootstrap';
import { getRoutes } from '@/lib/utils';
import RoutePolyline from './route-polyline';
import LiveVehicleLocation from './live-vehicle-location';
import { LoaderCircle } from 'lucide-react';

interface MapRouteProps {
    reservation: Reservation;
    padding?: number;
}

const MapRoute = ({ reservation, padding = 0 }: MapRouteProps) => {

    const [vehicleLoc, setVehicleLoc] = useState<LatLng | null>(null);
    const [routePoints, setRoutePoints] = useState<LatLng[]>([]);
    const [routeInitialized, setRouteInitialized] = useState(false);

    const pickup = new LatLng(
        parseFloat(reservation.pickup_latlng.split(",")[0]),
        parseFloat(reservation.pickup_latlng.split(",")[1])
    );

    const dropoff = new LatLng(
        parseFloat(reservation.dropoff_latlng.split(",")[0]),
        parseFloat(reservation.dropoff_latlng.split(",")[1])
    );

    // listen for driver updates
    useEffect(() => {

        const echo = (window as any).Echo;
        if (!echo || typeof echo.channel !== "function") return;

        const channel = echo.channel("vehicles");

        channel.listen(".VehicleLocationUpdated", (e: VehicleLocation) => {
            if (e.vehicle_id === reservation.dispatch.vehicle_id) {
                setVehicleLoc(new LatLng(e.lat, e.lng));
            }
        });

        return () => {
            try { echo.leaveChannel("vehicles"); } catch { }
        };

    }, []);

    // fetch route once when first driver location arrives
    useEffect(() => {

        if (!vehicleLoc || routeInitialized) return;

        const waypoints = [
            vehicleLoc,
            pickup,
            dropoff
        ];

        getRoutes(waypoints)
            .then(res => {
                setRoutePoints(res);
                setRouteInitialized(true);
            })
            .catch(err => {
                console.log(err);
            });

    }, [vehicleLoc]);

    const setBounds = (map: L.Map, bounds: L.LatLngBounds) => {
        map.fitBounds(bounds, {
            paddingTopLeft: [0, 0],
            paddingBottomRight: [0, 0]
        });
    };

    if (!vehicleLoc) {
        return (
            <div className="flex items-center justify-center gap-2 h-[400px] text-sm text-muted-foreground">
                <LoaderCircle className='h-4 w-4 animate-spin' />
                <p>Calculating route...</p>
            </div>
        );
    }

    return (
        <MapContainer center={vehicleLoc} zoom={15} scrollWheelZoom={false} className="z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

            {routePoints.length > 0 && (
                <RoutePolyline
                    routePoints={routePoints}
                    driverPos={vehicleLoc}
                    setBounds={setBounds}
                />
            )}

            <LiveVehicleLocation vehicleLoc={vehicleLoc} />

            <Marker position={pickup} />
            <Marker position={dropoff} />
        </MapContainer>
    );
};

export default MapRoute;