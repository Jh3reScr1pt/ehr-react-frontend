export interface SelectPatientProps {
  id?: number;
  disabled?: boolean;
  onChange: (patientId: number) => void;
}
