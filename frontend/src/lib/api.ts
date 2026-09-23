import { HouseholdProfile, ScreeningResultOverview, Scheme, ApplicationCentre, TestProfileRunResult } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function checkEligibility(profile: HouseholdProfile): Promise<ScreeningResultOverview> {
  try {
    const res = await fetch(`${API_BASE}/eligibility/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error("API check failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using client-side fallback evaluation.");
    return fallbackEvaluate(profile);
  }
}

export async function fetchSchemes(targetGroup?: string): Promise<Scheme[]> {
  try {
    const url = targetGroup ? `${API_BASE}/schemes?target_group=${targetGroup}` : `${API_BASE}/schemes`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("API schemes failed");
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function fetchCentres(district?: string): Promise<ApplicationCentre[]> {
  try {
    const url = district ? `${API_BASE}/centres?district=${district}` : `${API_BASE}/centres`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("API centres failed");
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function extractVoiceProfile(user_input: string, current_profile: HouseholdProfile) {
  try {
    const res = await fetch(`${API_BASE}/ai/extract-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_input, current_profile }),
    });
    if (!res.ok) throw new Error("AI extract failed");
    return await res.json();
  } catch (err) {
    // Robust client-side Malayalam / English NLU parameter extraction fallback
    const lower = user_input.toLowerCase().trim();
    const updated = { ...current_profile };
    const extracted: Record<string, any> = {};

    // 1. Sector / Occupation
    if (lower.includes("fish") || lower.includes("മത്സ്യ") || lower.includes("കടൽ")) {
      updated.familyType = "fishing";
      updated.occupation = "fishing";
      extracted["familyType"] = "fishing";
    } else if (lower.includes("plant") || lower.includes("തോട്ടം") || lower.includes("എസ്റ്റേറ്റ്") || lower.includes("റബ്ബർ") || lower.includes("തേയില")) {
      updated.familyType = "plantation";
      updated.occupation = "plantation worker";
      extracted["familyType"] = "plantation";
    }

    // 2. Income parsing
    const numbers = lower.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      let num = parseInt(numbers[0]);
      if (num < 100) num = num * 1000;
      if (num >= 5000 && num <= 100000) {
        updated.monthlyIncome = num;
        extracted["monthlyIncome"] = num;
      }
    }

    if (lower.includes("10000") || lower.includes("പതിനായിരം")) {
      updated.monthlyIncome = 10000;
    } else if (lower.includes("18000") || lower.includes("പതിനെട്ടായിരം")) {
      updated.monthlyIncome = 18000;
    } else if (lower.includes("20000") || lower.includes("ഇരുപതായിരം")) {
      updated.monthlyIncome = 20000;
    } else if (lower.includes("25000") || lower.includes("ഇരുപത്തഞ്ചായിരം")) {
      updated.monthlyIncome = 25000;
    }

    // 3. District detection
    const districtsMap: Record<string, string> = {
      "ernakulam": "Ernakulam", "എറണാകുളം": "Ernakulam",
      "kottayam": "Kottayam", "കോട്ടയം": "Kottayam",
      "idukki": "Idukki", "ഇടുക്കി": "Idukki",
      "alappuzha": "Alappuzha", "ആലപ്പുഴ": "Alappuzha",
      "wayanad": "Wayanad", "വയനാട്": "Wayanad"
    };

    for (const [key, dist] of Object.entries(districtsMap)) {
      if (lower.includes(key)) {
        updated.district = dist;
        extracted["district"] = dist;
        break;
      }
    }

    return {
      extracted_fields: extracted,
      updated_profile: updated,
      confirmation_message_en: "Information processed.",
      confirmation_message_ml: "വിവരങ്ങൾ ശേഖരിച്ചു."
    };
  }
}

export async function runTestProfiles(): Promise<TestProfileRunResult[]> {
  try {
    const res = await fetch(`${API_BASE}/admin/test-profiles/run`, {
      method: "POST"
    });
    if (!res.ok) throw new Error("Test run failed");
    return await res.json();
  } catch (err) {
    return [];
  }
}

// Fallback client-side evaluator
function fallbackEvaluate(profile: HouseholdProfile): ScreeningResultOverview {
  const isFishing = profile.familyType === "fishing";
  const isPlantation = profile.familyType === "plantation";
  const income = profile.monthlyIncome ?? 999999;
  const reg = profile.welfareRegistration === true;

  return {
    sessionId: "demo-client-session",
    profile,
    totalSchemesScreened: 12,
    potentiallyEligibleCount: (isFishing && income <= 20000 && reg) || (isPlantation && income <= 25000 && reg) ? 5 : 2,
    moreInfoNeededCount: profile.welfareRegistration === null ? 3 : 1,
    notMatchedCount: 4,
    results: [
      {
        schemeId: "DEMO-FISH-001",
        name: "Demo Fisher Welfare Support",
        name_ml: "ഡെമോ മത്സ്യത്തൊഴിലാളി ക്ഷേമ പെൻഷൻ/സഹായം",
        description: "Financial welfare grant for registered fishing households with monthly income under ₹20,000.",
        description_ml: "മാസവരുമാനം ₹20,000 ൽ താഴെയുള്ള രജിസ്റ്റർ ചെയ്ത മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾക്കുള്ള സാമ്പത്തിക സഹായം.",
        targetGroup: "fishing",
        status: isFishing && income <= 20000 && reg ? "POTENTIALLY_ELIGIBLE" : (profile.welfareRegistration === null ? "MORE_INFORMATION_NEEDED" : "NOT_MATCHED"),
        matchedRules: ["Family type matches", "Income under ₹20,000", "Welfare registration active"],
        matchedRules_ml: ["കുടുംബ തരം പൊരുത്തപ്പെട്ടു", "വരുമാനം ₹20,000 ൽ താഴെ", "ക്ഷേമനിധി രജിസ്ട്രേഷൻ ഉണ്ട്"],
        missingFields: profile.welfareRegistration === null ? ["welfareRegistration"] : [],
        failedRules: [],
        requiredDocuments: ["Fishermen Welfare Board Passbook", "Aadhaar Card copy", "Bank Passbook"],
        requiredDocuments_ml: ["മത്സ്യത്തൊഴിലാളി ക്ഷേമനിധി ബോർഡ് പാസ്ബുക്ക്", "ആധാർ കാർഡ് പകർപ്പ്", "ബാങ്ക് പാസ്ബുക്ക്"],
        applicationMethod: "Offline at Fisheries Office or Akshaya Kendra.",
        applicationMethod_ml: "അടുത്തുള്ള ഫിഷറീസ് ഓഫീസിലോ അക്ഷയ കേന്ദ്രം വഴിയോ അപേക്ഷിക്കുക.",
        applicationLocation: "District Fisheries Office Ernakulam",
        applicationLocation_ml: "ജില്ലാ ഫിഷറീസ് ഓഫീസ് എറണാകുളം",
        whyExplanation_en: "Your profile matches all screening rules for this scheme.",
        whyExplanation_ml: "നിങ്ങൾ നൽകിയ വിവരങ്ങൾ ഈ പദ്ധതിയുടെ എല്ലാ യോഗ്യതാ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു.",
        isDemo: true
      },
      {
        schemeId: "DEMO-PLANT-001",
        name: "Demo Plantation Worker Welfare Pension",
        name_ml: "ഡെമോ തോട്ടം തൊഴിലാളി ക്ഷേമ പെൻഷൻ പദ്ധതി",
        description: "Welfare stipend for estate and plantation labor households with income under ₹25,000.",
        description_ml: "മാസവരുമാനം ₹25,000 ൽ താഴെയുള്ള എസ്റ്റേറ്റ്/തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾക്കുള്ള സാമ്പത്തിക ധനസഹായം.",
        targetGroup: "plantation",
        status: isPlantation && income <= 25000 && reg ? "POTENTIALLY_ELIGIBLE" : "NOT_MATCHED",
        matchedRules: ["Plantation family match"],
        matchedRules_ml: ["തോട്ടം തൊഴിലാളി കുടുംബ തരം പൊരുത്തപ്പെട്ടു"],
        missingFields: [],
        failedRules: [],
        requiredDocuments: ["Plantation Labour Welfare Fund Passbook", "Estate Manager Certificate"],
        requiredDocuments_ml: ["തോട്ടം തൊഴിലാളി ക്ഷേമനിധി പാസ്ബുക്ക്", "എസ്റ്റേറ്റ് മാനേജരുടെ സർട്ടിഫിക്കറ്റ്"],
        applicationMethod: "Submit form to Plantation Inspector.",
        applicationMethod_ml: "പ്ലാന്റേഷൻ ഇൻസ്പെക്ടർക്ക് അപേക്ഷ നൽകുക.",
        applicationLocation: "Inspectorate of Plantations Kottayam",
        applicationLocation_ml: "പ്ലാന്റേഷൻ ഇൻസ്പെക്ടറേറ്റ് കോട്ടയം",
        whyExplanation_en: "Your profile was evaluated against plantation scheme rules.",
        whyExplanation_ml: "തോട്ടം മേഖലയിലെ യോഗ്യതകൾ വിലയിരുത്തി.",
        isDemo: true
      }
    ],
    combinedDocuments: ["Fishermen Welfare Board Passbook", "Aadhaar Card copy", "Bank Passbook", "Plantation Passbook"],
    combinedDocuments_ml: ["മത്സ്യത്തൊഴിലാളി ക്ഷേമനിധി ബോർഡ് പാസ്ബുക്ക്", "ആധാർ കാർഡ് പകർപ്പ്", "ബാങ്ക് പാസ്ബുക്ക്", "തോട്ടം ക്ഷേമനിധി പാസ്ബുക്ക്"]
  };
}
