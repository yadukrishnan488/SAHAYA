"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { ScreeningSchemeResult } from "@/lib/types";
import { checkEligibility } from "@/lib/api";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, FileText, MapPin, ArrowRight, RefreshCw } from "lucide-react";

export default function ResultsPage() {
  const { results, setResults, profile, language, t, easyMode } = useApp();
  const router = useRouter();
  const [filter, setFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!results) {
      // Auto-evaluate if profile exists
      (async () => {
        setLoading(true);
        try {
          const res = await checkEligibility(profile);
          setResults(res);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [results, profile, setResults]);

  if (loading || !results) {
    return (
      <div className="py-16 text-center space-y-4">
        <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
        <h3 className="text-xl font-bold text-slate-800">
          {language === "ml" ? "ഡെമോ റൂൾസ് എൻജിൻ പ്രവർത്തിക്കുന്നു..." : "Evaluating profile with Deterministic Rules Engine..."}
        </h3>
      </div>
    );
  }

  const { potentiallyEligibleCount, moreInfoNeededCount, notMatchedCount, results: schemeResults } = results;

  const filteredSchemes = schemeResults.filter((s) => {
    if (filter === "ELIGIBLE") return s.status === "POTENTIALLY_ELIGIBLE";
    if (filter === "MORE_INFO") return s.status === "MORE_INFORMATION_NEEDED";
    if (filter === "NOT_MATCHED") return s.status === "NOT_MATCHED";
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className={`font-extrabold text-slate-900 ${easyMode ? "text-3xl" : "text-2xl sm:text-3xl"}`}>
              {t.resultsTitle}
            </h1>
            <p className="text-sm font-semibold text-emerald-800 mt-1">
              {t.resultsSubtitle}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/documents"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition"
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>{t.viewDocuments}</span>
            </Link>

            <Link
              href="/centres"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-xs transition"
            >
              <MapPin className="w-4 h-4 text-teal-700" />
              <span>{t.viewCentres}</span>
            </Link>
          </div>
        </div>

        {/* Status Summary Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <button
            onClick={() => setFilter(filter === "ELIGIBLE" ? "ALL" : "ELIGIBLE")}
            className={`p-4 rounded-2xl border-2 font-bold text-left flex items-center justify-between transition ${
              filter === "ELIGIBLE"
                ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                : "border-emerald-200 bg-emerald-50/50 text-emerald-900 hover:border-emerald-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-sm">{t.eligibleCountLabel}</span>
            </div>
            <span className="text-2xl font-black text-emerald-700">{potentiallyEligibleCount}</span>
          </button>

          <button
            onClick={() => setFilter(filter === "MORE_INFO" ? "ALL" : "MORE_INFO")}
            className={`p-4 rounded-2xl border-2 font-bold text-left flex items-center justify-between transition ${
              filter === "MORE_INFO"
                ? "border-amber-600 bg-amber-50 text-amber-950 shadow-sm"
                : "border-amber-200 bg-amber-50/50 text-amber-900 hover:border-amber-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-sm">{t.moreInfoCountLabel}</span>
            </div>
            <span className="text-2xl font-black text-amber-700">{moreInfoNeededCount}</span>
          </button>

          <button
            onClick={() => setFilter(filter === "NOT_MATCHED" ? "ALL" : "NOT_MATCHED")}
            className={`p-4 rounded-2xl border-2 font-bold text-left flex items-center justify-between transition ${
              filter === "NOT_MATCHED"
                ? "border-rose-600 bg-rose-50 text-rose-950 shadow-sm"
                : "border-rose-200 bg-rose-50/50 text-rose-900 hover:border-rose-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span className="text-sm">{t.notMatchedCountLabel}</span>
            </div>
            <span className="text-2xl font-black text-rose-700">{notMatchedCount}</span>
          </button>
        </div>
      </div>

      {/* Scheme Cards List */}
      <div className="space-y-4">
        {filteredSchemes.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl text-center border border-slate-200 space-y-3">
            <p className="text-slate-600 font-semibold">{t.noMatchesFound}</p>
            <button
              onClick={() => router.push("/questions")}
              className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              {t.reviewInformation}
            </button>
          </div>
        ) : (
          filteredSchemes.map((scheme) => {
            const isEligible = scheme.status === "POTENTIALLY_ELIGIBLE";
            const isMoreInfo = scheme.status === "MORE_INFORMATION_NEEDED";
            const isExpanded = expandedId === scheme.schemeId;

            return (
              <div
                key={scheme.schemeId}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Scheme Card Header */}
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">
                        {scheme.targetGroup === "fishing" ? "🎣" : scheme.targetGroup === "plantation" ? "🌿" : "🏥"}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {language === "ml" ? scheme.name_ml : scheme.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {language === "ml" ? scheme.description_ml : scheme.description}
                        </p>
                      </div>
                    </div>

                    {/* Badge */}
                    <div>
                      {isEligible && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 font-extrabold text-xs px-3 py-1.5 rounded-full border border-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                          <span>🟢 POTENTIALLY ELIGIBLE</span>
                        </span>
                      )}
                      {isMoreInfo && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1.5 rounded-full border border-amber-300">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                          <span>🟡 MORE INFO NEEDED</span>
                        </span>
                      )}
                      {!isEligible && !isMoreInfo && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-900 font-extrabold text-xs px-3 py-1.5 rounded-full border border-rose-300">
                          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                          <span>🔴 NOT MATCHED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl">
                    <div>
                      <span className="font-bold text-slate-700">📄 Required Documents: </span>
                      <span className="text-slate-600 font-medium">
                        {scheme.requiredDocuments.length} documents
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">📍 Where to Apply: </span>
                      <span className="text-slate-600 font-medium">
                        {language === "ml" ? scheme.applicationLocation_ml : scheme.applicationLocation}
                      </span>
                    </div>
                  </div>

                  {/* Why Button Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleExpand(scheme.schemeId)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
                    >
                      <span>{t.whyThisResult}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <div className="flex items-center gap-2">
                      {isMoreInfo && (
                        <button
                          onClick={() => router.push("/questions")}
                          className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded-xl text-xs hover:bg-amber-700 transition"
                        >
                          {t.provideInfo}
                        </button>
                      )}
                      <Link
                        href={`/scheme/${scheme.schemeId}`}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                      >
                        <span>{t.viewDetails}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Expandable "Why am I seeing this?" Section */}
                {isExpanded && (
                  <div className="bg-emerald-50/70 border-t border-emerald-100 p-6 space-y-4">
                    <h4 className="font-extrabold text-sm text-emerald-950 uppercase tracking-wider">
                      {t.whyThisResult}
                    </h4>

                    {/* Matched Rules Breakdown */}
                    {scheme.matchedRules.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-emerald-900">{t.whyMatchedConditions}</p>
                        <ul className="space-y-1 text-xs text-emerald-950 font-medium">
                          {(language === "ml" ? scheme.matchedRules_ml : scheme.matchedRules).map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Missing Fields Breakdown */}
                    {scheme.missingFields.length > 0 && (
                      <div className="space-y-2 bg-amber-100/60 p-3 rounded-xl border border-amber-200">
                        <p className="text-xs font-bold text-amber-900">{t.whyMissingInfo}</p>
                        <ul className="list-disc list-inside text-xs text-amber-950 font-medium">
                          {scheme.missingFields.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Failed Rules Breakdown */}
                    {scheme.failedRules.length > 0 && (
                      <div className="space-y-2 bg-rose-100/60 p-3 rounded-xl border border-rose-200">
                        <p className="text-xs font-bold text-rose-900">{t.whyNotMatched}:</p>
                        <div className="space-y-1 text-xs text-rose-950">
                          {scheme.failedRules.map((fr, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                              <span className="font-bold">
                                {language === "ml" ? fr.field_label_ml : fr.field_label_en}:
                              </span>
                              <span>
                                Provided: <code className="bg-rose-200 px-1 rounded">{String(fr.provided)}</code> | Required: <code className="bg-emerald-200 px-1 rounded">{String(fr.required)}</code>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
