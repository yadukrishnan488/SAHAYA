from typing import List, Dict, Any, Tuple, Optional
from app.schemas import HouseholdProfile, Scheme, Rule, ScreeningSchemeResult, FailedRuleDetail

FIELD_LABELS = {
    "familyType": {"en": "Family Type", "ml": "കുടുംബ തരം"},
    "occupation": {"en": "Main Occupation", "ml": "പ്രധാന തൊഴിൽ"},
    "monthlyIncome": {"en": "Monthly Income", "ml": "മാസവരുമാനം"},
    "familySize": {"en": "Family Size", "ml": "അംഗങ്ങളുടെ എണ്ണം"},
    "district": {"en": "District", "ml": "ജില്ല"},
    "welfareRegistration": {"en": "Welfare Registration", "ml": "ക്ഷേമനിധി രജിസ്ട്രേഷൻ"},
    "occupationDocument": {"en": "Worker Documentation", "ml": "തൊഴിൽ കാർഡ്/രേഖകൾ"}
}

def evaluate_rule(rule: Rule, profile: HouseholdProfile) -> Tuple[str, Optional[str], Optional[Dict]]:
    """
    Evaluates a single rule against household profile.
    Returns: (status, reason_text, failure_detail)
    status: 'MATCH', 'MISSING', 'FAIL'
    """
    field_name = rule.field
    val = getattr(profile, field_name, None)

    if val is None:
        return "MISSING", None, None

    op = rule.operator
    target_val = rule.value

    matched = False
    if op == "equals":
        if isinstance(val, str) and isinstance(target_val, str):
            matched = (val.strip().lower() == target_val.strip().lower())
        else:
            matched = (val == target_val)
    elif op == "in":
        if isinstance(target_val, list):
            target_list_lower = [str(x).strip().lower() for x in target_val]
            matched = str(val).strip().lower() in target_list_lower
    elif op == "less_than_or_equal":
        try:
            matched = float(val) <= float(target_val)
        except (ValueError, TypeError):
            matched = False
    elif op == "greater_than_or_equal":
        try:
            matched = float(val) >= float(target_val)
        except (ValueError, TypeError):
            matched = False
    elif op == "boolean_match":
        matched = bool(val) == bool(target_val)
    else:
        # Default fallback to equality check
        matched = (val == target_val)

    if matched:
        return "MATCH", rule.description_en, None
    else:
        field_info = FIELD_LABELS.get(field_name, {"en": field_name, "ml": field_name})
        failure_detail = {
            "field": field_name,
            "field_label_en": field_info["en"],
            "field_label_ml": field_info["ml"],
            "provided": val,
            "required": target_val
        }
        return "FAIL", None, failure_detail


def evaluate_scheme(scheme: Scheme, profile: HouseholdProfile) -> ScreeningSchemeResult:
    """
    Evaluates a scheme using deterministic rules engine.
    - IF all rules match -> POTENTIALLY_ELIGIBLE
    - IF one or more rules fail -> NOT_MATCHED
    - IF no rules failed, but one or more fields are missing -> MORE_INFORMATION_NEEDED
    """
    matched_rules_en: List[str] = []
    matched_rules_ml: List[str] = []
    missing_fields: List[str] = []
    failed_rules: List[FailedRuleDetail] = []

    for rule in scheme.eligibilityRules:
        status, _, fail_detail = evaluate_rule(rule, profile)
        if status == "MATCH":
            matched_rules_en.append(rule.description_en)
            matched_rules_ml.append(rule.description_ml)
        elif status == "MISSING":
            if rule.field not in missing_fields:
                missing_fields.append(rule.field)
        elif status == "FAIL":
            if fail_detail:
                failed_rules.append(FailedRuleDetail(**fail_detail))

    if len(failed_rules) > 0:
        scheme_status = "NOT_MATCHED"
        why_en = "Your provided information does not match one or more eligibility rules."
        why_ml = "നൽകിയ വിവരങ്ങൾ ചില യോഗ്യതാ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നില്ല."
    elif len(missing_fields) > 0:
        scheme_status = "MORE_INFORMATION_NEEDED"
        why_en = f"More information is needed for screening ({', '.join(missing_fields)})."
        why_ml = "കൂടുതൽ വിവരങ്ങൾ നൽകിയാൽ മാത്രമേ ഇതിന്റെ യോഗ്യത പരിശോധിക്കാൻ കഴിയൂ."
    else:
        scheme_status = "POTENTIALLY_ELIGIBLE"
        why_en = "Your household information matches all screening conditions for this scheme."
        why_ml = "നിങ്ങൾ നൽകിയ വിവരങ്ങൾ ഈ പദ്ധതിയുടെ എല്ലാ യോഗ്യതാ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു."

    return ScreeningSchemeResult(
        schemeId=scheme.id,
        name=scheme.name,
        name_ml=scheme.name_ml,
        description=scheme.description,
        description_ml=scheme.description_ml,
        targetGroup=scheme.targetGroup,
        status=scheme_status,
        matchedRules=matched_rules_en,
        matchedRules_ml=matched_rules_ml,
        missingFields=missing_fields,
        failedRules=failed_rules,
        requiredDocuments=scheme.requiredDocuments,
        requiredDocuments_ml=scheme.requiredDocuments_ml,
        applicationMethod=scheme.applicationMethod,
        applicationMethod_ml=scheme.applicationMethod_ml,
        applicationLocation=scheme.applicationLocation,
        applicationLocation_ml=scheme.applicationLocation_ml,
        whyExplanation_en=why_en,
        whyExplanation_ml=why_ml,
        isDemo=scheme.isDemo
    )


def evaluate_all_schemes(schemes: List[Scheme], profile: HouseholdProfile) -> List[ScreeningSchemeResult]:
    """
    Runs deterministic evaluation across all available schemes.
    """
    return [evaluate_scheme(scheme, profile) for scheme in schemes]
