"use client";

import React, { useState } from "react";
import { Mic, MicOff, AlertCircle, Sparkles } from "lucide-react";
import { startSpeechRecognition } from "@/lib/speech";
import { useApp } from "@/lib/context";

interface VoiceMicButtonProps {
  onTranscript: (transcript: string) => void;
  label?: string;
}

export function VoiceMicButton({ onTranscript, label }: VoiceMicButtonProps) {
  const { language, t } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [recognizer, setRecognizer] = useState<{ stop: () => void } | null>(null);

  const handleStart = async () => {
    setErrorMsg("");
    setTranscript("");

    const rec = await startSpeechRecognition(language, {
      onResult: (text) => {
        setTranscript(text);
        onTranscript(text);
      },
      onError: (err) => {
        setErrorMsg(err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    if (rec) {
      setRecognizer(rec);
      setIsListening(true);
    }
  };

  const handleStop = () => {
    if (recognizer) {
      recognizer.stop();
    }
    setIsListening(false);
  };

  // Preset fallback sample speech inputs for testing if microphone is muted
  const handlePresetSpeech = (sampleText: string) => {
    setTranscript(sampleText);
    onTranscript(sampleText);
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={isListening ? handleStop : handleStart}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
          isListening
            ? "bg-rose-600 text-white animate-pulse hover:bg-rose-700 ring-4 ring-rose-200"
            : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg"
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5 animate-spin" />
            <span>{t.speakListening}</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>{label || (language === "ml" ? "🎤 സംസാരിക്കുക" : "🎤 Speak")}</span>
          </>
        )}
      </button>

      {errorMsg && (
        <div className="flex flex-col items-center gap-2 w-full max-w-md">
          <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl w-full text-center">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>

          {/* Quick sample voice prompt simulation buttons */}
          <div className="flex flex-wrap justify-center gap-1.5 text-[11px]">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Or click sample voice input:</span>
            </span>
            <button
              type="button"
              onClick={() =>
                handlePresetSpeech(
                  language === "ml" ? "ഞാൻ ഒരു മത്സ്യത്തൊഴിലാളിയാണ്" : "I am a fisherman"
                )
              }
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg font-bold"
            >
              {language === "ml" ? "മത്സ്യത്തൊഴിലാളി" : "Fisherman"}
            </button>
            <button
              type="button"
              onClick={() =>
                handlePresetSpeech(
                  language === "ml"
                    ? "തോട്ടം തൊഴിലാളിയാണ് മാസവരുമാനം 15000 രൂപ"
                    : "Plantation worker with monthly income 15000"
                )
              }
              className="bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 px-2.5 py-1 rounded-lg font-bold"
            >
              {language === "ml" ? "തോട്ടം തൊഴിലാളി (₹15,000)" : "Plantation Worker (₹15,000)"}
            </button>
          </div>
        </div>
      )}

      {transcript && (
        <div className="w-full bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-950 mt-2 text-center">
          <p className="font-semibold text-emerald-800 mb-1">{t.youSaid}</p>
          <p className="text-sm font-bold italic text-emerald-900">“{transcript}”</p>
        </div>
      )}
    </div>
  );
}
