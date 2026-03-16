import { MapContainer, TileLayer } from 'react-leaflet'
import { Reservation, VehicleLocation } from "@/types";
import { useEffect, useState } from "react";
import L, { LatLng } from 'leaflet';
import { getRoutes } from '@/lib/utils';
import RoutePolyline from './route-polyline';
import LiveVehicleLocation from './live-vehicle-location';

interface MapRouteProps {
    reservation: Reservation;
    padding?: number;
}

const MapRoute = ({ reservation, padding = 0 }: MapRouteProps) => {
    const [vehicleLoc, setVehicleLoc] = useState<LatLng | null>(null);
    const [routePoints, setRoutePoints] = useState<LatLng[]>([]);

    // helper to parse reservation latlng strings
    const pickupLatLng = new LatLng(
        parseFloat(reservation.pickup_latlng.split(",")[0]),
        parseFloat(reservation.pickup_latlng.split(",")[1])
    );
    const dropoffLatLng = new LatLng(
        parseFloat(reservation.dropoff_latlng.split(",")[0]),
        parseFloat(reservation.dropoff_latlng.split(",")[1])
    );

    // subscribe to vehicle updates once
    useEffect(() => {
        const echo = (window as any).Echo;
        if (!echo || typeof echo.channel !== "function") return;

        const channel = echo.channel("vehicles");
        channel.listen(".VehicleLocationUpdated", (e: VehicleLocation) => {
            setVehicleLoc(new LatLng(e.lat, e.lng));
        });

        return () => {
            try { echo.leaveChannel("vehicles"); } catch { }
        };
    }, []);

    // compute route whenever vehicleLoc becomes available (or reservation changes)
    useEffect(() => {
        // If you want route only when driver is available:
        if (!vehicleLoc) {
            setRoutePoints([]); // clear route until driver appears
            return;
        }

        // Build waypoints: driver -> pickup -> dropoff
        const waypoints = [
            vehicleLoc,
            pickupLatLng,
            dropoffLatLng
        ];

        getRoutes(waypoints)
            .then(res => {
                setRoutePoints(res);
            })
            .catch(err => {
                console.error("getRoutes error:", err);
            });

    }, [vehicleLoc, reservation.pickup_latlng, reservation.dropoff_latlng]);

    const setBounds = (map: L.Map, bounds: L.LatLngBounds) => {
        map.fitBounds(bounds, {
            paddingTopLeft: [0, 0],
            paddingBottomRight: [0, 70]
        });
    }

    return (
        <div>
            {vehicleLoc && (
                <MapContainer center={vehicleLoc} zoom={15} scrollWheelZoom={false} className='z-0'>
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                    />

                    {routePoints.length > 0 && (
                        <RoutePolyline routePoints={routePoints} driverPos={vehicleLoc} setBounds={setBounds} />
                    )}

                    {vehicleLoc && <LiveVehicleLocation vehicleLoc={vehicleLoc} />}

                    {/* NOTE: pickup/dropoff markers intentionally removed to avoid showing them on the map */}
                </MapContainer>
            )}
        </div>
    );
}

export default MapRoute;
