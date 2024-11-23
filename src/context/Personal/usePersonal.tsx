import { useContext } from 'react';
import { PersonalContext } from './PersonalContext';

export const usePersonal = () => {
  const context = useContext(PersonalContext);
  if (!context)
    throw new Error('usePersonal must be used within a RoleProvider');
  return context;
};
