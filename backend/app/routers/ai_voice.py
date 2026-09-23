from fastapi import APIRouter
from app.schemas import VoiceExtractRequest, VoiceExtractResponse
from app.ai_service import extract_household_information, generate_simple_explanation

router = APIRouter(prefix="/ai", tags=["ai_voice"])

@router.post("/extract-profile", response_model=VoiceExtractResponse)
def extract_profile_from_voice_text(payload: VoiceExtractRequest):
    return extract_household_information(payload.user_input, payload.current_profile)

@router.post("/explain")
def explain_scheme_result(scheme_name: str, status: str, matched_rules: list, missing_fields: list, language: str = "ml"):
    explanation = generate_simple_explanation(scheme_name, status, matched_rules, missing_fields, lang=language)
    return {"explanation": explanation, "language": language}
