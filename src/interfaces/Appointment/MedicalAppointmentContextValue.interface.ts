import {
  CreateMedicalAppointment,
  MedicalAppointment,
  UpdateMedicalAppointment,
} from './medical_appointment.inteface';

export interface MedicalAppointmentContextValue {
  medicalAppointment: MedicalAppointment[];
  loading: boolean;
  error: string | null;
  getMedicalAppointment: (id: number) => Promise<MedicalAppointment>;
  createMedicalAppointment: (
    personal: CreateMedicalAppointment,
  ) => Promise<{ success: boolean; message: string }>;
  updateMedicalAppointment: (
    id: number,
    role: UpdateMedicalAppointment,
  ) => Promise<{ success: boolean; message: string }>;
  deleteMedicalAppointment: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
  updateMedicalAppointmentState: (
    id: number,
  ) => Promise<{ success: boolean; message: string }>;
}
