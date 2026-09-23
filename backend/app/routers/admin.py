from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas import Scheme, ApplicationCentre, TestProfile, TestProfileRunResult, ResourcePackImport
from app.seed_data import DEMO_SCHEMES, DEMO_CENTRES, DEMO_TEST_PROFILES
from app.rules_engine import evaluate_all_schemes

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/metrics")
def get_admin_metrics():
    active_count = sum(1 for s in DEMO_SCHEMES if s.status == "active")
    return {
        "totalSchemes": len(DEMO_SCHEMES),
        "activeSchemes": active_count,
        "householdsScreened": 150,
        "potentialMatches": 83,
        "incompleteScreenings": 24,
        "totalCentres": len(DEMO_CENTRES)
    }

@router.get("/schemes", response_model=List[Scheme])
def get_admin_schemes():
    return DEMO_SCHEMES

@router.post("/schemes", response_model=Scheme)
def add_admin_scheme(scheme: Scheme):
    for i, s in enumerate(DEMO_SCHEMES):
        if s.id == scheme.id:
            DEMO_SCHEMES[i] = scheme
            return scheme
    DEMO_SCHEMES.append(scheme)
    return scheme

@router.get("/test-profiles", response_model=List[TestProfile])
def get_test_profiles():
    return DEMO_TEST_PROFILES

@router.post("/test-profiles/run", response_model=List[TestProfileRunResult])
def run_all_test_profiles():
    results: List[TestProfileRunResult] = []
    for tp in DEMO_TEST_PROFILES:
        evaluated = evaluate_all_schemes(DEMO_SCHEMES, tp.profile)
        actual_eligible = [r.schemeId for r in evaluated if r.status == "POTENTIALLY_ELIGIBLE"]

        # Check if all expected matches are found
        is_pass = all(s_id in actual_eligible for s_id in tp.expectedEligibleSchemes)
        status_str = "PASS" if is_pass else "FAIL"
        details_str = f"Evaluated {len(evaluated)} schemes. Found {len(actual_eligible)} potentially eligible schemes."

        results.append(
            TestProfileRunResult(
                profileId=tp.id,
                profileName=tp.name,
                status=status_str,
                matchedCount=len(actual_eligible),
                expectedMatches=tp.expectedEligibleSchemes,
                actualMatches=actual_eligible,
                details=details_str
            )
        )
    return results

@router.post("/import")
def import_resource_pack(pack: ResourcePackImport):
    imported_schemes_count = 0
    imported_centres_count = 0

    for scheme in pack.schemes:
        existing_idx = next((i for i, s in enumerate(DEMO_SCHEMES) if s.id == scheme.id), None)
        if existing_idx is not None:
            DEMO_SCHEMES[existing_idx] = scheme
        else:
            DEMO_SCHEMES.append(scheme)
        imported_schemes_count += 1

    if pack.centres:
        for centre in pack.centres:
            c_idx = next((i for i, c in enumerate(DEMO_CENTRES) if c.id == centre.id), None)
            if c_idx is not None:
                DEMO_CENTRES[c_idx] = centre
            else:
                DEMO_CENTRES.append(centre)
            imported_centres_count += 1

    return {
        "status": "success",
        "message": f"Successfully imported {imported_schemes_count} schemes and {imported_centres_count} application centres.",
        "importedSchemesCount": imported_schemes_count,
        "importedCentresCount": imported_centres_count
    }
