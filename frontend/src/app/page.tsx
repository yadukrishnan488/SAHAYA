"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { VoiceMicButton } from "@/components/VoiceMicButton";
import { extractVoiceProfile, checkEligibility } from "@/lib/api";
import { Search, HelpCircle, FileText, Mic, ShieldAlert, ArrowRight, Anchor, Trees, Zap } from "lucide-react";

export default function HomePage() {
  const { t, language, easyMode, loadJudgeDemo, profile, setProfile, setResults } = useApp();
  const router = useRouter();
  const [voiceExtractedText, setVoiceExtractedText] = useState("");

  const handleDemoClick = async (type: "fishing" | "plantation" | "incomplete") => {
    await loadJudgeDemo(type);
    router.push("/results");
  };

  const handleHeroVoiceInput = async (transcript: string) => {
    setVoiceExtractedText(transcript);
    const extracted = await extractVoiceProfile(transcript, profile);
    setProfile(extracted.updated_profile);
    const res = await checkEligibility(extracted.updated_profile);
    setResults(res);
    router.push("/results");
  };

  return (
    <div className="space-y-10 py-4">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur">
            <span>🌿</span>
            <span>{language === "ml" ? "മത്സ്യ-തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾക്കായി" : "For Plantation & Fishing Families"}</span>
          </div>

          <h1 className={`font-extrabold tracking-tight leading-tight ${easyMode ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"}`}>
            {t.heroTitle}
          </h1>

          <p className="text-emerald-100 text-lg sm:text-xl font-normal leading-relaxed">
            {t.heroTitleMl}
          </p>

          <p className="text-emerald-200/90 text-sm sm:text-base leading-relaxed">
            {t.heroDescription}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-6 py-3.5 rounded-2xl font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.startScreening}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="bg-white/10 backdrop-blur border border-white/20 p-1.5 rounded-2xl">
              <VoiceMicButton onTranscript={handleHeroVoiceInput} label={t.askByVoice} />
            </div>

            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 text-xs text-emerald-200 hover:text-white underline underline-offset-4"
            >
              <span>Or open full assistant →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hackathon Judge Demo Fast-Load Banner */}
      <section className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>{t.judgeFastLoad}</span>
          <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-semibold">1-Click Fast Results</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleDemoClick("fishing")}
            className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition hover:border-emerald-500"
          >
            <Anchor className="w-4 h-4 text-emerald-600" />
            <span>{t.loadFishingDemo}</span>
          </button>

          <button
            onClick={() => handleDemoClick("plantation")}
            className="flex items-center gap-2 bg-white hover:bg-teal-50 text-teal-900 border border-teal-300 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition hover:border-teal-500"
          >
            <Trees className="w-4 h-4 text-teal-600" />
            <span>{t.loadPlantationDemo}</span>
          </button>

          <button
            onClick={() => handleDemoClick("incomplete")}
            className="flex items-center gap-2 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{t.loadIncompleteDemo}</span>
          </button>
        </div>
      </section>

      {/* Three Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t.feat1Title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{t.feat1Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t.feat2Title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{t.feat2Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{t.feat3Title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{t.feat3Desc}</p>
        </div>
      </section>

      {/* Privacy Notice Card */}
      <section className="bg-slate-100 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 text-sm">Privacy & Screening Disclaimer</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{t.privacyNotice}</p>
        </div>
      </section>
    </div>
  );
}
