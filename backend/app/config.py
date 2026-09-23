import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "SAHAYA – Welfare Entitlement Assistant"
    API_V1_STR: str = "/api"
    # Local fallback sqlite or PostgreSQL URL
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sahaya.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    IS_DEMO_MODE: bool = True

settings = Settings()
