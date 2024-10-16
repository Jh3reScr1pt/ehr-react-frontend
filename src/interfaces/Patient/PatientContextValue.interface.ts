import { CreatePatient, Patient, UpdatePatient } from './patient.interface';

export interface PatientContextValue {
  patient: Patient[];
  loading: boolean;
  error: string | null;
  getPatient: (id: number) => Promise<Patient>;
  createPatient: (
    personal: CreatePatient,
  ) => Promise<{ success: boolean; message: string }>;
  updatePatient: (
    id: number,
    role: UpdatePatient,
  ) => Promise<{ success: boolean; message: string }>;
  deletePatient: (id: number) => Promise<{ success: boolean; message: string }>;
  updatePatientState: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
}
