export interface Rule {
  field: string;
  operator: string;
  value: any;
  description_en: string;
  description_ml: string;
}

export interface HouseholdProfile {
  familyType?: "fishing" | "plantation" | "other" | string;
  occupation?: "fishing" | "plantation worker" | "other" | string;
  monthlyIncome?: number;
  familySize?: number;
  district?: string;
  welfareRegistration?: boolean | null;
  occupationDocument?: boolean | null;
  language: "ml" | "en";
}

export interface Scheme {
  id: string;
  name: string;
  name_ml: string;
  description: string;
  description_ml: string;
  targetGroup: string;
  eligibilityRules: Rule[];
  requiredDocuments: string[];
  requiredDocuments_ml: string[];
  applicationMethod: string;
  applicationMethod_ml: string;
  applicationLocation: string;
  applicationLocation_ml: string;
  source: string;
  status: string;
  isDemo: boolean;
}

export interface FailedRuleDetail {
  field: string;
  field_label_en: string;
  field_label_ml: string;
  provided: any;
  required: any;
}

export interface ScreeningSchemeResult {
  schemeId: string;
  name: string;
  name_ml: string;
  description: string;
  description_ml: string;
  targetGroup: string;
  status: "POTENTIALLY_ELIGIBLE" | "MORE_INFORMATION_NEEDED" | "NOT_MATCHED";
  matchedRules: string[];
  matchedRules_ml: string[];
  missingFields: string[];
  failedRules: FailedRuleDetail[];
  requiredDocuments: string[];
  requiredDocuments_ml: string[];
  applicationMethod: string;
  applicationMethod_ml: string;
  applicationLocation: string;
  applicationLocation_ml: string;
  whyExplanation_en: string;
  whyExplanation_ml: string;
  isDemo: boolean;
}

export interface ScreeningResultOverview {
  sessionId: string;
  profile: HouseholdProfile;
  totalSchemesScreened: number;
  potentiallyEligibleCount: number;
  moreInfoNeededCount: number;
  notMatchedCount: number;
  results: ScreeningSchemeResult[];
  combinedDocuments: string[];
  combinedDocuments_ml: string[];
}

export interface ApplicationCentre {
  id: string;
  name: string;
  name_ml: string;
  district: string;
  address: string;
  address_ml: string;
  services: string[];
  services_ml: string[];
  openingHours: string;
  openingHours_ml: string;
  latitude: number;
  longitude: number;
  phone: string;
  isDemo: boolean;
}

export interface TestProfileRunResult {
  profileId: string;
  profileName: string;
  status: "PASS" | "FAIL";
  matchedCount: number;
  expectedMatches: string[];
  actualMatches: string[];
  details: string;
}
