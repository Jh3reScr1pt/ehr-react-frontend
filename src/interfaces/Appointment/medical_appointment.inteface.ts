export interface MedicalAppointment {
  id: number;
  doctorId: number;
  patientId: number;
  date_appointment: Date;
  start_time: string;
  end_time: string;
  doctor?: Doctor;
  patient?: Patient;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Doctor {
  first_name: string;
  first_last_name: string;
}
export interface Patient {
  first_name: string;
  first_last_name: string;
}

export type CreateMedicalAppointment = Omit<
  MedicalAppointment,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateMedicalAppointment = Partial<CreateMedicalAppointment>;
