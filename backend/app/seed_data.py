from typing import List
from app.schemas import Scheme, Rule, ApplicationCentre, TestProfile, HouseholdProfile

DEMO_SCHEMES: List[Scheme] = [
    Scheme(
        id="DEMO-FISH-001",
        name="Demo Fisher Welfare Support",
        name_ml="ഡെമോ മത്സ്യത്തൊഴിലാളി ക്ഷേമ പെൻഷൻ/സഹായം",
        description="Financial welfare grant for registered fishing households with monthly income under ₹20,000.",
        description_ml="മാസവരുമാനം ₹20,000 ൽ താഴെയുള്ള രജിസ്റ്റർ ചെയ്ത മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾക്കുള്ള സാമ്പത്തിക സഹായം.",
        targetGroup="fishing",
        eligibilityRules=[
            Rule(
                field="familyType",
                operator="equals",
                value="fishing",
                description_en="Household is classified as a Fishing family.",
                description_ml="കുടുംബം മത്സ്യബന്ധന മേഖലയിലാണ് പ്രവർത്തിക്കുന്നത്."
            ),
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=20000,
                description_en="Monthly household income is ₹20,000 or lower.",
                description_ml="കുടുംബത്തിന്റെ മാസവരുമാനം ₹20,000 അല്ലെങ്കിൽ അതിൽ കുറവാണ്."
            ),
            Rule(
                field="welfareRegistration",
                operator="boolean_match",
                value=True,
                description_en="Has active Fishermen Welfare Board registration.",
                description_ml="മത്സ്യത്തൊഴിലാളി ക്ഷേമനിധി ബോർഡ് രജിസ്ട്രേഷൻ ഉണ്ട്."
            )
        ],
        requiredDocuments=[
            "Fishermen Welfare Board Passbook",
            "Aadhaar Card copy",
            "Bank Passbook copy",
            "Income Certificate"
        ],
        requiredDocuments_ml=[
            "മത്സ്യത്തൊഴിലാളി ക്ഷേമനിധി ബോർഡ് പാസ്ബുക്ക്",
            "ആധാർ കാർഡ് പകർപ്പ്",
            "ബാങ്ക് പാസ്ബുക്ക് പകർപ്പ്",
            "വരുമാന സർട്ടിഫിക്കറ്റ്"
        ],
        applicationMethod="Offline submission at local Fisheries Office or online via Akshaya Kendra.",
        applicationMethod_ml="അടുത്തുള്ള ഫിഷറീസ് ഓഫീസിലോ അക്ഷയ കേന്ദ്രം വഴിയോ അപേക്ഷിക്കുക.",
        applicationLocation="District Fisheries Office / Matsyafed Regional Office",
        applicationLocation_ml="ജില്ലാ ഫിഷറീസ് ഓഫീസ് / മത്സ്യഫെഡ് റീജിയണൽ ഓഫീസ്",
        source="Demo Welfare Board Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-FISH-002",
        name="Demo Fishing Equipment Subsidized Assistance",
        name_ml="ഡെമോ മത്സ്യബന്ധന ഉപകരണ സബ്‌സിഡി പദ്ധതി",
        description="Subsidy scheme for traditional fishers purchasing nets, safety gear, or boat motors.",
        description_ml="പരമ്പരാഗത മത്സ്യത്തൊഴിലാളികൾക്ക് വല, സുരക്ഷാ ഉപകരണങ്ങൾ, എഞ്ചിൻ എന്നിവ വാങ്ങുന്നതിനുള്ള സബ്‌സിഡി.",
        targetGroup="fishing",
        eligibilityRules=[
            Rule(
                field="occupation",
                operator="equals",
                value="fishing",
                description_en="Main occupation is fishing.",
                description_ml="പ്രധാന തൊഴിൽ മത്സ്യബന്ധനം ആണ്."
            ),
            Rule(
                field="occupationDocument",
                operator="boolean_match",
                value=True,
                description_en="Possesses valid Fishing License / Worker ID.",
                description_ml="സാധുവായ ഫിഷിംഗ് ലൈസൻസ്/തൊഴിലാളി തിരിച്ചറിയൽ കാർഡ് ഉണ്ട്."
            )
        ],
        requiredDocuments=[
            "Fisheries Worker ID Card",
            "Quotation/Invoice of Equipment",
            "Bank Account Details"
        ],
        requiredDocuments_ml=[
            "ഫിഷറീസ് വർക്കർ ഐഡി കാർഡ്",
            "ഉപകരണത്തിന്റെ കൊട്ടേഷൻ/ഇൻവോയ്സ്",
            "ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ"
        ],
        applicationMethod="Submit application form with equipment quotation to Coastal Fisheries Office.",
        applicationMethod_ml="തീരദേശ ഫിഷറീസ് ഓഫീസിൽ ഉപകരണ കൊട്ടേഷനൊപ്പം അപേക്ഷ നൽകുക.",
        applicationLocation="Coastal Assistance Office",
        applicationLocation_ml="തീരദേശ സഹായ കേന്ദ്രം",
        source="Demo Fishing Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-FISH-003",
        name="Demo Fisher Family Education Support",
        name_ml="ഡെമോ മത്സ്യത്തൊഴിലാളി മക്കളുടെ വിദ്യാഭ്യാസ ധനസഹായം",
        description="Educational stipend for children of traditional fishers studying higher secondary or higher education.",
        description_ml="ഉന്നത പഠനം നടത്തുന്ന മത്സ്യത്തൊഴിലാളികളുടെ മക്കൾക്കുള്ള വിദ്യാഭ്യാസ സ്റ്റൈപ്പൻഡ്.",
        targetGroup="fishing",
        eligibilityRules=[
            Rule(
                field="familyType",
                operator="equals",
                value="fishing",
                description_en="Family belongs to fishing community.",
                description_ml="കുടുംബം മത്സ്യബന്ധന സമൂഹത്തിൽപ്പെട്ടതാണ്."
            ),
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=30000,
                description_en="Household income below ₹30,000 per month.",
                description_ml="കുടുംബ മാസവരുമാനം ₹30,000 ൽ താഴെയാണ്."
            )
        ],
        requiredDocuments=[
            "School/College Bonafide Certificate",
            "Parent Fisher Welfare ID",
            "Income Certificate"
        ],
        requiredDocuments_ml=[
            "സ്‌കൂൾ/കോളേജ് പഠന സർട്ടിഫിക്കറ്റ്",
            "രക്ഷിതാവിന്റെ ക്ഷേമനിധി ഐഡി",
            "വരുമാന സർട്ടിഫിക്കറ്റ്"
        ],
        applicationMethod="Submit via Educational Officer at Fisheries Department.",
        applicationMethod_ml="ഫിഷറീസ് വകുപ്പ് എജ്യുക്കേഷണൽ ഓഫീസർ വഴി അപേക്ഷ സമർപ്പിക്കുക.",
        applicationLocation="District Fisheries Education Office",
        applicationLocation_ml="ജില്ലാ ഫിഷറീസ് വിദ്യാഭ്യാസ ഓഫീസ്",
        source="Demo Welfare Board Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-FISH-004",
        name="Demo Fisher Housing Repair Scheme",
        name_ml="ഡെമോ മത്സ്യത്തൊഴിലാളി ഭവന പുനരുദ്ധാരണ ധനസഹായം",
        description="Assistance for structural repairs or roofing maintenance of homes of coastal fishing families.",
        description_ml="തീരദേശ മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങളുടെ വീടുകളുടെ അറ്റകുറ്റപ്പണിക്കുള്ള സാമ്പത്തിക സഹായം.",
        targetGroup="fishing",
        eligibilityRules=[
            Rule(
                field="familyType",
                operator="equals",
                value="fishing",
                description_en="Family is a registered fishing household.",
                description_ml="രജിസ്റ്റർ ചെയ്ത മത്സ്യത്തൊഴിലാളി കുടുംബമാണ്."
            ),
            Rule(
                field="welfareRegistration",
                operator="boolean_match",
                value=True,
                description_en="Active Welfare Registration verified.",
                description_ml="സജീവമായ ക്ഷേമനിധി രജിസ്ട്രേഷൻ ഉണ്ട്."
            ),
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=20000,
                description_en="Household income below ₹20,000.",
                description_ml="കുടുംബ വരുമാനം ₹20,000 ൽ താഴെയാണ്."
            )
        ],
        requiredDocuments=[
            "Ration Card copy",
            "House Ownership Certificate / Tax Receipt",
            "Photo of current house condition"
        ],
        requiredDocuments_ml=[
            "റേഷൻ കാർഡ് പകർപ്പ്",
            "വീടിന്റെ ഉടമസ്ഥാവകാശ സർട്ടിഫിക്കറ്റ്/നികുതി രസീത്",
            "വീടിന്റെ നിലവിലെ ഫോട്ടോ"
        ],
        applicationMethod="In-person application at Grama Panchayat / Fisheries Housing Section.",
        applicationMethod_ml="ഗ്രാമപഞ്ചായത്ത് / ഫിഷറീസ് ഭവന വിഭാഗത്തിൽ നേരിട്ട് അപേക്ഷിക്കുക.",
        applicationLocation="Local Grama Panchayat Office",
        applicationLocation_ml="തദ്ദേശ സ്വയംഭരണ ഗ്രാമപഞ്ചായത്ത് ഓഫീസ്",
        source="Demo Housing Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-PLANT-001",
        name="Demo Plantation Worker Welfare Pension",
        name_ml="ഡെമോ തോട്ടം തൊഴിലാളി ക്ഷേമ പെൻഷൻ പദ്ധതി",
        description="Welfare stipend for estate and plantation labor households with income under ₹25,000.",
        description_ml="മാസവരുമാനം ₹25,000 ൽ താഴെയുള്ള എസ്റ്റേറ്റ്/തോട്ടം തൊഴിലാളി കുടുംബങ്ങൾക്കുള്ള സാമ്പത്തിക ധനസഹായം.",
        targetGroup="plantation",
        eligibilityRules=[
            Rule(
                field="familyType",
                operator="equals",
                value="plantation",
                description_en="Household is classified as a Plantation family.",
                description_ml="കുടുംബം തോട്ടം തൊഴിലാളി മേഖലയിലാണ് പ്രവർത്തിക്കുന്നത്."
            ),
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=25000,
                description_en="Monthly household income is ₹25,000 or lower.",
                description_ml="കുടുംബത്തിന്റെ മാസവരുമാനം ₹25,000 അല്ലെങ്കിൽ അതിൽ കുറവാണ്."
            ),
            Rule(
                field="welfareRegistration",
                operator="boolean_match",
                value=True,
                description_en="Has active Plantation Labour Welfare Fund membership.",
                description_ml="തോട്ടം തൊഴിലാളി ക്ഷേമനിധി അംഗത്വം ഉണ്ട്."
            )
        ],
        requiredDocuments=[
            "Plantation Labour Welfare Fund Passbook",
            "Estate Manager Employment Certificate",
            "Aadhaar Card",
            "Bank Passbook"
        ],
        requiredDocuments_ml=[
            "തോട്ടം തൊഴിലാളി ക്ഷേമനിധി പാസ്ബുക്ക്",
            "എസ്റ്റേറ്റ് മാനേജർ നൽകിയ തൊഴിൽ സർട്ടിഫിക്കറ്റ്",
            "ആധാർ കാർഡ്",
            "ബാങ്ക് പാസ്ബുക്ക്"
        ],
        applicationMethod="Submit form to Plantation Inspector or Chief Labour Inspector.",
        applicationMethod_ml="പ്ലാന്റേഷൻ ഇൻസ്പെക്ടർ അല്ലെങ്കിൽ ലേബർ ഓഫീസർക്ക് അപേക്ഷ നൽകുക.",
        applicationLocation="Inspectorate of Plantations / District Labour Office",
        applicationLocation_ml="പ്ലാന്റേഷൻ ഇൻസ്പെക്ടറേറ്റ് / ജില്ലാ ലേബർ ഓഫീസ്",
        source="Demo Plantation Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-PLANT-002",
        name="Demo Plantation Worker Education Grant",
        name_ml="ഡെമോ തോട്ടം തൊഴിലാളി മക്കളുടെ പഠന ഗ്രാന്റ്",
        description="Financial grant for children of plantation laborers pursuing secondary and vocational courses.",
        description_ml="തോട്ടം തൊഴിലാളികളുടെ മക്കളുടെ ഹയർ സെക്കൻഡറി, വൊക്കേഷണൽ പഠനത്തിനായുള്ള ഗ്രാന്റ്.",
        targetGroup="plantation",
        eligibilityRules=[
            Rule(
                field="occupation",
                operator="equals",
                value="plantation worker",
                description_en="Occupation is plantation worker.",
                description_ml="പ്രധാന തൊഴിൽ തോട്ടം തൊഴിലാളിയാണ്."
            ),
            Rule(
                field="occupationDocument",
                operator="boolean_match",
                value=True,
                description_en="Holds valid Plantation Worker Passbook or Employment Card.",
                description_ml="തോട്ടം തൊഴിലാളി കാർഡ്/രേഖ കൈവശമുണ്ട്."
            )
        ],
        requiredDocuments=[
            "Estate Worker Identity Card",
            "Student Admission Fee Receipt",
            "Bank Passbook"
        ],
        requiredDocuments_ml=[
            "എസ്റ്റേറ്റ് തൊഴിലാളി തിരിച്ചറിയൽ കാർഡ്",
            "വിദ്യാർത്ഥിയുടെ അഡ്മിഷൻ ഫീസ് രസീത്",
            "ബാങ്ക് പാസ്ബുക്ക്"
        ],
        applicationMethod="Submit to Labour Welfare Officer with recommendation of Estate Manager.",
        applicationMethod_ml="എസ്റ്റേറ്റ് മാനേജരുടെ ശുപാർശയോടെ ലേബർ വെൽഫെയർ ഓഫീസർക്ക് നൽകുക.",
        applicationLocation="Estate Labour Welfare Counter",
        applicationLocation_ml="എസ്റ്റേറ്റ് ലേബർ വെൽഫെയർ കൗണ്ടർ",
        source="Demo Education Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-PLANT-003",
        name="Demo Worker Housing Maintenance Support",
        name_ml="ഡെമോ തൊഴിലാളി ലയം/ഭവന പരിപാലന ധനസഹായം",
        description="Assistance for maintaining and renovating plantation worker quarters or private homes.",
        description_ml="തോട്ടം തൊഴിലാളികളുടെ ലയങ്ങളുടെയോ സ്വന്തം വീടുകളുടെയോ പുനരുദ്ധാരണ സഹായം.",
        targetGroup="plantation",
        eligibilityRules=[
            Rule(
                field="familyType",
                operator="equals",
                value="plantation",
                description_en="Household belongs to plantation sector.",
                description_ml="കുടുംബം തോട്ടം മേഖലയിലാണ് ഉൾപ്പെടുന്നത്."
            ),
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=20000,
                description_en="Household income below ₹20,000.",
                description_ml="കുടുംബ വരുമാനം ₹20,000 ൽ താഴെയാണ്."
            )
        ],
        requiredDocuments=[
            "Proof of Residence in Plantation Quarters/Village",
            "Estate Manager Certificate",
            "Bank Details"
        ],
        requiredDocuments_ml=[
            "ലയത്തിലെ/ഗ്രാമത്തിലെ താമസ തെളിവ്",
            "എസ്റ്റേറ്റ് മാനേജരുടെ സർട്ടിഫിക്കറ്റ്",
            "ബാങ്ക് വിവരങ്ങൾ"
        ],
        applicationMethod="Submit application to District Labour Officer.",
        applicationMethod_ml="ജില്ലാ ലേബർ ഓഫീസർക്ക് അപേക്ഷ സമർപ്പിക്കുക.",
        applicationLocation="District Labour Office",
        applicationLocation_ml="ജില്ലാ ലേബർ ഓഫീസ്",
        source="Demo Housing Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-GEN-001",
        name="Demo Comprehensive Family Health Assistance",
        name_ml="ഡെമോ കുടുംബ ആരോഗ്യ സുരക്ഷാ ധനസഹായ പദ്ധതി",
        description="Universal health assistance for low-income fishing and plantation families for inpatient medical care.",
        description_ml="കുറഞ്ഞ വരുമാനമുള്ള കുടുംബങ്ങൾക്കായുള്ള സൗജന്യ ചികിത്സാ/ആരോഗ്യ സഹായം.",
        targetGroup="both",
        eligibilityRules=[
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=20000,
                description_en="Monthly household income is under ₹20,000.",
                description_ml="മാസവരുമാനം ₹20,000 ൽ താഴെയാണ്."
            ),
            Rule(
                field="familyType",
                operator="in",
                value=["fishing", "plantation"],
                description_en="Household is either Fishing or Plantation family.",
                description_ml="കുടുംബം മത്സ്യബന്ധന അല്ലെങ്കിൽ തോട്ടം മേഖലയിലുള്ളതാണ്."
            )
        ],
        requiredDocuments=[
            "Ration Card (BPL category or Priority)",
            "Aadhaar Cards of family members",
            "Doctor Medical Estimate Certificate"
        ],
        requiredDocuments_ml=[
            "റേഷൻ കാർഡ് (മുൻഗണനാ കാർഡ്)",
            "കുടുംബാംഗങ്ങളുടെ ആധാർ കാർഡുകൾ",
            "ഡോക്ടറുടെ ചികിത്സാ സർട്ടിഫിക്കറ്റ്"
        ],
        applicationMethod="Apply directly at Taluk Government Hospital Kiosk or Community Health Centre.",
        applicationMethod_ml="താലൂക്ക് ആശുപത്രി കിയോസ്‌ക് അല്ലെങ്കിൽ കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ വഴി അപേക്ഷിക്കുക.",
        applicationLocation="Government Taluk Hospital Kiosk",
        applicationLocation_ml="ഗവൺമെന്റ് താലൂക്ക് ആശുപത്രി കിയോസ്ക്",
        source="Demo Health Board Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-GEN-002",
        name="Demo Small Household Livelihood Support",
        name_ml="ഡെമോ ചെറുകിട ഉപജീവന സഹായ പദ്ധതി",
        description="Micro-grant for purchasing small enterprise equipment or poultry/cattle for vulnerable families.",
        description_ml="സ്വയംതൊഴിൽ കണ്ടെത്തുന്നതിനായി ചെറുകിട ഉപജീവന ഉപകരണങ്ങൾ വാങ്ങാനുള്ള ധനസഹായം.",
        targetGroup="both",
        eligibilityRules=[
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=15000,
                description_en="Monthly household income below ₹15,000.",
                description_ml="മാസവരുമാനം ₹15,000 ൽ താഴെയാണ്."
            ),
            Rule(
                field="familySize",
                operator="greater_than_or_equal",
                value=3,
                description_en="Household has 3 or more dependent members.",
                description_ml="കുടുംബത്തിൽ 3 അല്ലെങ്കിൽ അതിലധികം അംഗങ്ങളുണ്ട്."
            )
        ],
        requiredDocuments=[
            "Income Certificate from Village Officer",
            "Self-declaration project plan",
            "Aadhaar Card"
        ],
        requiredDocuments_ml=[
            "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള വരുമാന സർട്ടിഫിക്കറ്റ്",
            "സ്വയം സാക്ഷ്യപ്പെടുത്തിയ പദ്ധതി വിവരണം",
            "ആധാർ കാർഡ്"
        ],
        applicationMethod="Submit proposal to Kudumbashree/CDS Office or Block Development Office.",
        applicationMethod_ml="കുടുംബശ്രീ/സിഡിഎസ് ഓഫീസിലോ ബ്ലോക്ക് ഡെവലപ്‌മെന്റ് ഓഫീസിലോ നൽകുക.",
        applicationLocation="Block Development Office (BDO) / CDS Centre",
        applicationLocation_ml="ബ്ലോക്ക് ഡെവലപ്‌മെന്റ് ഓഫീസ് (BDO) / സി.ഡി.എസ് സെന്റർ",
        source="Demo Livelihood Board",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-GEN-003",
        name="Demo Youth Skill Development Assistance",
        name_ml="ഡെമോ യുവജന നൈപുണ്യ വികസന വൗച്ചർ",
        description="Free technical training voucher for young members of plantation and coastal fishing families.",
        description_ml="തോട്ടം, തീരദേശ യുവതീ യുവാക്കൾക്കുള്ള സൗജന്യ സാങ്കേതിക പരിശീലന വൗച്ചർ.",
        targetGroup="both",
        eligibilityRules=[
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=30000,
                description_en="Household monthly income below ₹30,000.",
                description_ml="മാസവരുമാനം ₹30,000 ൽ താഴെയാണ്."
            ),
            Rule(
                field="familyType",
                operator="in",
                value=["fishing", "plantation"],
                description_en="Belongs to Fishing or Plantation household.",
                description_ml="മത്സ്യബന്ധന അല്ലെങ്കിൽ തോട്ടം കുടുംബത്തിലെ അംഗമാണ്."
            )
        ],
        requiredDocuments=[
            "SSLC / 10th Certificate",
            "Aadhaar Card",
            "Category Proof Certificate"
        ],
        requiredDocuments_ml=[
            "എസ്.എസ്.എൽ.സി സർട്ടിഫിക്കറ്റ്",
            "ആധാർ കാർഡ്",
            "വിഭാഗം തെളിയിക്കുന്ന രേഖ"
        ],
        applicationMethod="Online application via Skill Development Portal or Industrial Training Centre.",
        applicationMethod_ml="സ്‌കിൽ ഡെവലപ്‌മെന്റ് പോർട്ടൽ അല്ലെങ്കിൽ ഐ.ടി.ഐ വഴി അപേക്ഷിക്കുക.",
        applicationLocation="Government ITI & Skill Development Centre",
        applicationLocation_ml="ഗവൺമെന്റ് ഐ.ടി.ഐ & സ്കിൽ ഡെവലപ്മെന്റ് സെന്റർ",
        source="Demo Skill Mission Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-GEN-004",
        name="Demo Women Household Head Support Scheme",
        name_ml="ഡെമോ വനിതാ ഗൃഹനാഥ ക്ഷേമ സഹായം",
        description="Special welfare assistance for women-led households in fishing villages and plantation estates.",
        description_ml="മത്സ്യഗ്രാമങ്ങളിലെയും തോട്ടങ്ങളിലെയും വനിതാ ഗൃഹനാഥകൾക്കുള്ള പ്രത്യേക ക്ഷേമ സഹായം.",
        targetGroup="both",
        eligibilityRules=[
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=25000,
                description_en="Household monthly income is under ₹25,000.",
                description_ml="മാസവരുമാനം ₹25,000 ൽ താഴെയാണ്."
            ),
            Rule(
                field="familyType",
                operator="in",
                value=["fishing", "plantation"],
                description_en="Belongs to Fishing or Plantation family.",
                description_ml="മത്സ്യബന്ധന അല്ലെങ്കിൽ തോട്ടം കുടുംബമാണ്."
            )
        ],
        requiredDocuments=[
            "Aadhaar Card of Head of Household",
            "Ration Card showing Woman as Head",
            "Bank Account Passbook"
        ],
        requiredDocuments_ml=[
            "ഗൃഹനാഥയുടെ ആധാർ കാർഡ്",
            "വനിതാ ഗൃഹനാഥ എന്ന് കാണിക്കുന്ന റേഷൻ കാർഡ്",
            "ബാങ്ക് അക്കൗണ്ട് പാസ്ബുക്ക്"
        ],
        applicationMethod="Submit application form to ICDS Supervisor or Anganwadi Centre.",
        applicationMethod_ml="ഐ.സി.ഡി.എസ് സൂപ്പർവൈസർക്കോ അങ്കണവാടി കേന്ദ്രത്തിനോ അപേക്ഷ നൽകുക.",
        applicationLocation="Local Anganwadi / ICDS Office",
        applicationLocation_ml="പ്രാദേശിക അങ്കണവാടി / ഐ.സി.ഡി.എസ് ഓഫീസ്",
        source="Demo Women Welfare Rules",
        status="active",
        isDemo=True
    ),
    Scheme(
        id="DEMO-GEN-005",
        name="Demo Monsoon Emergency Family Assistance",
        name_ml="ഡെമോ കാലവർഷ അടിയന്തര കുടുംബ സഹായം",
        description="Emergency relief kit and cash transfer during off-season monsoon bans or weather disruptions.",
        description_ml="കാലവർഷക്കെടുതി, ട്രോളിംഗ് നിരോധന സമയങ്ങളിലെ അടിയന്തര ആശ്വാസ പദ്ധതി.",
        targetGroup="both",
        eligibilityRules=[
            Rule(
                field="welfareRegistration",
                operator="boolean_match",
                value=True,
                description_en="Registered with Sector Welfare Board.",
                description_ml="മേഖലാ ക്ഷേമനിധിയിൽ അംഗമാണ്."
            ),
            Rule(
                field="monthlyIncome",
                operator="less_than_or_equal",
                value=20000,
                description_en="Monthly household income is below ₹20,000.",
                description_ml="മാസവരുമാനം ₹20,000 ൽ താഴെയാണ്."
            )
        ],
        requiredDocuments=[
            "Welfare Board Membership Book",
            "Aadhaar Card",
            "Bank Passbook"
        ],
        requiredDocuments_ml=[
            "ക്ഷേമനിധി ബോർഡ് ബുക്ക്",
            "ആധാർ കാർഡ്",
            "ബാങ്ക് പാസ്ബുക്ക്"
        ],
        applicationMethod="Direct disbursement via Welfare Board register.",
        applicationMethod_ml="ക്ഷേമനിധി രജിസ്റ്റർ വഴി നേരിട്ടുള്ള സഹായ വിതരണം.",
        applicationLocation="Coastal / Hill District Disaster Management Counter",
        applicationLocation_ml="തീരദേശ / മലയോര ദുരന്തനിവാരണ സഹായ കൗണ്ടർ",
        source="Demo Disaster Relief Rules",
        status="active",
        isDemo=True
    )
]


DEMO_CENTRES: List[ApplicationCentre] = [
    ApplicationCentre(
        id="CENTRE-001",
        name="Fisheries Assistance Centre Ernakulam",
        name_ml="ഫിഷറീസ് അസിസ്റ്റൻസ് സെന്റർ എറണാകുളം",
        district="Ernakulam",
        address="Near Boat Jetty, Park Avenue Road, Marine Drive, Kochi, Ernakulam - 682011",
        address_ml="ബോട്ട് ജെട്ടിക്ക് സമീപം, പാർക്ക് അവന്യൂ റോഡ്, മറൈൻ ഡ്രൈവ്, കൊച്ചി, എറണാകുളം",
        services=[
            "Fisher Welfare Registration",
            "Equipment Subsidy Application",
            "Education Scholarship Support"
        ],
        services_ml=[
            "മത്സ്യത്തൊഴിലാളി ക്ഷേമനിധി രജിസ്ട്രേഷൻ",
            "ഉപകരണ സബ്‌സിഡി അപേക്ഷ",
            "വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ് സഹായം"
        ],
        openingHours="Mon-Sat: 9:30 AM - 5:00 PM",
        openingHours_ml="തിങ്കൾ-ശനി: രാവിലെ 9:30 - വൈകുന്നേരം 5:00",
        latitude=9.9723,
        longitude=76.2778,
        phone="+91 484 2351234",
        isDemo=True
    ),
    ApplicationCentre(
        id="CENTRE-002",
        name="Plantation Worker Assistance Centre Kottayam",
        name_ml="പ്ലാന്റേഷൻ വർക്കർ അസിസ്റ്റൻസ് സെന്റർ കോട്ടയം",
        district="Kottayam",
        address="Labour Complex, Near Collectorate, KK Road, Kottayam - 686002",
        address_ml="ലേബർ കോംപ്ലക്സ്, കളക്ടറേറ്റിന് സമീപം, കെ.കെ റോഡ്, കോട്ടയം",
        services=[
            "Plantation Labour Pension",
            "Worker Housing Maintenance",
            "Education Grants"
        ],
        services_ml=[
            "തോട്ടം തൊഴിലാളി പെൻഷൻ",
            "ഭവന പരിപാലന സഹായം",
            "വിദ്യാഭ്യാസ ഗ്രാന്റുകൾ"
        ],
        openingHours="Mon-Fri: 10:00 AM - 5:00 PM",
        openingHours_ml="തിങ്കൾ-വെള്ളി: രാവിലെ 10:00 - വൈകുന്നേരം 5:00",
        latitude=9.5916,
        longitude=76.5222,
        phone="+91 481 2567890",
        isDemo=True
    ),
    ApplicationCentre(
        id="CENTRE-003",
        name="Welfare Assistance Centre Idukki",
        name_ml="വെൽഫെയർ അസിസ്റ്റൻസ് സെന്റർ ഇടുക്കി",
        district="Idukki",
        address="Civil Station Road, Painavu, Idukki - 685603",
        address_ml="സിവിൽ സ്റ്റേഷൻ റോഡ്, പൈനാവ്, ഇടുക്കി",
        services=[
            "Estate Labour Support",
            "Emergency Monsoon Relief",
            "Women Household Welfare"
        ],
        services_ml=[
            "എസ്റ്റേറ്റ് ലേബർ സഹായം",
            "അടിയന്തര കാലവർഷ ആശ്വാസം",
            "വനിതാ ഗൃഹനാഥ ക്ഷേമം"
        ],
        openingHours="Mon-Sat: 9:30 AM - 4:30 PM",
        openingHours_ml="തിങ്കൾ-ശനി: രാവിലെ 9:30 - വൈകുന്നേരം 4:30",
        latitude=9.8500,
        longitude=76.9667,
        phone="+91 486 2234567",
        isDemo=True
    ),
    ApplicationCentre(
        id="CENTRE-004",
        name="Coastal Fisheries Welfare Hub Alappuzha",
        name_ml="തീരദേശ ഫിഷറീസ് വെൽഫെയർ ഹബ് ആലപ്പുഴ",
        district="Alappuzha",
        address="Near Beach Road, Vada Canal Ward, Alappuzha - 688012",
        address_ml="ബീച്ച് റോഡിന് സമീപം, വാടക്കനാൽ വാർഡ്, ആലപ്പുഴ",
        services=[
            "Coastal Housing Repairs",
            "Emergency Relief Kits",
            "Boat & Motor Subsidy"
        ],
        services_ml=[
            "തീരദേശ ഭവന അറ്റകുറ്റപ്പണി",
            "അടിയന്തര ആശ്വാസ കിറ്റ്",
            "ബോട്ട് & മോട്ടോർ സബ്‌സിഡി"
        ],
        openingHours="Mon-Sat: 9:00 AM - 5:00 PM",
        openingHours_ml="തിങ്കൾ-ശനി: രാവിലെ 9:00 - വൈകുന്നേരം 5:00",
        latitude=9.4981,
        longitude=76.3268,
        phone="+91 477 2245678",
        isDemo=True
    ),
    ApplicationCentre(
        id="CENTRE-005",
        name="Hill Plantation Welfare Centre Wayanad",
        name_ml="ഹിൽ പ്ലാന്റേഷൻ വെൽഫെയർ സെന്റർ വയനാട്",
        district="Wayanad",
        address="Main Road, Kalpetta, Wayanad - 673121",
        address_ml="മെയിൻ റോഡ്, കൽപ്പറ്റ, വയനാട്",
        services=[
            "Tea & Rubber Worker Pension",
            "Youth Skill Vouchers",
            "Livelihood Assistance"
        ],
        services_ml=[
            "തേയില & റബ്ബർ തൊഴിലാളി പെൻഷൻ",
            "യുവജന സ്കിൽ വൗച്ചർ",
            "ഉപജീവന സഹായം"
        ],
        openingHours="Mon-Fri: 9:30 AM - 5:00 PM",
        openingHours_ml="തിങ്കൾ-വെള്ളി: രാവിലെ 9:30 - വൈകുന്നേരം 5:00",
        latitude=11.6084,
        longitude=76.0827,
        phone="+91 4936 202345",
        isDemo=True
    )
]


DEMO_TEST_PROFILES: List[TestProfile] = [
    TestProfile(
        id="TEST-001",
        name="Fishing Family - Standard Profile",
        description="Registered coastal fishing family earning ₹18,000 monthly with 4 members in Ernakulam.",
        profile=HouseholdProfile(
            familyType="fishing",
            occupation="fishing",
            monthlyIncome=18000,
            familySize=4,
            district="Ernakulam",
            welfareRegistration=True,
            occupationDocument=True,
            language="ml"
        ),
        expectedEligibleSchemes=["DEMO-FISH-001", "DEMO-FISH-002", "DEMO-FISH-003", "DEMO-FISH-004", "DEMO-GEN-001", "DEMO-GEN-003", "DEMO-GEN-005"]
    ),
    TestProfile(
        id="TEST-002",
        name="Plantation Family - Standard Profile",
        description="Registered plantation worker earning ₹15,000 monthly with 5 members in Kottayam.",
        profile=HouseholdProfile(
            familyType="plantation",
            occupation="plantation worker",
            monthlyIncome=15000,
            familySize=5,
            district="Kottayam",
            welfareRegistration=True,
            occupationDocument=True,
            language="ml"
        ),
        expectedEligibleSchemes=["DEMO-PLANT-001", "DEMO-PLANT-002", "DEMO-PLANT-003", "DEMO-GEN-001", "DEMO-GEN-002", "DEMO-GEN-003", "DEMO-GEN-004", "DEMO-GEN-005"]
    ),
    TestProfile(
        id="TEST-003",
        name="Incomplete Profile",
        description="Profile with missing welfare registration status.",
        profile=HouseholdProfile(
            familyType="fishing",
            occupation="fishing",
            monthlyIncome=18000,
            familySize=4,
            district="Ernakulam",
            welfareRegistration=None,
            occupationDocument=True,
            language="ml"
        ),
        expectedEligibleSchemes=["DEMO-FISH-002", "DEMO-FISH-003", "DEMO-GEN-001", "DEMO-GEN-003"]
    )
]
