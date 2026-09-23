from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import screening, schemes, centres, ai_voice, admin
from app.schemas import HouseholdProfile
from app.rules_engine import evaluate_all_schemes
from app.seed_data import DEMO_SCHEMES

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="SAHAYA - Welfare Entitlement Assistant for Plantation and Fishing Families API",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers under /api
app.include_router(screening.router, prefix=settings.API_V1_STR)
app.include_router(schemes.router, prefix=settings.API_V1_STR)
app.include_router(centres.router, prefix=settings.API_V1_STR)
app.include_router(ai_voice.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)

# Alias endpoint for eligibility check as requested in spec
@app.post("/api/eligibility/check")
def eligibility_check_alias(profile: HouseholdProfile):
    return screening.check_eligibility(profile)

@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "status": "online",
        "demoMode": True,
        "totalSchemes": len(DEMO_SCHEMES),
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
