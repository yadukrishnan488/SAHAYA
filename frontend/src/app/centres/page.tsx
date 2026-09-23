"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/context";
import { ApplicationCentre } from "@/lib/types";
import { fetchCentres } from "@/lib/api";
import { LeafletMap } from "@/components/LeafletMap";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export default function CentresPage() {
  const { language, t, easyMode } = useApp();
  const [centres, setCentres] = useState<ApplicationCentre[]>([]);
  const [districtFilter, setDistrictFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchCentres(districtFilter || undefined);
      setCentres(data);
      setLoading(false);
    })();
  }, [districtFilter]);

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className={`font-extrabold text-slate-900 ${easyMode ? "text-3xl" : "text-2xl sm:text-3xl"}`}>
              {t.centresTitle}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{t.centresSub}</p>
          </div>

          {/* District Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">{t.filterDistrict}</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-300 font-bold text-xs bg-slate-50 focus:border-emerald-600 outline-none"
            >
              <option value="">{t.allDistricts}</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Idukki">Idukki</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Wayanad">Wayanad</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <LeafletMap centres={centres} language={language} />
      </div>

      {/* Centres List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {centres.map((c) => (
          <div
            key={c.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md uppercase">
                  {c.district} District
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {language === "ml" ? c.name_ml : c.name}
                </h3>
              </div>
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              📍 {language === "ml" ? c.address_ml : c.address}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span className="truncate">{language === "ml" ? c.openingHours_ml : c.openingHours}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Services Provided:</p>
              <ul className="flex flex-wrap gap-1.5">
                {(language === "ml" ? c.services_ml : c.services).map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg"
                  >
                    {s}
                  </span>
                ))}
              </ul>
            </div>

            <a
              href={`https://maps.google.com/?q=${c.latitude},${c.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t.getDirections}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
