from typing import List, Optional
from fastapi import APIRouter, Query
from app.schemas import ApplicationCentre
from app.seed_data import DEMO_CENTRES

router = APIRouter(prefix="/centres", tags=["centres"])

@router.get("", response_model=List[ApplicationCentre])
def get_centres(district: Optional[str] = Query(None, description="Filter centres by district")):
    if district:
        return [c for c in DEMO_CENTRES if c.district.lower() == district.lower()]
    return DEMO_CENTRES
