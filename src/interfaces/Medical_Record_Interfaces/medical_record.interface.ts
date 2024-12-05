export interface MedicalRecord {
  id: number;
  code?: string; // Código opcional para identificar la historia clínica
  patientId: number; // Relación con el paciente
  reason?: string; // Motivo de consulta
  symptomsInformation?: string; // Información de los síntomas en formato "sintoma-severidad"
  vitalSignsInformation?: string; // Información de los signos vitales en formato "signo-valor"
  finalDiagnosis?: string; // Diagnóstico final (texto libre ingresado por el médico)
  isActive?: boolean; // Estado del registro (activo/inactivo)
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecordInfo {
  medicalRecordId: number;
  code: string;
  reason: string;
  finalDiagnosis: string;
  symptoms: {
    symptom: string;
    severity: string;
  }[];
  vitalSigns: {
    sign: string;
    value: string;
  }[];
  patient: {
    id: number;
    fullName: string;
    ci: string;
    phone_number: string;
    address: string;
    age: number;
    birth_date: string;
  };
  treatments: {
    id: number;
    medication: string;
    notes: string;
  }[];
  presumptiveDiagnosis: {
    id: number;
    probability: string;
    diseaseGroup: {
      name: string;
      diseases: {
        name: string;
        codeCie: string;
      }[];
    };
  }[];
}

export type CreateMedicalRecord = Omit<
  MedicalRecord,
  'id' | 'createdAt' | 'updatedAt'
>;
