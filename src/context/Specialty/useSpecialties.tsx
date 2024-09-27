import { useContext } from 'react';
import { SpecialtyContext } from './SpecialtyContext';

export const useSpecialties = () => {
  const context = useContext(SpecialtyContext);
  if (!context)
    throw new Error('useSpecialties must be used within a SpecialtyProvider');
  return context;
};
