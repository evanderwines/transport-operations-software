import React, { useEffect, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import TruckLogo from  '../../../public/assets/images/truck.png';

type LatLngLike = { lat: number; lng: number };

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

// Create and memoize the PNG icon once (adjust path, size, anchors as needed)
const vehicleIcon = L.icon({
    iconUrl: TruckLogo, 
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    shadowUrl: undefined,
    shadowSize: undefined,
});

export default function LiveVehicleLocation({ vehicleLoc }: { vehicleLoc: LatLngLike }) {
    const map = useMap();
    const markerRef = useRef<L.Marker | null>(null);

    // displayedPos is what the marker shows; targetRef is filtered incoming pos
    const [displayedPos, setDisplayedPos] = useState<LatLngLike>(vehicleLoc);
    const targetRef = useRef<LatLngLike>(vehicleLoc);

    // Exponential smoothing factor for raw GPS -> target
    const ALPHA = 0.5; // 0.1 = heavy smoothing, 0.5 = light smoothing

    // Animation state
    const animRef = useRef<{ start: number; duration: number; from: LatLngLike; to: LatLngLike } | null>(null);

    // Ensure marker instance is created with our icon on mount
    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setIcon(vehicleIcon);
            markerRef.current.setLatLng([displayedPos.lat, displayedPos.lng]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update target with exponential smoothing when vehicleLoc changes
    useEffect(() => {
        if (!vehicleLoc) return;

        const prev = targetRef.current;
        const smoothed = {
            lat: lerp(prev.lat, vehicleLoc.lat, ALPHA),
            lng: lerp(prev.lng, vehicleLoc.lng, ALPHA),
        };
        targetRef.current = smoothed;

        // start animation from current displayedPos to new smoothed target
        const from = displayedPos;
        const to = smoothed;
        const duration = 600; // ms, tune for smoothness
        animRef.current = { start: performance.now(), duration, from, to };

        // kick off RAF loop
        let raf = 0;
        const step = (ts: number) => {
            const anim = animRef.current;
            if (!anim) return;
            const t = Math.min(1, (ts - anim.start) / anim.duration);
            const next = { lat: lerp(anim.from.lat, anim.to.lat, t), lng: lerp(anim.from.lng, anim.to.lng, t) };
            setDisplayedPos(next);
            // update marker directly for lower latency
            if (markerRef.current) markerRef.current.setLatLng([next.lat, next.lng]);
            if (t < 1) raf = requestAnimationFrame(step);
            else animRef.current = null;
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleLoc]);


    return (
        <Marker
            position={[displayedPos.lat, displayedPos.lng]}
            icon={vehicleIcon}
            ref={(m) => {
                // react-leaflet's Marker ref can be cast to Leaflet Marker instance
                markerRef.current = (m as unknown) as L.Marker | null;
                // ensure icon is set if the instance becomes available later
                if (markerRef.current) markerRef.current.setIcon(vehicleIcon);
            }}
        />
    );
}
