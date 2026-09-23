from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas import Scheme
from app.seed_data import DEMO_SCHEMES

router = APIRouter(prefix="/schemes", tags=["schemes"])

@router.get("", response_model=List[Scheme])
def get_schemes(target_group: Optional[str] = Query(None, description="Filter by fishing/plantation/both")):
    if target_group:
        return [s for s in DEMO_SCHEMES if s.targetGroup in [target_group, "both"]]
    return DEMO_SCHEMES

@router.get("/{scheme_id}", response_model=Scheme)
def get_scheme_by_id(scheme_id: str):
    for scheme in DEMO_SCHEMES:
        if scheme.id == scheme_id:
            return scheme
    raise HTTPException(status_code=404, detail="Scheme not found")

@router.get("/{scheme_id}/documents")
def get_scheme_documents(scheme_id: str):
    for scheme in DEMO_SCHEMES:
        if scheme.id == scheme_id:
            return {
                "schemeId": scheme.id,
                "name": scheme.name,
                "name_ml": scheme.name_ml,
                "requiredDocuments": scheme.requiredDocuments,
                "requiredDocuments_ml": scheme.requiredDocuments_ml
            }
    raise HTTPException(status_code=404, detail="Scheme not found")
