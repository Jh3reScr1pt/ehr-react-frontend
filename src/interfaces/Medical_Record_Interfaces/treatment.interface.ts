export interface Treatment {
  id: number;
  medicalRecordId: number; // Relación con la historia clínica
  medication: string; // Nombre del medicamento
  notes?: string; // Notas adicionales sobre el tratamiento
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTreatment = Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>;
