import { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisContext';

export const useDiagnoses = () => {
  const context = useContext(DiagnosisContext);
  if (!context) throw new Error('useDiagnoses debe usarse dentro de DiagnosisProvider');
  return context;
};
