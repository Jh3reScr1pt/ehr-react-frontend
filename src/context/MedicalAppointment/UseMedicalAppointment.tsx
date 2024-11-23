import { useContext } from 'react';
import { MedicalAppointmentContext } from './MedicalAppointmentContext';

export const useMedicalAppointments = () => {
  const context = useContext(MedicalAppointmentContext);
  if (!context)
    throw new Error(
      'useMedicalAppointments must be used within a MedicalaAppointmentProvider',
    );
  return context;
};
