export interface Diagnosis {
  id: number;
  medicalRecordId: number; // Relación con la historia clínica
  diseaseGroupId: number; // Relación con el grupo de enfermedades
  probability: number; // Probabilidad asociada al diagnóstico presuntivo
  createdAt: Date;
  updatedAt: Date;
}

export type CreateDiagnosis = Omit<Diagnosis, 'id' | 'createdAt' | 'updatedAt'>;
