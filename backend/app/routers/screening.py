import uuid
from typing import Dict
from fastapi import APIRouter, HTTPException
from app.schemas import HouseholdProfile, ScreeningResultOverview
from app.seed_data import DEMO_SCHEMES
from app.rules_engine import evaluate_all_schemes

router = APIRouter(prefix="/screening", tags=["screening"])

# In-memory session store for demo screening sessions
SESSION_STORE: Dict[str, HouseholdProfile] = {}

@router.post("/start")
def start_screening(family_type: str = "fishing", language: str = "ml"):
    session_id = str(uuid.uuid4())
    profile = HouseholdProfile(familyType=family_type, language=language)
    SESSION_STORE[session_id] = profile
    return {"sessionId": session_id, "profile": profile}

@router.post("/profile/{session_id}")
def update_profile(session_id: str, profile: HouseholdProfile):
    SESSION_STORE[session_id] = profile
    return {"sessionId": session_id, "profile": profile}

@router.post("/check", response_model=ScreeningResultOverview)
def check_eligibility(profile: HouseholdProfile):
    session_id = str(uuid.uuid4())
    SESSION_STORE[session_id] = profile

    results = evaluate_all_schemes(DEMO_SCHEMES, profile)

    eligible_count = sum(1 for r in results if r.status == "POTENTIALLY_ELIGIBLE")
    more_info_count = sum(1 for r in results if r.status == "MORE_INFORMATION_NEEDED")
    not_matched_count = sum(1 for r in results if r.status == "NOT_MATCHED")

    # Combine unique required documents for potentially eligible schemes
    doc_set_en = set()
    doc_set_ml = set()
    for r in results:
        if r.status in ["POTENTIALLY_ELIGIBLE", "MORE_INFORMATION_NEEDED"]:
            for doc in r.requiredDocuments:
                doc_set_en.add(doc)
            for doc in r.requiredDocuments_ml:
                doc_set_ml.add(doc)

    return ScreeningResultOverview(
        sessionId=session_id,
        profile=profile,
        totalSchemesScreened=len(results),
        potentiallyEligibleCount=eligible_count,
        moreInfoNeededCount=more_info_count,
        notMatchedCount=not_matched_count,
        results=results,
        combinedDocuments=sorted(list(doc_set_en)),
        combinedDocuments_ml=sorted(list(doc_set_ml))
    )
