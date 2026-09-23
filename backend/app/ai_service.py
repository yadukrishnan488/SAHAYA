import re
import json
from typing import Dict, Any, Tuple
from app.config import settings
from app.schemas import HouseholdProfile, VoiceExtractResponse

# Try importing google.genai if available and key configured
try:
    if settings.GEMINI_API_KEY:
        from google import genai
        ai_client = genai.Client(api_key=settings.GEMINI_API_KEY)
    else:
        ai_client = None
except Exception:
    ai_client = None


def extract_household_information(user_input: str, current_profile: HouseholdProfile) -> VoiceExtractResponse:
    """
    AI Service Layer: Extracts structured parameters from Malayalam / English text.
    Does NOT calculate eligibility! Simply returns extracted values and updated profile object.
    """
    text_lower = user_input.lower().strip()
    extracted: Dict[str, Any] = {}

    # Heuristic & NLU Malayalam / English keyword parsing fallback
    # 1. Family Type & Occupation
    if any(w in text_lower for w in ["മത്സ്യത്തൊഴിലാളി", "മത്സ്യബന്ധനം", "കടൽ", "fishing", "fisherman", "fisher"]):
        extracted["familyType"] = "fishing"
        extracted["occupation"] = "fishing"
    elif any(w in text_lower for w in ["തോട്ടം", "തോട്ടം തൊഴിലാളി", "ലയം", "റബ്ബർ", "തേയില", "plantation", "estate", "tea", "rubber"]):
        extracted["familyType"] = "plantation"
        extracted["occupation"] = "plantation worker"

    # 2. Income extraction (numbers or keywords)
    income_match = re.search(r'(\d+[\d,]*)\s*(രൂപ|റുപ്പിക|rs|inr|rupees)?', text_lower)
    if income_match:
        try:
            num_str = income_match.group(1).replace(",", "")
            income_val = int(num_str)
            # Normalize thousands if expressed as 18 or 20
            if income_val < 100:
                income_val = income_val * 1000
            extracted["monthlyIncome"] = income_val
        except ValueError:
            pass

    if "10000" in text_lower or "പതിനായിരം" in text_lower:
        extracted["monthlyIncome"] = 10000
    elif "18000" in text_lower or "പതിനെട്ടായിരം" in text_lower:
        extracted["monthlyIncome"] = 18000
    elif "20000" in text_lower or "ഇരുപതായിരം" in text_lower:
        extracted["monthlyIncome"] = 20000
    elif "25000" in text_lower or "ഇരുപത്തഞ്ചായിരം" in text_lower:
        extracted["monthlyIncome"] = 25000
    elif "30000" in text_lower or "മുപ്പതായിരം" in text_lower:
        extracted["monthlyIncome"] = 30000

    # 3. District detection
    districts = {
        "ernakulam": "Ernakulam", "എറണാകുളം": "Ernakulam", "kochi": "Ernakulam",
        "kottayam": "Kottayam", "കോട്ടയം": "Kottayam",
        "idukki": "Idukki", "ഇടുക്കി": "Idukki",
        "alappuzha": "Alappuzha", "ആലപ്പുഴ": "Alappuzha", "alleppey": "Alappuzha",
        "wayanad": "Wayanad", "വയനാട്": "Wayanad",
        "thiruvananthapuram": "Thiruvananthapuram", "തിരുവനന്തപുരം": "Thiruvananthapuram",
        "kollam": "Kollam", "കൊല്ലം": "Kollam",
        "thrissur": "Thrissur", "തൃശ്ശൂർ": "Thrissur",
        "kozhikode": "Kozhikode", "കോഴിക്കോട്": "Kozhikode",
        "kannur": "Kannur", "കണ്ണൂർ": "Kannur",
        "kasaragod": "Kasaragod", "കാസർഗോഡ്": "Kasaragod",
        "malappuram": "Malappuram", "മലപ്പുറം": "Malappuram",
        "palakkad": "Palakkad", "പാലക്കാട്": "Palakkad",
        "pathanamthitta": "Pathanamthitta", "പത്തനംതിട്ട": "Pathanamthitta"
    }
    for key, dist in districts.items():
        if key in text_lower:
            extracted["district"] = dist
            break

    # 4. Family Size
    size_match = re.search(r'(\d+)\s*(പേര്|അംഗങ്ങൾ|ആളുകൾ|members|people|family size)', text_lower)
    if size_match:
        try:
            extracted["familySize"] = int(size_match.group(1))
        except ValueError:
            pass

    # 5. Welfare Registration
    if any(w in text_lower for w in ["ക്ഷേമനിധി ഉണ്ട്", "ഉണ്ട്", "കടലാസ് ഉണ്ട്", "കാർഡ് ഉണ്ട്", "yes", "have registration"]):
        extracted["welfareRegistration"] = True
    elif any(w in text_lower for w in ["ക്ഷേമനിധി ഇല്ല", "ഇല്ല", "no", "don't have"]):
        extracted["welfareRegistration"] = False

    # Build updated profile dictionary
    updated_dict = current_profile.model_dump()
    for k, v in extracted.items():
        if v is not None:
            updated_dict[k] = v

    updated_profile = HouseholdProfile(**updated_dict)

    # Build confirmation text in Malayalam & English
    confirm_parts_en = []
    confirm_parts_ml = []
    if "familyType" in extracted:
        confirm_parts_en.append(f"Family type: {extracted['familyType']}")
        confirm_parts_ml.append(f"കുടുംബ തരം: {extracted['familyType']}")
    if "monthlyIncome" in extracted:
        confirm_parts_en.append(f"Income: ₹{extracted['monthlyIncome']}")
        confirm_parts_ml.append(f"വരുമാനം: ₹{extracted['monthlyIncome']}")
    if "district" in extracted:
        confirm_parts_en.append(f"District: {extracted['district']}")
        confirm_parts_ml.append(f"ജില്ല: {extracted['district']}")

    msg_en = f"Extracted details: {', '.join(confirm_parts_en)}" if confirm_parts_en else "Information received. Please review your details."
    msg_ml = f"ലഭിച്ച വിവരങ്ങൾ: {', '.join(confirm_parts_ml)}" if confirm_parts_ml else "വിവരങ്ങൾ ലഭിച്ചു. ദയവായി വിവരങ്ങൾ പരിശോധിക്കുക."

    return VoiceExtractResponse(
        extracted_fields=extracted,
        updated_profile=updated_profile,
        confirmation_message_en=msg_en,
        confirmation_message_ml=msg_ml
    )


def generate_simple_explanation(scheme_name: str, status: str, matched_rules: list, missing_fields: list, lang: str = "ml") -> str:
    """
    Generates plain-language explanation for screening results.
    Does NOT determine eligibility. Formats rules engine outputs into accessible text.
    """
    if status == "POTENTIALLY_ELIGIBLE":
        if lang == "ml":
            reasons = " ".join([f"✓ {r}" for r in matched_rules])
            return f"ഈ പദ്ധതിക്കായി നിങ്ങൾ നൽകിയ വിവരങ്ങൾ താഴെ പറയുന്ന മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു: {reasons}"
        else:
            reasons = " ".join([f"✓ {r}" for r in matched_rules])
            return f"You potentially qualify because your profile matches all conditions: {reasons}"
    elif status == "MORE_INFORMATION_NEEDED":
        missing_str = ", ".join(missing_fields)
        if lang == "ml":
            return f"കൂടുതൽ വിവരങ്ങൾ ലഭ്യമായാൽ മാത്രമേ ഈ പദ്ധതി പരിശോധിച്ച് ഉറപ്പുവരുത്താൻ കഴിയൂ. (വിവരങ്ങൾ ആവശ്യമുള്ളവ: {missing_str})"
        else:
            return f"More information is needed before evaluating this scheme. (Missing: {missing_str})"
    else:
        if lang == "ml":
            return "നൽകിയ വിവരങ്ങളിൽ ചില വ്യവസ്ഥകൾ ഈ പദ്ധതിയുടെ നിയമങ്ങളുമായി പൊരുത്തപ്പെടുന്നില്ല."
        else:
            return "Based on supplied information, one or more screening conditions were not matched."
