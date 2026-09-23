"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ApplicationCentre } from "@/lib/types";

// Custom marker icon for OpenStreetMap Leaflet
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  centres: ApplicationCentre[];
  language?: "ml" | "en";
}

export default function LeafletMapInner({ centres, language = "ml" }: MapProps) {
  const centerLat = 10.0;
  const centerLng = 76.5;

  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-md z-0">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {centres.map((c) => (
          <Marker key={c.id} position={[c.latitude, c.longitude]} icon={customIcon}>
            <Popup>
              <div className="p-1 max-w-xs">
                <h4 className="font-bold text-sm text-emerald-950 mb-1">
                  {language === "ml" ? c.name_ml : c.name}
                </h4>
                <p className="text-xs text-slate-600 mb-2">{language === "ml" ? c.address_ml : c.address}</p>
                <div className="text-xs font-semibold text-emerald-700 mb-1">
                  📞 {c.phone}
                </div>
                <div className="text-[11px] text-slate-500">
                  🕒 {language === "ml" ? c.openingHours_ml : c.openingHours}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
