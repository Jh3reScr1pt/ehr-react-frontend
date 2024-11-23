import { useContext } from 'react';
import { MedicalRecordContext } from './MedicalRecordContext';

export const useMedicalRecord = () => {
  const context = useContext(MedicalRecordContext);
  if (!context) {
    throw new Error(
      'useMedicalRecord debe ser usado dentro de un MedicalRecordProvider',
    );
  }
  return context;
};
