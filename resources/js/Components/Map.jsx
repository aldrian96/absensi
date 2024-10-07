import { useEffect, useState, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map({ userId }) {
    const [attendances, setAttendances] = useState([]);
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);

    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
    });

    const fetchAttendances = useCallback(async () => {
        try {
            const response = await fetch("/api/attendances");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAttendances(data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    }, []);

    const initializeMap = useCallback(async () => {
        try {
            await loader.load();
            const mapInstance = new google.maps.Map(
                document.getElementById("map"),
                {
                    center: { lat: -6.9337088, lng: 107.6297728 },
                    zoom: 10,
                }
            );
            setMap(mapInstance);
            setInfoWindow(new google.maps.InfoWindow());
        } catch (error) {
            console.error("Error initializing map:", error);
        }
    }, [loader]);

    const addMarkers = useCallback(() => {
        if (!map || !infoWindow || attendances.length === 0) return;

        attendances.forEach((attendance) => {
            const lat = parseFloat(attendance.latitude);
            const lng = parseFloat(attendance.longitude);

            if (attendance.user_id === userId && !isNaN(lat) && !isNaN(lng)) {
                const marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    title: attendance.user.name,
                });

                const contentString = `
                    <div>
                        <h3>${attendance.user.name}</h3>
                        <p>Status: ${attendance.status}</p>
                        <p>Date: ${new Date(
                            attendance.created_at
                        ).toLocaleString()}</p>
                        <p>Address: ${attendance.address}</p>
                        ${
                            attendance.description
                                ? `<p>Description: ${attendance.description}</p>`
                                : ""
                        }
                    </div>
                `;

                marker.addListener("click", () => {
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                });
            }
        });
    }, [map, infoWindow, attendances, userId]);

    useEffect(() => {
        fetchAttendances();
        initializeMap();
    }, [fetchAttendances, initializeMap]);

    useEffect(() => {
        addMarkers();
    }, [addMarkers]);

    return (
        <div className="h-full">
            <div id="map" className="w-full h-96" />
        </div>
    );
}
