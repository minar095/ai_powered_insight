
export type View = 'home' | 'patient' | 'doctor';

export interface DoctorProfile {
  name: string;
  specialty: string;
  location: string;
  reasonForMatch: string;
}

export interface ClinicalInsight {
  summary: string;
  differentialDiagnoses: string[];
  suggestedests: string[]; // Note: Gemini schema has a typo, we match it.
  nextSteps: string[];
}
