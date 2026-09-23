"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import { VoiceMicButton } from "@/components/VoiceMicButton";
import { extractVoiceProfile, checkEligibility } from "@/lib/api";
import { speakText } from "@/lib/speech";
import { Bot, User, Send, ArrowRight, RefreshCw, Volume2, Sparkles, CheckCircle2 } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function AssistantPage() {
  const { profile, setProfile, setResults, language, t, easyMode } = useApp();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        language === "ml"
          ? "നമസ്കാരം! നിങ്ങളുടെ കുടുംബത്തിന് അനുയോജ്യമായ ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താൻ ഞാൻ സഹായിക്കാം. നിങ്ങളുടെ കുടുംബ തരം, തൊഴിൽ, അല്ലെങ്കിൽ മാസവരുമാനം പറയൂ."
          : "Namaskaram! I can help you discover welfare schemes your family may qualify for. What is your family type, occupation, or monthly income?",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const processUserInput = async (text: string) => {
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text }];
    setMessages(newMsgs);
    setInputText("");
    setLoading(true);

    try {
      const res = await extractVoiceProfile(text, profile);
      setProfile(res.updated_profile);

      let botReply = "";
      if (language === "ml") {
        if (!res.updated_profile.monthlyIncome) {
          botReply = "ശരി. നിങ്ങളുടെ കുടുംബത്തിന്റെ ഏകദേശ മാസവരുമാനം എത്രയാണ്?";
        } else if (!res.updated_profile.familySize) {
          botReply = "നിങ്ങളുടെ കുടുംബത്തിൽ എത്ര അംഗങ്ങളുണ്ട്?";
        } else if (!res.updated_profile.district) {
          botReply = "നിങ്ങളുടെ ജില്ല ഏതാണ്?";
        } else {
          botReply = "നൽകിയ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ അനുയോജ്യമായ പദ്ധതികൾ കണ്ടെത്താനായിട്ടുണ്ട്. ഫലങ്ങൾ കാണാൻ 'ഫലങ്ങൾ കാണുക' ക്ലിക്ക് ചെയ്യുക.";
        }
      } else {
        if (!res.updated_profile.monthlyIncome) {
          botReply = "Understood. What is your approximate monthly household income?";
        } else if (!res.updated_profile.familySize) {
          botReply = "How many members are in your household?";
        } else if (!res.updated_profile.district) {
          botReply = "Which district do you reside in?";
        } else {
          botReply = "Thank you. Based on the supplied details, potential scheme matches are ready.";
        }
      }

      setMessages([...newMsgs, { sender: "bot", text: botReply }]);
      speakText(botReply, language);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const res = await checkEligibility(profile);
      setResults(res);
      router.push("/results");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className={`font-extrabold text-slate-900 ${easyMode ? "text-2xl" : "text-xl"}`}>
              {t.assistantTitle}
            </h1>
            <p className="text-xs text-slate-500 font-medium">{t.assistantSub}</p>
          </div>
        </div>

        <button
          onClick={handleFinish}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition"
        >
          <span>{t.resultsTitle}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[420px] flex flex-col justify-between space-y-4">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                  m.sender === "user"
                    ? "bg-slate-900 text-white"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-md text-sm leading-relaxed shadow-sm ${
                  m.sender === "user"
                    ? "bg-emerald-600 text-white font-medium rounded-tr-none"
                    : "bg-slate-100 text-slate-900 font-medium rounded-tl-none border border-slate-200"
                }`}
              >
                <p>{m.text}</p>
                {m.sender === "bot" && (
                  <button
                    onClick={() => speakText(m.text, language)}
                    className="mt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1 hover:underline"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{language === "ml" ? "ശബ്ദം കേൾക്കുക" : "Listen"}</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold italic">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Processing input...</span>
            </div>
          )}
        </div>

        {/* Voice & Quick Question Sample Bar */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          {/* Quick Voice / Text Prompts */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === "ml" ? "ഉദാഹരണ ചോദ്യങ്ങൾ (ക്ലിക്ക് ചെയ്യുക):" : "Sample Ask Options (Click to ask):"}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "ഞാൻ ഒരു മത്സ്യത്തൊഴിലാളിയാണ്" : "I am a fisherman")}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-xl transition"
              >
                🎣 {language === "ml" ? "മത്സ്യത്തൊഴിലാളി" : "Fisherman"}
              </button>

              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "മാസവരുമാനം 18000 രൂപ" : "Monthly income 18000 rupees")}
                className="bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 px-3 py-1.5 rounded-xl transition"
              >
                💰 {language === "ml" ? "വരുമാനം ₹18,000" : "Income ₹18,000"}
              </button>

              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "തോട്ടം തൊഴിലാളി കുടുംബം" : "Plantation worker family")}
                className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 px-3 py-1.5 rounded-xl transition"
              >
                🌿 {language === "ml" ? "തോട്ടം തൊഴിലാളി" : "Plantation Worker"}
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1 font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === "ml" ? "പദ്ധതികൾ കാണുക" : "Show Results"}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <VoiceMicButton onTranscript={(txt) => processUserInput(txt)} />
          </div>

          {/* Form Text Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processUserInput(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === "ml"
                  ? "ഇവിടെ ചോദ്യങ്ങൾ അല്ലെങ്കിൽ വിവരങ്ങൾ ടൈപ്പ് ചെയ്യുക..."
                  : "Type your question or household info here..."
              }
              className="flex-1 p-3.5 rounded-2xl border border-slate-300 focus:border-emerald-600 outline-none text-sm font-medium bg-slate-50"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition disabled:opacity-50 shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
