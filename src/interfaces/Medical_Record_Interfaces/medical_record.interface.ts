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

export type CreateMedicalRecord = Omit<
  MedicalRecord,
  'id' | 'createdAt' | 'updatedAt'
>;
