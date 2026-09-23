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
          ? "നമസ്കാരം! ഞാൻ സഹായ വെൽഫെയർ അസിസ്റ്റന്റാണ്. മത്സ്യത്തൊഴിലാളി, തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾക്കുള്ള പെൻഷനുകൾ, ചികിത്സാ ധനസഹായം, പഠന സഹായം, ഭവന സഹായം എന്നിവയെക്കുറിച്ച് ഏത് ചോദ്യവും ചോദിക്കാം."
          : "Namaskaram! I am your SAHAYA Welfare Entitlement Assistant. You can ask me any questions regarding pensions, health cover, education stipends, housing repair, or equipment subsidies for fishing and plantation families.",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  // Conversational response generator for ANY user question
  const generateAssistantReply = (text: string, updatedProfile: typeof profile): string => {
    const q = text.toLowerCase().trim();

    // 1. Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("നമസ്കാരം") || q.includes("ഹലോ")) {
      return language === "ml"
        ? "നമസ്കാരം! നിങ്ങളുടെ കുടുംബ തരം (മത്സ്യത്തൊഴിലാളി / തോട്ടം തൊഴിലാളി), മാസവരുമാനം, ജില്ല എന്നിവ പറയൂ. അനുയോജ്യമായ പദ്ധതികൾ ഞാൻ കണ്ടെത്തിത്തരാം."
        : "Namaskaram! Please tell me your family type (fishing/plantation), monthly income, and district so I can calculate eligible schemes for you.";
    }

    // 2. Fishing Schemes Questions
    if (q.includes("fish") || q.includes("മത്സ്യ") || q.includes("കടൽ") || q.includes("വല") || q.includes("ബോട്ട്")) {
      return language === "ml"
        ? "മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾക്ക് ക്ഷേമ പെൻഷൻ (₹20,000 ൽ താഴെ വരുമാനം), ബോട്ട്/വല സബ്‌സിഡി, മക്കൾക്കുള്ള ഉന്നത വിദ്യാഭ്യാസ ധനസഹായം, ഭവന പുനരുദ്ധാരണ സഹായം എന്നിവ ലഭ്യമാണ്. നിങ്ങളുടെ വരുമാനം അറിയാമോ?"
        : "For fishing families, schemes include Fisher Welfare Support (income under ₹20,000), Fishing Equipment Subsidies, Children's Education Grants, and Housing Repair Support. What is your monthly income?";
    }

    // 3. Plantation Schemes Questions
    if (q.includes("plant") || q.includes("തോട്ടം") || q.includes("എസ്റ്റേറ്റ്") || q.includes("റബ്ബർ") || q.includes("തേയില") || q.includes("ലയം")) {
      return language === "ml"
        ? "തോട്ടം/എസ്റ്റേറ്റ് തൊഴിലാളി കുടുംബങ്ങൾക്ക് ലേബർ ക്ഷേമ പെൻഷൻ (₹25,000 ൽ താഴെ വരുമാനം), വൊക്കേഷണൽ പഠന ഗ്രാന്റുകൾ, ലയം/ഭവന അറ്റകുറ്റപ്പണി സഹായം എന്നിവ ലഭിക്കും. നിങ്ങളുടെ വരുമാനം അല്ലെങ്കിൽ വിവരങ്ങൾ പറയൂ."
        : "For plantation & estate families, schemes cover Plantation Labour Pensions (income under ₹25,000), Student Education Grants, and Quarters/Housing Maintenance Support. What is your family income or district?";
    }

    // 4. Housing & Repair Questions
    if (q.includes("വീട്") || q.includes("house") || q.includes("housing") || q.includes("repair") || q.includes("അറ്റകുറ്റപ്പണി")) {
      return language === "ml"
        ? "മത്സ്യത്തൊഴിലാളികൾക്കും തോട്ടം തൊഴിലാളികൾക്കും വീട് അറ്റകുറ്റപ്പണിക്കായി സാമ്പത്തിക ധനസഹായം ലഭ്യമാണ്. അപേക്ഷിക്കാൻ റേഷൻ കാർഡ്, വീടിന്റെ നികുതി രസീത്/എസ്റ്റേറ്റ് സർട്ടിഫിക്കറ്റ് ആവശ്യമാണ്."
        : "Housing Repair assistance is available for coastal fishers and plantation quarter residents. Required documents include Ration Card, House Tax Receipt or Estate Manager Residence Proof.";
    }

    // 5. Health & Hospital Questions
    if (q.includes("ആരോഗ്യം") || q.includes("health") || q.includes("hospital") || q.includes("ചികിത്സ") || q.includes("മെഡിക്കൽ")) {
      return language === "ml"
        ? "കുറഞ്ഞ വരുമാനമുള്ള (₹20,000 ൽ താഴെ) കുടുംബങ്ങൾക്ക് സൗജന്യ ഇൻപേഷ്യന്റ് ചികിത്സയും ആരോഗ്യ സുരക്ഷാ ധനസഹായവും ലഭ്യമാണ്. താലൂക്ക് ആശുപത്രി കിയോസ്‌ക് വഴി അപേക്ഷിക്കാം."
        : "Low-income families (income under ₹20,000) qualify for Comprehensive Health Assistance. You can apply directly at Government Taluk Hospital kiosks.";
    }

    // 6. Documents Questions
    if (q.includes("രേഖ") || q.includes("doc") || q.includes("card") || q.includes("ആധാർ") || q.includes("പാസ്ബുക്ക്")) {
      return language === "ml"
        ? "പ്രധാനമായും ആവശ്യമായ രേഖകൾ: 1. ക്ഷേമനിധി ബോർഡ് പാസ്ബുക്ക് 2. ആധാർ കാർഡ് 3. റേഷൻ കാർഡ് (മുൻഗണനാ കാർഡ്) 4. ബാങ്ക് പാസ്ബുക്ക് 5. വില്ലേജ് വരുമാന സർട്ടിഫിക്കറ്റ്."
        : "Key required documents include: 1. Welfare Board Passbook 2. Aadhaar Card Copy 3. Priority Ration Card 4. Bank Passbook 5. Income Certificate from Village Officer.";
    }

    // 7. Where to apply / Centres Questions
    if (q.includes("എവിടെ") || q.includes("where") || q.includes("apply") || q.includes("സ്ഥലം") || q.includes("ഓഫീസ്") || q.includes("centre")) {
      return language === "ml"
        ? "എറണാകുളം ബോട്ട് ജെട്ടിക്ക് സമീപമുള്ള ഫിഷറീസ് ഓഫീസിലോ, കോട്ടയം ലേബർ കോംപ്ലക്സിലോ, ഇടുക്കി സിവിൽ സ്റ്റേഷൻ കൗണ്ടറിലോ, താലൂക്ക് ആശുപത്രി കിയോസ്കുകളിലോ അല്ലെങ്കിൽ അക്ഷയ കേന്ദ്രം വഴിയോ അപേക്ഷിക്കാം."
        : "You can apply at District Fisheries Offices (Marine Drive Ernakulam), Plantation Labour Inspectorates (Kottayam), Idukki Welfare Counter, or local Akshaya Kendras.";
    }

    // 8. Parameter follow-up guidance
    if (updatedProfile.monthlyIncome && updatedProfile.familyType) {
      return language === "ml"
        ? `നിങ്ങൾ നൽകിയ വിവരങ്ങൾ സ്വീകരിച്ചു (${updatedProfile.familyType === 'fishing' ? 'മത്സ്യത്തൊഴിലാളി' : 'തോട്ടം തൊഴിലാളി'}, വരുമാനം ₹${updatedProfile.monthlyIncome}). ഈ വിവരങ്ങൾ വെച്ച് സാധ്യതയുള്ള പദ്ധതികൾ കാണാൻ 'ഫലങ്ങൾ കാണുക' ക്ലിക്ക് ചെയ്യുക.`
        : `Got your profile details (${updatedProfile.familyType}, Income ₹${updatedProfile.monthlyIncome}). Click 'Show Results' to run the deterministic rules engine now.`;
    }

    return language === "ml"
      ? "നിങ്ങളുടെ ചോദ്യത്തിന് നന്ദി! കൂടുതൽ വിവരങ്ങൾ നൽകിയാൽ നിങ്ങളുടെ കുടുംബത്തിന് ലഭിക്കാനിടയുള്ള എല്ലാ പദ്ധതികളും കൃത്യമായി കണ്ടെത്തി തരാം."
      : "Thank you for asking! Please share your monthly income or sector details so I can match all eligible schemes for your household.";
  };

  const processUserInput = async (text: string) => {
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text }];
    setMessages(newMsgs);
    setInputText("");
    setLoading(true);

    try {
      const res = await extractVoiceProfile(text, profile);
      setProfile(res.updated_profile);

      const botReply = generateAssistantReply(text, res.updated_profile);

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
          {/* Quick Sample Questions Bar */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === "ml" ? "ചോദിക്കാവുന്ന ഉദാഹരണ ചോദ്യങ്ങൾ:" : "Example Questions to Ask:"}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "മത്സ്യത്തൊഴിലാളികൾക്ക് എന്തൊക്കെ പദ്ധതികളുണ്ട്?" : "What schemes are available for fishing families?")}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-xl transition"
              >
                🎣 {language === "ml" ? "മത്സ്യബന്ധന പദ്ധതികൾ?" : "Fishing Schemes?"}
              </button>

              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "തോട്ടം തൊഴിലാളികൾക്ക് എന്തൊക്കെ ധനസഹായമുണ്ട്?" : "What support is available for plantation workers?")}
                className="bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 px-3 py-1.5 rounded-xl transition"
              >
                🌿 {language === "ml" ? "തോട്ടം ആനുകൂല്യങ്ങൾ?" : "Plantation Benefits?"}
              </button>

              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "വീട് അറ്റകുറ്റപ്പണിക്ക് എങ്ങനെ അപേക്ഷിക്കാം?" : "How to apply for housing repair support?")}
                className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 px-3 py-1.5 rounded-xl transition"
              >
                🏠 {language === "ml" ? "ഭവന പുനരുദ്ധാരണം?" : "Housing Repair?"}
              </button>

              <button
                type="button"
                onClick={() => processUserInput(language === "ml" ? "അപേക്ഷിക്കേണ്ട സ്ഥലങ്ങളും ഓഫീസുകളും എവിടെയാണ്?" : "Where are the assistance offices located?")}
                className="bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 px-3 py-1.5 rounded-xl transition"
              >
                📍 {language === "ml" ? "അപേക്ഷാ ഓഫീസുകൾ?" : "Assistance Offices?"}
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1 font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === "ml" ? "പദ്ധതികൾ പരിശോധിക്കുക" : "Evaluate Schemes"}</span>
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
                  ? "ഇവിടെ ഏത് ചോദ്യവും ചോദിക്കുക (ഉദാഹരണത്തിന്: വീട് പുനരുദ്ധാരണ സഹായം എങ്ങനെ ലഭിക്കും)..."
                  : "Ask any question here (e.g. How to get housing repair assistance)..."
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
