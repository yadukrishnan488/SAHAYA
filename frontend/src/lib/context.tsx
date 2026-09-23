"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HouseholdProfile, ScreeningResultOverview } from "./types";
import { Language, translations } from "./dictionary";
import { checkEligibility } from "./api";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  easyMode: boolean;
  setEasyMode: (val: boolean) => void;
  profile: HouseholdProfile;
  setProfile: React.Dispatch<React.SetStateAction<HouseholdProfile>>;
  results: ScreeningResultOverview | null;
  setResults: React.Dispatch<React.SetStateAction<ScreeningResultOverview | null>>;
  t: typeof translations.en;
  clearData: () => void;
  loadJudgeDemo: (type: "fishing" | "plantation" | "incomplete") => Promise<ScreeningResultOverview>;
}

const defaultProfile: HouseholdProfile = {
  familyType: "fishing",
  occupation: "fishing",
  monthlyIncome: 18000,
  familySize: 4,
  district: "Ernakulam",
  welfareRegistration: true,
  occupationDocument: true,
  language: "ml",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ml");
  const [easyMode, setEasyMode] = useState<boolean>(false);
  const [profile, setProfile] = useState<HouseholdProfile>(defaultProfile);
  const [results, setResults] = useState<ScreeningResultOverview | null>(null);

  const t = translations[language];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setProfile((prev) => ({ ...prev, language: lang }));
  };

  const clearData = () => {
    setProfile({
      familyType: undefined,
      occupation: undefined,
      monthlyIncome: undefined,
      familySize: undefined,
      district: undefined,
      welfareRegistration: undefined,
      occupationDocument: undefined,
      language,
    });
    setResults(null);
  };

  const loadJudgeDemo = async (type: "fishing" | "plantation" | "incomplete") => {
    let demoP: HouseholdProfile;
    if (type === "fishing") {
      demoP = {
        familyType: "fishing",
        occupation: "fishing",
        monthlyIncome: 18000,
        familySize: 4,
        district: "Ernakulam",
        welfareRegistration: true,
        occupationDocument: true,
        language,
      };
    } else if (type === "plantation") {
      demoP = {
        familyType: "plantation",
        occupation: "plantation worker",
        monthlyIncome: 15000,
        familySize: 5,
        district: "Kottayam",
        welfareRegistration: true,
        occupationDocument: true,
        language,
      };
    } else {
      demoP = {
        familyType: "fishing",
        occupation: "fishing",
        monthlyIncome: 18000,
        familySize: 4,
        district: "Ernakulam",
        welfareRegistration: null, // Incomplete missing registration
        occupationDocument: true,
        language,
      };
    }
    setProfile(demoP);
    const res = await checkEligibility(demoP);
    setResults(res);
    return res;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        easyMode,
        setEasyMode,
        profile,
        setProfile,
        results,
        setResults,
        t,
        clearData,
        loadJudgeDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
