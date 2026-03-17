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


    // fetch route once when first driver location arrives
    useEffect(() => {

        const waypoints = [
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

    }, []);

    const setBounds = (map: L.Map, bounds: L.LatLngBounds) => {
        map.flyToBounds(bounds, {
            paddingTopLeft: [0, 0],
            paddingBottomRight: [0, 0]
        });
    };

    const setCenter = (map: L.Map) => {}


    return (
        <MapContainer center={pickup} zoom={15} scrollWheelZoom={false} className="z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

            {routePoints.length > 0 && (
                <RoutePolyline
                    routePoints={routePoints}
                    setBounds={setBounds}
                    driverFocus={false}
                    setCenter={setCenter}
                />
            )}

            <Marker position={pickup} />
            <Marker position={dropoff} />
        </MapContainer>
    );
};

export default MapRoute;