"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { Scheme } from "@/lib/types";
import { fetchSchemes } from "@/lib/api";
import { ArrowLeft, CheckCircle2, FileText, MapPin, ShieldAlert, ExternalLink } from "lucide-react";

export default function SchemeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { results, language, t, easyMode } = useApp();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  const schemeId = params.id as string;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const allSchemes = await fetchSchemes();
      const match = allSchemes.find((s) => s.id === schemeId);
      if (match) {
        setScheme(match);
      }
      setLoading(false);
    })();
  }, [schemeId]);

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-500 font-semibold">
        Loading scheme details...
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Scheme Not Found</h3>
        <button
          onClick={() => router.push("/results")}
          className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm"
        >
          Return to Results
        </button>
      </div>
    );
  }

  // Find user's screening status for this scheme if available
  const resultDetail = results?.results.find((r) => r.schemeId === scheme.id);
  const status = resultDetail?.status || "POTENTIALLY_ELIGIBLE";

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.back}</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
              {scheme.targetGroup} Sector
            </span>
            <h1 className={`font-extrabold text-slate-900 ${easyMode ? "text-3xl" : "text-2xl sm:text-3xl"}`}>
              {language === "ml" ? scheme.name_ml : scheme.name}
            </h1>
          </div>

          <div>
            {status === "POTENTIALLY_ELIGIBLE" && (
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-3.5 py-2 rounded-full border border-emerald-300 inline-block">
                🟢 POTENTIALLY ELIGIBLE
              </span>
            )}
            {status === "MORE_INFORMATION_NEEDED" && (
              <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3.5 py-2 rounded-full border border-amber-300 inline-block">
                🟡 MORE INFO NEEDED
              </span>
            )}
            {status === "NOT_MATCHED" && (
              <span className="bg-rose-100 text-rose-900 font-extrabold text-xs px-3.5 py-2 rounded-full border border-rose-300 inline-block">
                🔴 NOT MATCHED
              </span>
            )}
          </div>
        </div>

        {/* About Scheme */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">{t.aboutScheme}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === "ml" ? scheme.description_ml : scheme.description}
          </p>
        </div>

        {/* Why this result rules evaluation breakdown */}
        {resultDetail && (
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-3">
            <h4 className="font-extrabold text-sm text-emerald-950">{t.whyThisResult}</h4>
            {resultDetail.matchedRules.length > 0 && (
              <ul className="space-y-1 text-xs text-emerald-900 font-medium">
                {(language === "ml" ? resultDetail.matchedRules_ml : resultDetail.matchedRules).map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Grid: Documents & Application Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Documents Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3>{t.requiredDocs}</h3>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {(language === "ml" ? scheme.requiredDocuments_ml : scheme.requiredDocuments).map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium text-xs">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Application Method & Location Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
            <MapPin className="w-5 h-5 text-teal-600" />
            <h3>{t.whereToApply}</h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.appMethod}</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {language === "ml" ? scheme.applicationMethod_ml : scheme.applicationMethod}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.whereToApply}</p>
              <p className="text-sm font-bold text-emerald-800 mt-1">
                {language === "ml" ? scheme.applicationLocation_ml : scheme.applicationLocation}
              </p>
            </div>

            <Link
              href="/centres"
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-3.5 py-2 rounded-xl transition border border-teal-200"
            >
              <span>{t.viewCentres}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Official Government Disclaimer Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 font-medium leading-relaxed">
          {t.officialDisclaimer}
        </p>
      </div>
    </div>
  );
}
