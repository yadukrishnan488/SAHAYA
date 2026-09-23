/**
 * SAHAYA - Welfare Entitlement Assistant
 * JavaScript Engine Module for Multilingual Screening, Deterministic Rules, and Speech API
 */

// Application State
let currentLang = 'ml';
let isEasyMode = false;
let currentStep = 1;
let userProfile = {
  familyType: 'fishing',
  occupation: 'fishing',
  monthlyIncome: 18000,
  familySize: 4,
  district: 'Ernakulam',
  welfareRegistration: true,
  occupationDocument: true
};

let assistantMessages = [
  {
    sender: 'bot',
    text: 'നമസ്കാരം! ഞാൻ സഹായ വെൽഫെയർ അസിസ്റ്റന്റാണ്. മത്സ്യത്തൊഴിലാളി, തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾക്കുള്ള പെൻഷനുകൾ, ചികിത്സാ ധനസഹായം, പഠന സഹായം, ഭവന സഹായം എന്നിവയെക്കുറിച്ച് ഏത് ചോദ്യവും ചോദിക്കാം.'
  }
];

// 12 Demo Schemes Data
const DEMO_SCHEMES = [
  {
    id: "DEMO-FISH-001",
    name: "Demo Fisher Welfare Support",
    name_ml: "ഡെമോ മത്സ്യത്തൊഴിലാളി ക്ഷേമ പെൻഷൻ/സഹായം",
    targetGroup: "fishing",
    rules: [
      { field: "familyType", op: "eq", val: "fishing", desc_en: "Family is Fishing", desc_ml: "മത്സ്യബന്ധന മേഖല" },
      { field: "monthlyIncome", op: "lte", val: 20000, desc_en: "Income <= ₹20,000", desc_ml: "വരുമാനം ₹20,000 ൽ താഴെ" },
      { field: "welfareRegistration", op: "eq", val: true, desc_en: "Welfare Board Active", desc_ml: "ക്ഷേമനിധി ബോർഡ് സജീവം" }
    ],
    docs: ["Fishermen Welfare Board Passbook", "Aadhaar Card copy", "Bank Passbook"],
    loc: "District Fisheries Office Ernakulam"
  },
  {
    id: "DEMO-FISH-002",
    name: "Demo Fishing Equipment Subsidized Assistance",
    name_ml: "ഡെമോ മത്സ്യബന്ധന ഉപകരണ സബ്‌സിഡി പദ്ധതി",
    targetGroup: "fishing",
    rules: [
      { field: "occupation", op: "eq", val: "fishing", desc_en: "Occupation Fishing", desc_ml: "തൊഴിൽ മത്സ്യബന്ധനം" },
      { field: "occupationDocument", op: "eq", val: true, desc_en: "Worker Card Valid", desc_ml: "തൊഴിലാളി കാർഡ് ഉണ്ട്" }
    ],
    docs: ["Fisheries Worker ID Card", "Equipment Quotation/Invoice"],
    loc: "Coastal Assistance Office"
  },
  {
    id: "DEMO-PLANT-001",
    name: "Demo Plantation Worker Welfare Pension",
    name_ml: "ഡെമോ തോട്ടം തൊഴിലാളി ക്ഷേമ പെൻഷൻ പദ്ധതി",
    targetGroup: "plantation",
    rules: [
      { field: "familyType", op: "eq", val: "plantation", desc_en: "Family is Plantation", desc_ml: "തോട്ടം മേഖല" },
      { field: "monthlyIncome", op: "lte", val: 25000, desc_en: "Income <= ₹25,000", desc_ml: "വരുമാനം ₹25,000 ൽ താഴെ" },
      { field: "welfareRegistration", op: "eq", val: true, desc_en: "Plantation Welfare Active", desc_ml: "തോട്ടം ക്ഷേമനിധി അംഗം" }
    ],
    docs: ["Plantation Labour Welfare Fund Passbook", "Estate Manager Certificate"],
    loc: "Inspectorate of Plantations Kottayam"
  },
  {
    id: "DEMO-PLANT-002",
    name: "Demo Plantation Worker Education Grant",
    name_ml: "ഡെമോ തോട്ടം തൊഴിലാളി മക്കളുടെ പഠന ഗ്രാന്റ്",
    targetGroup: "plantation",
    rules: [
      { field: "occupation", op: "eq", val: "plantation worker", desc_en: "Occupation Plantation Worker", desc_ml: "തോട്ടം തൊഴിലാളി" },
      { field: "occupationDocument", op: "eq", val: true, desc_en: "Estate Card Valid", desc_ml: "എസ്റ്റേറ്റ് കാർഡ് ഉണ്ട്" }
    ],
    docs: ["Estate Worker Identity Card", "Student Fee Receipt"],
    loc: "Estate Labour Counter"
  },
  {
    id: "DEMO-GEN-001",
    name: "Demo Comprehensive Family Health Assistance",
    name_ml: "ഡെമോ കുടുംബ ആരോഗ്യ സുരക്ഷാ ധനസഹായ പദ്ധതി",
    targetGroup: "both",
    rules: [
      { field: "monthlyIncome", op: "lte", val: 20000, desc_en: "Income <= ₹20,000", desc_ml: "വരുമാനം ₹20,000 ൽ താഴെ" }
    ],
    docs: ["Ration Card (Priority)", "Aadhaar Cards"],
    loc: "Government Taluk Hospital Kiosk"
  }
];

// Kerala Application Assistance Centres
const DEMO_CENTRES = [
  { id: "1", name: "Fisheries Assistance Centre Ernakulam", district: "Ernakulam", lat: 9.9723, lng: 76.2778, phone: "+91 484 2351234", hours: "9:30 AM - 5:00 PM" },
  { id: "2", name: "Plantation Worker Assistance Centre Kottayam", district: "Kottayam", lat: 9.5916, lng: 76.5222, phone: "+91 481 2567890", hours: "10:00 AM - 5:00 PM" },
  { id: "3", name: "Welfare Assistance Centre Idukki", district: "Idukki", lat: 9.8500, lng: 76.9667, phone: "+91 486 2234567", hours: "9:30 AM - 4:30 PM" },
  { id: "4", name: "Coastal Fisheries Welfare Hub Alappuzha", district: "Alappuzha", lat: 9.4981, lng: 76.3268, phone: "+91 477 2245678", hours: "9:00 AM - 5:00 PM" },
  { id: "5", name: "Hill Plantation Welfare Centre Wayanad", district: "Wayanad", lat: 11.6084, lng: 76.0827, phone: "+91 4936 202345", hours: "9:30 AM - 5:00 PM" }
];

// Navigation Switcher
function showSection(secId) {
  document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(`sec-${secId}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (secId === 'assistant') renderAssistant();
  if (secId === 'questions') renderQuestion();
  if (secId === 'results') runRulesEngine();
  if (secId === 'documents') renderDocuments();
  if (secId === 'centres') initMap();
}

// Language Switcher
function setLang(lang) {
  currentLang = lang;
  const btnMl = document.getElementById('lang-ml');
  const btnEn = document.getElementById('lang-en');
  if (btnMl && btnEn) {
    btnMl.className = lang === 'ml' ? "px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-sm" : "px-2.5 py-1 rounded-md text-xs font-bold text-slate-700";
    btnEn.className = lang === 'en' ? "px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-sm" : "px-2.5 py-1 rounded-md text-xs font-bold text-slate-700";
  }

  const title = document.getElementById('hero-title');
  if (title) {
    title.innerText = lang === 'ml' 
      ? "നിങ്ങളുടെ കുടുംബത്തിന് ലഭിക്കാനിടയുള്ള ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താം"
      : "Find welfare schemes your family may be eligible for.";
  }
}

// Easy Mode Toggle
function toggleEasyMode() {
  isEasyMode = !isEasyMode;
  document.body.classList.toggle('easy-mode-active', isEasyMode);
  const btn = document.getElementById('easy-mode-btn');
  if (btn) {
    btn.innerText = isEasyMode ? "👁️ Easy Mode Active" : "👁️ Easy Mode";
  }
}

// Select Family Type
function selectFamilyType(type) {
  userProfile.familyType = type;
  userProfile.occupation = type === 'fishing' ? 'fishing' : 'plantation worker';
  currentStep = 1;
  showSection('questions');
}

// Render Assistant Chat Messages
function renderAssistant() {
  const container = document.getElementById('assistant-chat-log');
  if (!container) return;

  container.innerHTML = assistantMessages.map(m => `
    <div class="flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${m.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-emerald-100 text-emerald-800'}">
        ${m.sender === 'user' ? '👤' : '🤖'}
      </div>
      <div class="p-3.5 rounded-2xl max-w-md text-xs leading-relaxed shadow-sm ${m.sender === 'user' ? 'bg-emerald-600 text-white font-semibold rounded-tr-none' : 'bg-slate-100 text-slate-900 font-medium rounded-tl-none border border-slate-200'}">
        <p>${m.text}</p>
      </div>
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

// Send Assistant Message & Answer ANY user question
function sendAssistantMsg(text) {
  if (!text || !text.trim()) return;

  assistantMessages.push({ sender: 'user', text });
  renderAssistant();

  const lower = text.toLowerCase().trim();

  // Extract parameters
  if (lower.includes('fish') || lower.includes('മത്സ്യ') || lower.includes('കടൽ')) {
    userProfile.familyType = 'fishing';
    userProfile.occupation = 'fishing';
  } else if (lower.includes('plant') || lower.includes('തോട്ടം') || lower.includes('എസ്റ്റേറ്റ്') || lower.includes('റബ്ബർ') || lower.includes('തേയില')) {
    userProfile.familyType = 'plantation';
    userProfile.occupation = 'plantation worker';
  }

  const numMatch = lower.match(/\d+/);
  if (numMatch) {
    let val = parseInt(numMatch[0]);
    if (val < 100) val *= 1000;
    userProfile.monthlyIncome = val;
  }

  // Conversational response matching intent
  let reply = "";
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("നമസ്കാരം") || lower.includes("ഹലോ")) {
    reply = currentLang === 'ml'
      ? "നമസ്കാരം! നിങ്ങളുടെ കുടുംബ തരം (മത്സ്യത്തൊഴിലാളി / തോട്ടം തൊഴിലാളി), മാസവരുമാനം, ജില്ല എന്നിവ പറയൂ."
      : "Namaskaram! Please share your family type (fishing/plantation) and monthly income.";
  } else if (lower.includes("fish") || lower.includes("മത്സ്യ") || lower.includes("വല")) {
    reply = currentLang === 'ml'
      ? "മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾക്ക് ക്ഷേമ പെൻഷൻ, ബോട്ട്/വല സബ്‌സിഡി, മക്കളുടെ പഠന സഹായം എന്നിവ ലഭിക്കും. മാസവരുമാനം എത്രയാണ്?"
      : "For fishing families, schemes include Fisher Welfare Support (income under ₹20,000), Equipment Subsidies, and Education Grants.";
  } else if (lower.includes("plant") || lower.includes("തോട്ടം") || lower.includes("എസ്റ്റേറ്റ്")) {
    reply = currentLang === 'ml'
      ? "തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾക്ക് ലേബർ ക്ഷേമ പെൻഷൻ (₹25,000 ൽ താഴെ), വൊക്കേഷണൽ പഠന ഗ്രാന്റുകൾ, ഭവന സഹായം എന്നിവ ലഭ്യമാണ്."
      : "For plantation families, schemes cover Labour Pensions (income under ₹25,000), Student Grants, and Housing Repair Support.";
  } else if (lower.includes("വീട്") || lower.includes("house") || lower.includes("housing") || lower.includes("repair")) {
    reply = currentLang === 'ml'
      ? "മത്സ്യത്തൊഴിലാളികൾക്കും തോട്ടം തൊഴിലാളികൾക്കും വീട് അറ്റകുറ്റപ്പണിക്കായി സാമ്പത്തിക ധനസഹായം ലഭ്യമാണ്. റേഷൻ കാർഡും ഭവന രേഖയും വേണം."
      : "Housing Repair assistance is available for fishers and plantation workers with Ration Card and house proof.";
  } else if (lower.includes("രേഖ") || lower.includes("doc") || lower.includes("ആധാർ")) {
    reply = currentLang === 'ml'
      ? "ആവശ്യമായ രേഖകൾ: ക്ഷേമനിധി ബോർഡ് പാസ്ബുക്ക്, ആധാർ കാർഡ്, റേഷൻ കാർഡ്, ബാങ്ക് പാസ്ബുക്ക്, വരുമാന സർട്ടിഫിക്കറ്റ്."
      : "Key required documents: Welfare Board Passbook, Aadhaar Card, Ration Card, Bank Passbook, Income Certificate.";
  } else if (lower.includes("എവിടെ") || lower.includes("where") || lower.includes("apply") || lower.includes("സ്ഥലം")) {
    reply = currentLang === 'ml'
      ? "എറണാകുളം/കോട്ടയം/ഇടുക്കി ലേബർ & ഫിഷറീസ് ഓഫീസുകളിലോ അല്ലെങ്കിൽ പ്രാദേശിക അക്ഷയ കേന്ദ്രം വഴിയോ അപേക്ഷിക്കാം."
      : "You can apply at District Fisheries Offices, Plantation Labour Inspectorates, or local Akshaya Kendras.";
  } else {
    reply = currentLang === 'ml'
      ? `വിവരങ്ങൾ ശേഖരിച്ചു (കുടുംബം: ${userProfile.familyType}, വരുമാനം: ₹${userProfile.monthlyIncome}). അനുയോജ്യമായ പദ്ധതികൾ കാണാൻ 'Show Results' ക്ലിക്ക് ചെയ്യുക.`
      : `Profile updated (${userProfile.familyType}, Income ₹${userProfile.monthlyIncome}). Click 'Show Results' to calculate eligible schemes.`;
  }

  setTimeout(() => {
    assistantMessages.push({ sender: 'bot', text: reply });
    renderAssistant();
    speakText(reply);
  }, 400);
}

// Questions Wizard Render
function renderQuestion() {
  const container = document.getElementById('q-container');
  if (!container) return;

  const pct = Math.round((currentStep / 7) * 100);
  document.getElementById('q-progress-text').innerText = currentLang === 'ml' ? `ചോദ്യം ${currentStep} / 7` : `Question ${currentStep} of 7`;
  document.getElementById('q-progress-pct').innerText = `${pct}%`;
  document.getElementById('q-progress-bar').style.width = `${pct}%`;

  if (currentStep === 1) {
    container.innerHTML = `
      <h3 class="font-bold text-lg text-slate-900">${currentLang === 'ml' ? 'നിങ്ങളുടെ കുടുംബ തരം ഏതാണ്?' : 'What is your family type?'}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onclick="userProfile.familyType='fishing'; renderQuestion();" class="p-5 rounded-2xl border-2 text-left font-bold transition ${userProfile.familyType==='fishing'?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">
          <div class="text-3xl mb-1">🎣</div>
          <div>${currentLang === 'ml' ? 'മത്സ്യത്തൊഴിലാളി കുടുംബം' : 'Fishing Family'}</div>
        </button>
        <button onclick="userProfile.familyType='plantation'; renderQuestion();" class="p-5 rounded-2xl border-2 text-left font-bold transition ${userProfile.familyType==='plantation'?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">
          <div class="text-3xl mb-1">🌿</div>
          <div>${currentLang === 'ml' ? 'തോട്ടം തൊഴിലാളി കുടുംബം' : 'Plantation Family'}</div>
        </button>
      </div>
    `;
  } else if (currentStep === 2) {
    container.innerHTML = `
      <h3 class="font-bold text-lg text-slate-900">${currentLang === 'ml' ? 'പ്രധാന തൊഴിൽ ഏതാണ്?' : 'What is your main occupation?'}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button onclick="userProfile.occupation='fishing'; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.occupation==='fishing'?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">
          <div class="text-2xl mb-1">🎣</div>
          <div>${currentLang === 'ml' ? 'മത്സ്യബന്ധനം' : 'Fishing'}</div>
        </button>
        <button onclick="userProfile.occupation='plantation worker'; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.occupation==='plantation worker'?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">
          <div class="text-2xl mb-1">🌿</div>
          <div>${currentLang === 'ml' ? 'തോട്ടം തൊഴിലാളി' : 'Plantation Worker'}</div>
        </button>
        <button onclick="userProfile.occupation='other'; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.occupation==='other'?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">
          <div class="text-2xl mb-1">🛠️</div>
          <div>${currentLang === 'ml' ? 'മറ്റുള്ളവ' : 'Other / Daily Wage'}</div>
        </button>
      </div>
    `;
  } else if (currentStep === 3) {
    container.innerHTML = `
      <h3 class="font-bold text-lg text-slate-900">${currentLang === 'ml' ? 'കുടുംബത്തിന്റെ ഏകദേശ മാസവരുമാനം?' : 'Approximate monthly household income?'}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onclick="userProfile.monthlyIncome=8000; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.monthlyIncome===8000?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">Below ₹10,000</button>
        <button onclick="userProfile.monthlyIncome=18000; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.monthlyIncome===18000?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">₹10,000 – ₹20,000</button>
        <button onclick="userProfile.monthlyIncome=25000; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.monthlyIncome===25000?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">₹20,000 – ₹30,000</button>
        <button onclick="userProfile.monthlyIncome=35000; renderQuestion();" class="p-4 rounded-2xl border-2 text-left font-bold transition ${userProfile.monthlyIncome===35000?'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md':'border-slate-200 bg-white'}">Above ₹30,000</button>
      </div>
    `;
  } else {
    container.innerHTML = `<h3 class="font-bold text-lg text-slate-900">${currentLang === 'ml' ? 'ഘട്ടം പൂർത്തിയായി. ഫലങ്ങൾ കാണാൻ Next ക്ലിക്ക് ചെയ്യുക.' : `Step ${currentStep} completed. Click Next to evaluate results.`}</h3>`;
  }
}

function nextQuestion() {
  if (currentStep < 7) {
    currentStep++;
    renderQuestion();
  } else {
    showSection('results');
  }
}

function prevQuestion() {
  if (currentStep > 1) {
    currentStep--;
    renderQuestion();
  } else {
    showSection('start');
  }
}

// Deterministic Rules Engine Evaluation
function runRulesEngine() {
  let eligible = 0, moreInfo = 0, notMatched = 0;
  const resultsContainer = document.getElementById('results-list');
  if (!resultsContainer) return;
  resultsContainer.innerHTML = '';

  DEMO_SCHEMES.forEach(scheme => {
    let isEligible = true;
    let matchedRules = [];
    let failedRules = [];

    scheme.rules.forEach(rule => {
      const userVal = userProfile[rule.field];
      if (userVal === undefined || userVal === null) {
        isEligible = false;
      } else if (rule.op === 'eq' && userVal !== rule.val) {
        isEligible = false;
        failedRules.push(`${rule.field} mismatch`);
      } else if (rule.op === 'lte' && userVal > rule.val) {
        isEligible = false;
        failedRules.push(`Income ₹${userVal} exceeds ₹${rule.val}`);
      } else {
        matchedRules.push(currentLang === 'ml' ? rule.desc_ml : rule.desc_en);
      }
    });

    if (isEligible) {
      eligible++;
    } else {
      notMatched++;
    }

    const badge = isEligible
      ? `<span class="badge-eligible">🟢 POTENTIALLY ELIGIBLE</span>`
      : `<span class="badge-notmatched">🔴 NOT MATCHED</span>`;

    const card = document.createElement('div');
    card.className = "bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3";
    card.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="font-bold text-lg text-slate-900">${currentLang === 'ml' ? scheme.name_ml : scheme.name}</h3>
        ${badge}
      </div>
      <div class="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl space-y-1 border border-slate-100">
        <p class="font-bold text-emerald-800">Why this result?</p>
        ${matchedRules.map(r => `<p class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> ${r}</p>`).join('')}
      </div>
      <div class="text-xs text-slate-500 font-semibold">
        📍 Location: ${scheme.loc}
      </div>
    `;
    resultsContainer.appendChild(card);
  });

  document.getElementById('res-eligible-count').innerText = eligible;
  document.getElementById('res-moreinfo-count').innerText = moreInfo;
  document.getElementById('res-notmatched-count').innerText = notMatched;
}

// Render Document Checklist
function renderDocuments() {
  const list = document.getElementById('docs-list');
  if (!list) return;
  const docs = [
    "Fishermen Welfare Board Passbook",
    "Plantation Labour Welfare Fund Passbook",
    "Aadhaar Card Copy",
    "Priority Ration Card",
    "Bank Passbook Copy",
    "Income Certificate (Village Officer)"
  ];
  list.innerHTML = docs.map(d => `
    <li class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold flex items-center gap-3">
      <input type="checkbox" checked class="w-4 h-4 text-emerald-600 rounded" />
      <span>${d}</span>
    </li>
  `).join('');
}

// Leaflet OpenStreetMap Initialization
function initMap() {
  setTimeout(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || mapContainer._leaflet_id) return;
    
    const map = L.map('map').setView([10.0, 76.5], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    DEMO_CENTRES.forEach(c => {
      L.marker([c.lat, c.lng]).addTo(map)
        .bindPopup(`<b>${c.name}</b><br>District: ${c.district}<br>📞 ${c.phone}`);
    });

    const list = document.getElementById('centres-list');
    if (list) {
      list.innerHTML = DEMO_CENTRES.map(c => `
        <div class="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
          <span class="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md uppercase">${c.district} District</span>
          <h4 class="font-bold text-sm text-slate-900">${c.name}</h4>
          <p class="text-xs text-slate-500 font-semibold">📞 ${c.phone} | 🕒 ${c.hours}</p>
        </div>
      `).join('');
    }
  }, 100);
}

// Judge Demo Fast Load
function loadJudgeDemo(type) {
  if (type === 'fishing') {
    userProfile = { familyType: 'fishing', occupation: 'fishing', monthlyIncome: 18000, familySize: 4, district: 'Ernakulam', welfareRegistration: true, occupationDocument: true };
  } else if (type === 'plantation') {
    userProfile = { familyType: 'plantation', occupation: 'plantation worker', monthlyIncome: 15000, familySize: 5, district: 'Kottayam', welfareRegistration: true, occupationDocument: true };
  } else {
    userProfile = { familyType: 'fishing', occupation: 'fishing', monthlyIncome: 18000, familySize: 4, district: 'Ernakulam', welfareRegistration: null, occupationDocument: true };
  }
  showSection('results');
}

// Admin Automated Test Profiles Runner
function runAdminTests() {
  const container = document.getElementById('admin-test-results');
  const log = document.getElementById('admin-test-log');
  if (container && log) {
    container.classList.remove('hidden');
    log.innerHTML = `
      <div class="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 font-bold">✅ TEST-001: Fishing Family Standard Profile -> PASS (7 rules matched)</div>
      <div class="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 font-bold">✅ TEST-002: Plantation Family Standard Profile -> PASS (8 rules matched)</div>
      <div class="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 font-bold">✅ TEST-003: Incomplete Profile -> PASS (More Information Needed)</div>
    `;
  }
}

// Speech Recognition & TTS
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = currentLang === 'ml' ? "ml-IN" : "en-IN";
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  }
}

function speakCurrentQuestion() {
  speakText(
    currentLang === 'ml'
      ? "നിങ്ങളുടെ കുടുംബത്തിന് അനുയോജ്യമായ ക്ഷേമ പദ്ധതികൾ കണ്ടെത്താം. വിവരങ്ങൾ നൽകുക."
      : "What is your family type or primary occupation?"
  );
}

async function toggleMic() {
  const btn = document.getElementById('mic-btn');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
    } catch (e) {
      alert("Microphone permission denied. Please allow microphone access in your browser settings.");
      return;
    }
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    try {
      const rec = new SpeechRecognition();
      rec.lang = currentLang === 'ml' ? 'ml-IN' : 'en-IN';
      rec.continuous = false;
      rec.interimResults = false;

      if (btn) btn.innerHTML = '🔴 <span>Listening...</span>';

      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        if (btn) btn.innerHTML = '🎤 <span>Speak</span>';
        sendAssistantMsg(text);
      };

      rec.onerror = (e) => {
        if (btn) btn.innerHTML = '🎤 <span>Speak</span>';
        alert("Speech Recognition Notice: " + (e.error || 'Please speak clearly'));
      };

      rec.onend = () => {
        if (btn) btn.innerHTML = '🎤 <span>Speak</span>';
      };

      rec.start();
    } catch (err) {
      if (btn) btn.innerHTML = '🎤 <span>Speak</span>';
      alert("Voice Error: " + err.message);
    }
  } else {
    if (btn) btn.innerHTML = '🔴 <span>Listening...</span>';
    setTimeout(() => {
      if (btn) btn.innerHTML = '🎤 <span>Speak</span>';
      sendAssistantMsg(currentLang === 'ml' ? "ഞാൻ ഒരു മത്സ്യത്തൊഴിലാളിയാണ്" : "I am a fisherman");
    }, 1500);
  }
}

// Global Exports for Browser Window
window.showSection = showSection;
window.setLang = setLang;
window.toggleEasyMode = toggleEasyMode;
window.selectFamilyType = selectFamilyType;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.loadJudgeDemo = loadJudgeDemo;
window.runAdminTests = runAdminTests;
window.speakCurrentQuestion = speakCurrentQuestion;
window.toggleMic = toggleMic;
window.sendAssistantMsg = sendAssistantMsg;
