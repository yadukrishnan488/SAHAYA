"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { Anchor, Trees, ArrowRight, Check } from "lucide-react";

export default function StartPage() {
  const { language, setLanguage, profile, setProfile, t, easyMode } = useApp();
  const router = useRouter();

  const handleSelectFamilyType = (type: "fishing" | "plantation") => {
    setProfile((prev) => ({
      ...prev,
      familyType: type,
      occupation: type === "fishing" ? "fishing" : "plantation worker",
    }));
    router.push("/questions");
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      {/* Step 1: Language Selection */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>🌐</span>
          <span>{t.chooseLang}</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setLanguage("ml")}
            className={`p-5 rounded-2xl border-2 font-bold text-lg flex items-center justify-between transition-all ${
              language === "ml"
                ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                : "border-slate-200 hover:border-emerald-300 text-slate-700 bg-white"
            }`}
          >
            <span>മലയാളം</span>
            {language === "ml" && <Check className="w-6 h-6 text-emerald-600" />}
          </button>

          <button
            onClick={() => setLanguage("en")}
            className={`p-5 rounded-2xl border-2 font-bold text-lg flex items-center justify-between transition-all ${
              language === "en"
                ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                : "border-slate-200 hover:border-emerald-300 text-slate-700 bg-white"
            }`}
          >
            <span>English</span>
            {language === "en" && <Check className="w-6 h-6 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Step 2: Family Type Selection */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-xl"}`}>
            {t.familyTypeQuestion}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {language === "ml"
              ? "നിങ്ങളുടെ കുടുംബത്തിന്റെ പ്രധാന തൊഴിൽ മേഖല അനുസരിച്ച് തിരഞ്ഞെടുക്കുക"
              : "Select the primary sector your household relies on"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Fishing Family Card */}
          <button
            onClick={() => handleSelectFamilyType("fishing")}
            className="group text-left p-6 rounded-3xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
              🎣
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900">
                {t.fishingFamilyTitle}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {t.fishingFamilyDesc}
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
              <span>{t.startScreening}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Plantation Family Card */}
          <button
            onClick={() => handleSelectFamilyType("plantation")}
            className="group text-left p-6 rounded-3xl border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
              🌿
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900">
                {t.plantationFamilyTitle}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {t.plantationFamilyDesc}
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-teal-700 gap-1 group-hover:translate-x-1 transition-transform">
              <span>{t.startScreening}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
