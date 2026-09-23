"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { VoiceMicButton } from "@/components/VoiceMicButton";
import { checkEligibility, extractVoiceProfile } from "@/lib/api";
import { speakText } from "@/lib/speech";
import { ArrowLeft, ArrowRight, Volume2, CheckCircle2 } from "lucide-react";

const KERALA_DISTRICTS = [
  "Ernakulam",
  "Kottayam",
  "Idukki",
  "Alappuzha",
  "Wayanad",
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Kannur",
  "Kasaragod",
];

export default function QuestionsPage() {
  const { profile, setProfile, setResults, language, t, easyMode } = useApp();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [loading, setLoading] = useState(false);

  // Read question text aloud using Web Speech API TTS
  const handleSpeakQuestion = (text: string) => {
    speakText(text, language);
  };

  // Handle voice transcript NLU extraction
  const handleVoiceInput = async (transcript: string) => {
    const extracted = await extractVoiceProfile(transcript, profile);
    setProfile(extracted.updated_profile);
  };

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final step -> Run Eligibility Engine
      setLoading(true);
      try {
        const res = await checkEligibility(profile);
        setResults(res);
        router.push("/results");
      } catch (e) {
        console.error("Screening error", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push("/start");
    }
  };

  // Render specific question contents based on current step
  const renderQuestionContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q1Title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setProfile((p) => ({ ...p, familyType: "fishing", occupation: "fishing" }))}
                className={`p-5 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition ${
                  profile.familyType === "fishing"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                    : "border-slate-200 bg-white hover:border-emerald-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎣</span>
                  <span>{t.q1OptFishing}</span>
                </div>
                {profile.familyType === "fishing" && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              </button>

              <button
                onClick={() => setProfile((p) => ({ ...p, familyType: "plantation", occupation: "plantation worker" }))}
                className={`p-5 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition ${
                  profile.familyType === "plantation"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                    : "border-slate-200 bg-white hover:border-emerald-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌿</span>
                  <span>{t.q1OptPlantation}</span>
                </div>
                {profile.familyType === "plantation" && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q2Title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: "fishing", label: t.q2OptFish, icon: "🎣" },
                { key: "plantation worker", label: t.q2OptPlant, icon: "🌿" },
                { key: "other", label: t.q2OptOther, icon: "🛠️" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setProfile((p) => ({ ...p, occupation: opt.key }))}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition flex flex-col gap-2 ${
                    profile.occupation === opt.key
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                      : "border-slate-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q3Title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { val: 8000, label: t.q3Opt10k },
                { val: 18000, label: t.q3Opt20k },
                { val: 25000, label: t.q3Opt30k },
                { val: 35000, label: t.q3OptAbove },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setProfile((p) => ({ ...p, monthlyIncome: opt.val }))}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition flex items-center justify-between ${
                    profile.monthlyIncome === opt.val
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                      : "border-slate-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-emerald-700">💰</span>
                    <span>{opt.label}</span>
                  </div>
                  {profile.monthlyIncome === opt.val && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q4Title}
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                max={20}
                value={profile.familySize || 4}
                onChange={(e) => setProfile((p) => ({ ...p, familySize: parseInt(e.target.value) || 1 }))}
                className="w-32 p-4 text-2xl font-bold rounded-2xl border-2 border-emerald-300 focus:border-emerald-600 outline-none text-center bg-white"
              />
              <span className="text-base text-slate-600 font-semibold">
                {language === "ml" ? "അംഗങ്ങൾ" : "Members"}
              </span>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q5Title}
            </h3>
            <select
              value={profile.district || "Ernakulam"}
              onChange={(e) => setProfile((p) => ({ ...p, district: e.target.value }))}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-600 font-bold text-lg bg-white outline-none"
            >
              {KERALA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q6Title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { val: true, label: t.q6OptYes, icon: "✅" },
                { val: false, label: t.q6OptNo, icon: "❌" },
                { val: null, label: t.q6OptDontKnow, icon: "❓" },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setProfile((p) => ({ ...p, welfareRegistration: opt.val }))}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition flex items-center justify-between ${
                    profile.welfareRegistration === opt.val
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                      : "border-slate-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                  {profile.welfareRegistration === opt.val && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className={`font-bold text-slate-900 ${easyMode ? "text-2xl" : "text-lg"}`}>
              {t.q7Title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { val: true, label: t.q7OptYes, icon: "🪪" },
                { val: false, label: t.q7OptNo, icon: "🚫" },
                { val: null, label: t.q7OptDontKnow, icon: "❓" },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setProfile((p) => ({ ...p, occupationDocument: opt.val }))}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition flex items-center justify-between ${
                    profile.occupationDocument === opt.val
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md"
                      : "border-slate-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                  {profile.occupationDocument === opt.val && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* Progress Header */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-sm font-bold text-slate-700">
          <span>
            {t.questionProgress} {currentStep} {t.of} {totalSteps}
          </span>
          <span className="text-emerald-700 font-extrabold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 relative">
        {/* Speak Question Aloud & Mic Button */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => handleSpeakQuestion(t[`q${currentStep}Title` as keyof typeof t] as string)}
            className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>{language === "ml" ? "ചോദ്യം കേൾക്കുക" : "Listen to question"}</span>
          </button>

          <VoiceMicButton onTranscript={handleVoiceInput} />
        </div>

        {/* Dynamic Question Render */}
        {renderQuestionContent()}

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleNext}
            className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg transition"
          >
            <span>{loading ? "Processing..." : currentStep === totalSteps ? t.resultsTitle : t.next}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
