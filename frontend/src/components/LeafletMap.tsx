"use client";

import dynamic from "next/dynamic";
import { ApplicationCentre } from "@/lib/types";

const DynamicMap = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 font-semibold">
      Loading OpenStreetMap Leaflet Engine...
    </div>
  ),
});

export function LeafletMap({ centres, language = "ml" }: { centres: ApplicationCentre[]; language?: "ml" | "en" }) {
  return <DynamicMap centres={centres} language={language} />;
}
