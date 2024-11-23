export interface VitalSigns {
  blood_pressure: string;
  heart_rate: number;
  respiratory_rate: number;
  temperature: number;
  weight: number;
}

export interface Symptom {
  symptom_id: number;
  symptom_name?: string;
  intensity: number;
}

export interface CreateDiagnosis {
  vital_signs: VitalSigns;
  symptoms: Symptom[];
}

export interface Diagnosis {
  id: number;
  symptoms: Symptom[];
  vital_signs: VitalSigns;
  groups: Array<{
    disease_group: {
      id: number;
      name: string;
      cie_codes: string[];
    };
    probability_level: number;
  }>;
  created_at: string;
}
