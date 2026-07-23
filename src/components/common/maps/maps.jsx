// Maps.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Fix default marker icons so they load correctly with bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function SearchControl({ onLocation }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const control = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: "Enter address or location...",
    });

    map.addControl(control);

    const handler = (result) => {
      const { x: lng, y: lat, label } = result.location;
      onLocation({ lat, lng, label });
      map.setView([lat, lng], 13);
    };

    map.on("geosearch/showlocation", handler);

    return () => {
      map.removeControl(control);
      map.off("geosearch/showlocation", handler);
    };
  }, [map, onLocation]);

  return null;
}

export default function Maps() {
  const [locationInfo, setLocationInfo] = useState({
    lat: -6.2088,
    lng: 106.8456,
    label: "Search for a location to see its coordinates here.",
  });

  const center = useMemo(() => [locationInfo.lat, locationInfo.lng], [locationInfo]);

  const handleLocation = useCallback((loc) => {
    setLocationInfo(loc);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Location Search on Leaflet Map (React)
        </h1>

        <div className="text-center bg-gray-200 p-3 rounded-lg mb-4 text-gray-700">
          {locationInfo.label.includes("Search for a location") ? (
            <p>{locationInfo.label}</p>
          ) : (
            <p>
              <strong className="block">{locationInfo.label}</strong>
              Latitude: <b>{locationInfo.lat.toFixed(6)}</b>, Longitude:{" "}
              <b>{locationInfo.lng.toFixed(6)}</b>
            </p>
          )}
        </div>

        <div style={{ height: 500, width: "100%", borderRadius: 8, overflow: "hidden" }}>
          <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <SearchControl onLocation={handleLocation} />

            {locationInfo.label.includes("Search for a location") ? null : (
              <Marker position={[locationInfo.lat, locationInfo.lng]}>
                <Popup>
                  <b>{locationInfo.label}</b>
                  <br />
                  Lat: {locationInfo.lat.toFixed(4)}, Lng: {locationInfo.lng.toFixed(4)}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
