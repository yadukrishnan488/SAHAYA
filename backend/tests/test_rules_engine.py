import pytest
from app.schemas import HouseholdProfile
from app.seed_data import DEMO_SCHEMES
from app.rules_engine import evaluate_all_schemes, evaluate_scheme

def test_fishing_profile_eligibility():
    profile = HouseholdProfile(
        familyType="fishing",
        occupation="fishing",
        monthlyIncome=18000,
        familySize=4,
        district="Ernakulam",
        welfareRegistration=True,
        occupationDocument=True,
        language="en"
    )
    results = evaluate_all_schemes(DEMO_SCHEMES, profile)
    eligible_ids = [r.schemeId for r in results if r.status == "POTENTIALLY_ELIGIBLE"]

    # Must match Fisher Welfare Support
    assert "DEMO-FISH-001" in eligible_ids
    # Must NOT match Plantation Welfare Pension
    assert "DEMO-PLANT-001" not in eligible_ids

def test_plantation_profile_eligibility():
    profile = HouseholdProfile(
        familyType="plantation",
        occupation="plantation worker",
        monthlyIncome=15000,
        familySize=5,
        district="Kottayam",
        welfareRegistration=True,
        occupationDocument=True,
        language="en"
    )
    results = evaluate_all_schemes(DEMO_SCHEMES, profile)
    eligible_ids = [r.schemeId for r in results if r.status == "POTENTIALLY_ELIGIBLE"]

    # Must match Plantation Pension
    assert "DEMO-PLANT-001" in eligible_ids
    # Must NOT match Fishing Support
    assert "DEMO-FISH-001" not in eligible_ids

def test_missing_information_status():
    profile = HouseholdProfile(
        familyType="fishing",
        occupation="fishing",
        monthlyIncome=18000,
        familySize=4,
        district="Ernakulam",
        welfareRegistration=None,  # Missing
        occupationDocument=True,
        language="en"
    )
    results = evaluate_all_schemes(DEMO_SCHEMES, profile)
    fish_001 = next(r for r in results if r.schemeId == "DEMO-FISH-001")
    assert fish_001.status == "MORE_INFORMATION_NEEDED"
    assert "welfareRegistration" in fish_001.missingFields
