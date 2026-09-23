export type Language = "ml" | "en";

export const translations = {
  en: {
    appName: "SAHAYA",
    appSubName: "Welfare Entitlement Assistant",
    navHome: "Home",
    navStart: "Start Screening",
    navSchemes: "Schemes",
    navCentres: "Help Centres",
    navDocs: "Document Checklist",
    navAssistant: "Voice Assistant",
    navAdmin: "Admin Dashboard",
    demoBadge: "DEMO MODE",
    demoDisclaimer: "Demo scheme information is used for this hackathon prototype. Replace with organizer-provided verified scheme rules before deployment.",
    clearData: "Clear My Data",
    easyMode: "Easy Mode",
    easyModeActive: "Easy Mode Active",
    heroTitle: "Find welfare schemes your family may be eligible for.",
    heroTitleMl: "നിങ്ങളുടെ കുടുംബത്തിന് ലഭിക്കാനിടയുള്ള ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താം",
    heroDescription: "Answer a few simple questions and discover potentially eligible welfare schemes, required documents and where to apply.",
    startScreening: "Start Screening",
    askByVoice: "Ask by Voice",
    privacyNotice: "We collect only the information needed for screening. This demo does not guarantee benefit approval.",
    judgeFastLoad: "Hackathon Judge Demo Shortcuts:",
    loadFishingDemo: "Load Demo Fishing Family",
    loadPlantationDemo: "Load Demo Plantation Family",
    loadIncompleteDemo: "Load Incomplete Profile",
    
    // Feature Cards
    feat1Title: "1. Find Schemes",
    feat1Desc: "Discover schemes based on your household information.",
    feat2Title: "2. Understand Why",
    feat2Desc: "See which conditions matched your information.",
    feat3Title: "3. Know What To Do",
    feat3Desc: "Get documents and application guidance.",

    // Start Page
    chooseLang: "Choose your language",
    familyTypeQuestion: "Which best describes your household?",
    fishingFamilyTitle: "Fishing Family 🎣",
    fishingFamilyDesc: "Families involved in fishing activities and marine labor.",
    plantationFamilyTitle: "Plantation Family 🌿",
    plantationFamilyDesc: "Families involved in tea, rubber, or estate plantation work.",

    // Questions Wizard
    questionProgress: "Question",
    of: "of",
    back: "Back",
    next: "Next",
    speakBtn: "Speak",
    speakListening: "Listening...",
    typeInstead: "Type instead",
    youSaid: "You said:",
    editExtracted: "Confirm/Edit extracted details:",

    // Question Texts & Options
    q1Title: "What is your family type?",
    q2Title: "What is your main occupation?",
    q3Title: "What is your approximate monthly household income?",
    q4Title: "How many people are in your household?",
    q5Title: "What is your district?",
    q6Title: "Do you have the relevant welfare registration?",
    q7Title: "Do you have the required worker documentation?",

    q1OptFishing: "Fishing Family",
    q1OptPlantation: "Plantation Family",

    q2OptFish: "Fishing",
    q2OptPlant: "Plantation Worker",
    q2OptOther: "Other / Daily Wage",

    q3Opt10k: "Below ₹10,000",
    q3Opt20k: "₹10,000 – ₹20,000",
    q3Opt30k: "₹20,000 – ₹30,000",
    q3OptAbove: "Above ₹30,000",

    q6OptYes: "Yes, active registration",
    q6OptNo: "No registration",
    q6OptDontKnow: "Don't know",

    q7OptYes: "Yes, valid cards/documents",
    q7OptNo: "No documents",
    q7OptDontKnow: "Don't know",

    // Results Page
    resultsTitle: "Your Screening Results",
    resultsSubtitle: "You may potentially qualify based on the information provided.",
    eligibleCountLabel: "Potentially Eligible",
    moreInfoCountLabel: "Need More Information",
    notMatchedCountLabel: "Conditions Not Matched",
    whyThisResult: "Why am I seeing this?",
    whyMatchedConditions: "Matched Conditions:",
    whyMissingInfo: "Information Still Required:",
    whyNotMatched: "Not matched based on supplied information",
    viewDetails: "View Details",
    provideInfo: "Provide Information",
    viewDocuments: "View Document Checklist",
    viewCentres: "Find Application Centres",
    noMatchesFound: "No potential matches were found from the information provided.",
    reviewInformation: "Review Information",

    // Scheme Detail
    schemeDetailTitle: "Scheme Details",
    aboutScheme: "About this Scheme",
    eligibilityConditions: "Eligibility Conditions & Rule Checks",
    requiredDocs: "Required Documents",
    appMethod: "Application Method",
    whereToApply: "Where to Apply",
    officialDisclaimer: "Disclaimer: Potential eligibility is based only on the information provided. Final approval is determined by the responsible government authority.",

    // Documents Page
    docsTitle: "Your Combined Document Checklist",
    docsSub: "Collect these documents before visiting the application assistance centre.",
    downloadChecklist: "Download / Print Checklist",
    docDisclaimer: "Documents may vary by scheme. Check the official requirements before applying.",

    // Centres Page
    centresTitle: "Where can I apply?",
    centresSub: "Find official assistance centres and fisheries/plantation welfare offices near you.",
    filterDistrict: "Filter by District:",
    allDistricts: "All Districts",
    viewMap: "View Map",
    getDirections: "Get Directions",

    // Assistant Page
    assistantTitle: "SAHAYA Voice & Text Assistant",
    assistantSub: "Speak or type your household details to get automated screening guidance.",
    assistantGreeting: "Namaskaram! I can help you discover government welfare schemes your family may qualify for.",

    // Admin Dashboard
    adminTitle: "Demo Administrator Dashboard",
    totalSchemes: "Total Demo Schemes",
    activeSchemes: "Active Schemes",
    screeningsRun: "Households Screened",
    potentialMatches: "Potential Matches",
    runTestProfiles: "Run Automated Test Profiles",
    importPack: "Import Organizer Resource Pack",
    importBtn: "Import JSON Pack",
    testProfilesTitle: "System Test Profiles",
  },
  ml: {
    appName: "സഹായ",
    appSubName: "ക്ഷേമ പദ്ധതി സഹായ കേന്ദ്രം",
    navHome: "ഹോം",
    navStart: "പരിശോധന തുടങ്ങാം",
    navSchemes: "പദ്ധതികൾ",
    navCentres: "സഹായ കേന്ദ്രങ്ങൾ",
    navDocs: "രേഖകളുടെ ചെക്ക്‌ലിസ്റ്റ്",
    navAssistant: "വോയ്സ് അസിസ്റ്റന്റ്",
    navAdmin: "അഡ്മിൻ ഡാഷ്‌ബോർഡ്",
    demoBadge: "ഡെമോ മോഡ്",
    demoDisclaimer: "ഈ ഹാക്കത്തൺ ഡെമോയ്ക്കായി സാമ്പിൾ പദ്ധതി വിവരങ്ങളാണ് ഉപയോഗിച്ചിരിക്കുന്നത്.",
    clearData: "വിവരങ്ങൾ മായ്ക്കുക",
    easyMode: "ലളിത മോഡ്",
    easyModeActive: "ലളിത മോഡ് സജീവം",
    heroTitle: "നിങ്ങളുടെ കുടുംബത്തിന് ലഭിക്കാനിടയുള്ള ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താം",
    heroTitleMl: "നിങ്ങളുടെ കുടുംബത്തിന് ലഭിക്കാനിടയുള്ള ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താം",
    heroDescription: "ചില ലളിതമായ ചോദ്യങ്ങൾക്ക് മറുപടി നൽകി നിങ്ങള്‍ക്ക് അർഹതയുണ്ടാകാൻ സാധ്യതയുള്ള പദ്ധതികളും ആവശ്യമായ രേഖകളും അപേക്ഷിക്കേണ്ട സ്ഥലവും കണ്ടെത്തൂ.",
    startScreening: "പരിശോധന തുടങ്ങാം",
    askByVoice: "🎤 ശബ്ദത്തിലൂടെ ചോദിക്കാം",
    privacyNotice: "സ്ക്രീനിംഗിന് ആവശ്യമായ വിവരങ്ങൾ മാത്രമേ ഞങ്ങൾ ശേഖരിക്കുന്നുള്ളൂ. ഈ ഡെമോ ആനുകൂല്യങ്ങൾ ഉറപ്പുനൽകുന്നില്ല.",
    judgeFastLoad: "ഹാക്കത്തൺ ജഡ്ജ് ഡെമോ ഷോർട്ട്കട്ടുകൾ:",
    loadFishingDemo: "മത്സ്യത്തൊഴിലാളി കുടുംബ ഡെമോ",
    loadPlantationDemo: "തോട്ടം തൊഴിലാളി കുടുംബ ഡെമോ",
    loadIncompleteDemo: "അപൂർണ്ണ വിവര ഡെമോ",

    // Feature Cards
    feat1Title: "1. പദ്ധതികൾ കണ്ടെത്താം",
    feat1Desc: "നിങ്ങളുടെ കുടുംബ വിവരങ്ങൾ നൽകി അനുയോജ്യമായ പദ്ധതികൾ കണ്ടെത്തുക.",
    feat2Title: "2. എന്തുകൊണ്ട് എന്ന് മനസിലാക്കാം",
    feat2Desc: "നിങ്ങളുടെ വിവരങ്ങളുമായി ഏതെല്ലാം നിബന്ധനകൾ പൊരുത്തപ്പെട്ടുവെന്ന് കാണുക.",
    feat3Title: "3. ചെയ്യേണ്ടവ അറിയാം",
    feat3Desc: "ആവശ്യമായ രേഖകളും അപേക്ഷിക്കേണ്ട മാർഗ്ഗനിർദ്ദേശങ്ങളും നേടുക.",

    // Start Page
    chooseLang: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    familyTypeQuestion: "നിങ്ങളുടെ കുടുംബം ഏത് വിഭാഗത്തിൽപ്പെടുന്നു?",
    fishingFamilyTitle: "മത്സ്യത്തൊഴിലാളി കുടുംബം 🎣",
    fishingFamilyDesc: "മത്സ്യബന്ധനവുമായി ബന്ധപ്പെട്ട് ഉപജീവനം നടത്തുന്ന കുടുംബങ്ങൾ.",
    plantationFamilyTitle: "തോട്ടം തൊഴിലാളി കുടുംബം 🌿",
    plantationFamilyDesc: "തേയില, റബ്ബർ, തോട്ടം ജോലി ചെയ്യുന്ന കുടുംബങ്ങൾ.",

    // Questions Wizard
    questionProgress: "ചോദ്യം",
    of: "ൽ",
    back: "പുറകോട്ട്",
    next: "അടുത്തത്",
    speakBtn: "സംസാരിക്കുക",
    speakListening: "ശ്രദ്ധിക്കുന്നു...",
    typeInstead: "ടൈപ്പ് ചെയ്യുക",
    youSaid: "നിങ്ങൾ പറഞ്ഞത്:",
    editExtracted: "ലഭിച്ച വിവരങ്ങൾ പരിശോധിക്കുക:",

    // Question Texts & Options
    q1Title: "നിങ്ങളുടെ കുടുംബ തരം ഏതാണ്?",
    q2Title: "പ്രധാന തൊഴിൽ ഏതാണ്?",
    q3Title: "കുടുംബത്തിന്റെ ഏകദേശ മാസവരുമാനം എത്രയാണ്?",
    q4Title: "കുടുംബത്തിൽ എത്ര അംഗങ്ങളുണ്ട്?",
    q5Title: "നിങ്ങളുടെ ജില്ല ഏതാണ്?",
    q6Title: "ക്ഷേമനിധി ബോർഡ് രജിസ്ട്രേഷൻ ഉണ്ടോ?",
    q7Title: "തൊഴിലാളി തിരിച്ചറിയൽ കാർഡ്/രേഖകൾ ഉണ്ടോ?",

    q1OptFishing: "മത്സ്യത്തൊഴിലാളി കുടുംബം",
    q1OptPlantation: "തോട്ടം തൊഴിലാളി കുടുംബം",

    q2OptFish: "മത്സ്യബന്ധനം",
    q2OptPlant: "തോട്ടം തൊഴിലാളി",
    q2OptOther: "മറ്റുള്ളവ / ദിവസക്കൂലി",

    q3Opt10k: "₹10,000 ൽ താഴെ",
    q3Opt20k: "₹10,000 – ₹20,000",
    q3Opt30k: "₹20,000 – ₹30,000",
    q3OptAbove: "₹30,000 ൽ മുകളിൽ",

    q6OptYes: "ഉണ്ട് (സജീവ രജിസ്ട്രേഷൻ)",
    q6OptNo: "ഇല്ല",
    q6OptDontKnow: "അറിയില്ല",

    q7OptYes: "ഉണ്ട് (രേഖകൾ കൈവശമുണ്ട്)",
    q7OptNo: "ഇല്ല",
    q7OptDontKnow: "അറിയില്ല",

    // Results Page
    resultsTitle: "നിങ്ങളുടെ പരിശോധനാ ഫലങ്ങൾ",
    resultsSubtitle: "നൽകിയ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ താഴെ പറയുന്ന പദ്ധതികൾക്ക് സാധ്യതയുണ്ട്.",
    eligibleCountLabel: "സാധ്യതയുള്ളവ",
    moreInfoCountLabel: "കൂടുതൽ വിവരങ്ങൾ വേണം",
    notMatchedCountLabel: "പൊരുത്തപ്പെടാത്തവ",
    whyThisResult: "എന്തുകൊണ്ട് ഈ ഫലം?",
    whyMatchedConditions: "പൊരുത്തപ്പെട്ട യോഗ്യതകൾ:",
    whyMissingInfo: "ആവശ്യമുള്ള കൂടുതൽ വിവരങ്ങൾ:",
    whyNotMatched: "നൽകിയ വിവരങ്ങൾ പൊരുത്തപ്പെടുന്നില്ല",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    provideInfo: "വിവരങ്ങൾ നൽകുക",
    viewDocuments: "രേഖകളുടെ പട്ടിക കാണുക",
    viewCentres: "അപേക്ഷാ കേന്ദ്രങ്ങൾ കാണുക",
    noMatchesFound: "നൽകിയ വിവരങ്ങൾ അനുസരിച്ച് പദ്ധതികളൊന്നും കണ്ടെത്താനായില്ല.",
    reviewInformation: "വിവരങ്ങൾ പരിശോധിക്കുക",

    // Scheme Detail
    schemeDetailTitle: "പദ്ധതി വിവരങ്ങൾ",
    aboutScheme: "ഈ പദ്ധതിയെക്കുറിച്ച്",
    eligibilityConditions: "യോഗ്യതാ മാനദണ്ഡങ്ങളും പരിശോധനകളും",
    requiredDocs: "ആവശ്യമായ രേഖകൾ",
    appMethod: "അപേക്ഷിക്കേണ്ട രീതി",
    whereToApply: "അപേക്ഷിക്കേണ്ട സ്ഥലം",
    officialDisclaimer: "ശ്രദ്ധിക്കുക: സാധ്യതയുള്ള അർഹത നൽകിയ വിവരങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ളതാണ്. അന്തിമ അനുമതി ബന്ധപ്പെട്ട സർക്കാർ ഉദ്യോഗസ്ഥർ നിർണ്ണയിക്കും.",

    // Documents Page
    docsTitle: "ആവശ്യമായ രേഖകളുടെ പട്ടിക",
    docsSub: "അപേക്ഷാ സഹായ കേന്ദ്രം സന്ദർശിക്കുന്നതിന് മുൻപ് ഈ രേഖകൾ കരുതിവെയ്ക്കുക.",
    downloadChecklist: "പട്ടിക പ്രിന്റ് ചെയ്യുക / ഡൗൺലോഡ് ചെയ്യുക",
    docDisclaimer: "പദ്ധതികൾക്ക് അനുസരിച്ച് രേഖകളിൽ വ്യത്യാസം വരാം.",

    // Centres Page
    centresTitle: "എവിടെ അപേക്ഷിക്കാം?",
    centresSub: "നിങ്ങൾക്ക് സമീപമുള്ള ഔദ്യോഗിക സഹായ കേന്ദ്രങ്ങളും ഫിഷറീസ്/തോട്ടം ക്ഷേമ ഓഫീസുകളും കണ്ടെത്തുക.",
    filterDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക:",
    allDistricts: "എല്ലാ ജില്ലകളും",
    viewMap: "മാപ്പ് കാണുക",
    getDirections: "വഴി കണ്ടെത്തുക",

    // Assistant Page
    assistantTitle: "സഹായ വോയ്സ് അസിസ്റ്റന്റ്",
    assistantSub: "സംസാരിച്ചോ ടൈപ്പ് ചെയ്തോ നിങ്ങളുടെ കുടുംബത്തിന് അനുയോജ്യമായ പദ്ധതികൾ കണ്ടെത്താം.",
    assistantGreeting: "നമസ്കാരം! നിങ്ങളുടെ കുടുംബത്തിന് അനുയോജ്യമായ ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താൻ ഞാൻ സഹായിക്കാം.",

    // Admin Dashboard
    adminTitle: "അഡ്മിനിസ്ട്രേറ്റർ ഡാഷ്‌ബോർഡ്",
    totalSchemes: "ആകെ പദ്ധതികൾ",
    activeSchemes: "സജീവ പദ്ധതികൾ",
    screeningsRun: "നടത്തിയ പരിശോധനകൾ",
    potentialMatches: "സാധ്യത കണ്ടെത്തിയവ",
    runTestProfiles: "ഓട്ടോമേറ്റഡ് ടെസ്റ്റ് നടത്തുക",
    importPack: "റിസോഴ്സ് പാക്ക് ഇമ്പോർട്ട് ചെയ്യുക",
    importBtn: "JSON ഇമ്പോർട്ട് ചെയ്യുക",
    testProfilesTitle: "സിസ്റ്റം ടെസ്റ്റ് പ്രൊഫൈലുകൾ",
  }
};
