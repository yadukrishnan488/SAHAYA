"use client";

import React, { useState } from "react";
import { Mic, MicOff, AlertCircle, Edit3, Check } from "lucide-react";
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

  const handleStart = () => {
    setErrorMsg("");
    setTranscript("");

    const rec = startSpeechRecognition(language, {
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

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={isListening ? handleStop : handleStart}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
          isListening
            ? "bg-rose-600 text-white animate-pulse hover:bg-rose-700"
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
        <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {transcript && (
        <div className="w-full bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-950 mt-2">
          <p className="font-semibold text-emerald-800 mb-1">{t.youSaid}</p>
          <p className="text-sm font-medium italic mb-2">“{transcript}”</p>
        </div>
      )}
    </div>
  );
}
