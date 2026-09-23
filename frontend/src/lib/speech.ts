// Web Speech API wrapper for Speech Recognition & Speech Synthesis

export interface SpeechRecognitionResultHandler {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

export function startSpeechRecognition(
  language: "ml" | "en",
  handlers: SpeechRecognitionResultHandler
): { stop: () => void } | null {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    handlers.onError("Speech recognition is not supported in this browser. Please type your response.");
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "ml" ? "ml-IN" : "en-IN";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handlers.onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      handlers.onError(event.error || "Speech recognition error");
    };

    recognition.onend = () => {
      handlers.onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  } catch (err: any) {
    handlers.onError(err.message || "Failed to initialize speech recognition");
    return null;
  }
}

export function speakText(text: string, language: "ml" | "en" = "ml") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ml" ? "ml-IN" : "en-IN";
    utterance.rate = 0.9; // Slightly slower for clear government guidance

    // Try finding a Malayalam voice if available
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.includes(language === "ml" ? "ml" : "en"));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error("Speech synthesis error:", e);
  }
}
