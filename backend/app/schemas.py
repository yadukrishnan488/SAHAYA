from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

class Rule(BaseModel):
    field: str
    operator: str  # "equals", "in", "less_than_or_equal", "greater_than_or_equal", "boolean_match"
    value: Any
    description_en: str
    description_ml: str

class HouseholdProfile(BaseModel):
    familyType: Optional[str] = None  # "fishing", "plantation", "other"
    occupation: Optional[str] = None  # "fishing", "plantation worker", "other"
    monthlyIncome: Optional[int] = None  # e.g. 8000, 18000, 25000, 35000
    familySize: Optional[int] = None
    district: Optional[str] = None
    welfareRegistration: Optional[bool] = None
    occupationDocument: Optional[bool] = None
    language: str = "ml"  # "ml" or "en"

class Scheme(BaseModel):
    id: str
    name: str
    name_ml: str
    description: str
    description_ml: str
    targetGroup: str  # "fishing", "plantation", "both"
    eligibilityRules: List[Rule]
    requiredDocuments: List[str]
    requiredDocuments_ml: List[str]
    applicationMethod: str
    applicationMethod_ml: str
    applicationLocation: str
    applicationLocation_ml: str
    source: str = "Demo Rules Engine"
    status: str = "active"
    isDemo: bool = True

class FailedRuleDetail(BaseModel):
    field: str
    field_label_en: str
    field_label_ml: str
    provided: Any
    required: Any

class ScreeningSchemeResult(BaseModel):
    schemeId: str
    name: str
    name_ml: str
    description: str
    description_ml: str
    targetGroup: str
    status: str  # "POTENTIALLY_ELIGIBLE", "MORE_INFORMATION_NEEDED", "NOT_MATCHED"
    matchedRules: List[str]
    matchedRules_ml: List[str]
    missingFields: List[str]
    failedRules: List[FailedRuleDetail]
    requiredDocuments: List[str]
    requiredDocuments_ml: List[str]
    applicationMethod: str
    applicationMethod_ml: str
    applicationLocation: str
    applicationLocation_ml: str
    whyExplanation_en: str
    whyExplanation_ml: str
    isDemo: bool = True

class ScreeningResultOverview(BaseModel):
    sessionId: str
    profile: HouseholdProfile
    totalSchemesScreened: int
    potentiallyEligibleCount: int
    moreInfoNeededCount: int
    notMatchedCount: int
    results: List[ScreeningSchemeResult]
    combinedDocuments: List[str]
    combinedDocuments_ml: List[str]

class ApplicationCentre(BaseModel):
    id: str
    name: str
    name_ml: str
    district: str
    address: str
    address_ml: str
    services: List[str]
    services_ml: List[str]
    openingHours: str
    openingHours_ml: str
    latitude: float
    longitude: float
    phone: str
    isDemo: bool = True

class VoiceTranscribeRequest(BaseModel):
    audio_base64: Optional[str] = None
    transcript_text: Optional[str] = None
    language: str = "ml"

class VoiceExtractRequest(BaseModel):
    user_input: str
    current_profile: HouseholdProfile

class VoiceExtractResponse(BaseModel):
    extracted_fields: Dict[str, Any]
    updated_profile: HouseholdProfile
    confirmation_message_en: str
    confirmation_message_ml: str

class TestProfile(BaseModel):
    id: str
    name: str
    description: str
    profile: HouseholdProfile
    expectedEligibleSchemes: List[str]

class TestProfileRunResult(BaseModel):
    profileId: str
    profileName: str
    status: str  # "PASS" | "FAIL"
    matchedCount: int
    expectedMatches: List[str]
    actualMatches: List[str]
    details: str

class ResourcePackImport(BaseModel):
    schemes: List[Scheme]
    centres: Optional[List[ApplicationCentre]] = None
