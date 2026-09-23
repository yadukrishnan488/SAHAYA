// Web Speech API wrapper for Speech Recognition & Speech Synthesis

export interface SpeechRecognitionResultHandler {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

export async function startSpeechRecognition(
  language: "ml" | "en",
  handlers: SpeechRecognitionResultHandler
): Promise<{ stop: () => void } | null> {
  if (typeof window === "undefined") return null;

  // 1. Request microphone permission explicitly via getUserMedia first
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately after permission is granted
      stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      handlers.onError(
        "Microphone access blocked. Please click the microphone lock icon in your browser URL bar to allow microphone permission."
      );
      handlers.onEnd();
      return null;
    }
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    handlers.onError("Speech recognition is not supported in this browser. Please type your response.");
    handlers.onEnd();
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
      let friendlyError = event.error || "Speech recognition error";
      if (event.error === "not-allowed") {
        friendlyError = "Microphone permission denied. Please allow microphone access in your browser settings.";
      } else if (event.error === "no-speech") {
        friendlyError = "No speech detected. Please speak clearly into your microphone.";
      } else if (event.error === "audio-capture") {
        friendlyError = "No microphone found. Please check your audio hardware.";
      }
      handlers.onError(friendlyError);
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
      },
    };
  } catch (err: any) {
    handlers.onError(err.message || "Failed to initialize speech recognition.");
    handlers.onEnd();
    return null;
  }
}

export function speakText(text: string, language: "ml" | "en" = "ml") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ml" ? "ml-IN" : "en-IN";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find((v) => v.lang.includes(language === "ml" ? "ml" : "en"));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error("Speech synthesis error:", e);
  }
}
