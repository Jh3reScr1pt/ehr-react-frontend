import { createContext, useEffect, useState } from 'react';
import { SpecialtyContextValue } from '../../interfaces/Specialty/SpecialtyContextValue.interface';
import { Props } from '../../interfaces/props/props.interface';
import {
  CreateSpecialty,
  Specialty,
  UpdateSpecialty,
} from '../../interfaces/Specialty/specialties.interface';
import {
  createSpecialtyRequest,
  deleteSpecialtyRequest,
  getSpecialtiesRequest,
  getSpecialtyRequest,
  updateSpecialtyRequest,
  updateSpecialtyStateRequest,
} from '../../api/specialties';

export const SpecialtyContext = createContext<SpecialtyContextValue>({
  specialties: [],
  loading: true,
  error: null,
  getSpecialty: async () => {
    throw new Error('getSpecialty() not implemented');
  },
  createSpecialty: async () => {
    throw new Error('createSpecialty() not implemented');
  },
  updateSpecialty: async () => {
    throw new Error('updateSpecialty() not implemented');
  },
  deleteSpecialty: async () => {
    throw new Error('deleteSpecialty() not implemented');
  },
  updateSpecialtyState: async () => {
    throw new Error('updateSpecialtyState() not implemented');
  },
});

export const SpecialtyProvider: React.FC<Props> = ({ children }) => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar las especialidades al montar el componente
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialtiesRequest();
        setSpecialties(data);
      } catch (err) {
        setError('Error fetching specialties');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Función para obtener una especialidad
  const getSpecialty = async (id: number): Promise<Specialty> => {
    try {
      const specialty = await getSpecialtyRequest(id);
      return specialty;
    } catch (err: any) {
      console.error('Error getting specialty:', err);
      throw err;
    }
  };

  // Función para crear una especialidad
  const createSpecialty = async (
    specialty: CreateSpecialty,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await createSpecialtyRequest(specialty);
      setSpecialties((prevSpecialties) => [...prevSpecialties, response]); // Agregar el nuevo rol al estado
      return { success: true, message: 'Especialidad creada exitosamente' };
    } catch (err: any) {
      console.error('Error creating specialty:', err);
      return {
        success: false,
        message: err.message || 'Error al crear la especialidad',
      };
    }
  };

  // Función para actualizar una especialidad
  const updateSpecialty = async (
    id: number,
    specialty: UpdateSpecialty,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateSpecialtyRequest(id, specialty);

      // Verifica si el statusCode es 200
      if (response.statusCode === 200) {
        setSpecialties((prevSpecialties) =>
          prevSpecialties.map((s) =>
            s.id === id ? { ...s, ...specialties } : s,
          ),
        );
        return {
          success: true,
          message: response.message || 'Especialidad actualizada exitosamente',
        };
      } else {
        // Lanza un error si el statusCode no es 200
        throw new Error(
          response.message || 'Error al actualizar la especialidad',
        );
      }
    } catch (err: any) {
      console.error('Error updating specialty:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar la especialidad',
      };
    }
  };

  // Función para actualizar el estado de una especialidad
  const updateSpecialtyState = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateSpecialtyStateRequest(id);
      if (response.statusCode === 200) {
        setSpecialties((prevSpecialties) =>
          prevSpecialties.map((s) =>
            s.id === id ? { ...s, isActive: !s.isActive } : s,
          ),
        );
        return {
          success: true,
          message:
            response.message ||
            'Estado de la especialidad actualizado exitosamente',
        };
      } else {
        throw new Error(
          response.message ||
            'Error al actualizar el estado de la especialidad',
        );
      }
    } catch (err: any) {
      console.error('Error updating specialty state:', err);
      return {
        success: false,
        message:
          err.message || 'Error al actualizar el estado de la especialidad',
      };
    }
  };

  // Función para eliminar una especialidad
  const deleteSpecialty = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      await deleteSpecialtyRequest(id);
      setSpecialties((prevSpecialties) =>
        prevSpecialties.filter((s) => s.id !== id),
      ); // Eliminar el rol del estado
      return { success: true, message: 'Especialidad eliminada exitosamente' };
    } catch (err: any) {
      console.error('Error deleting specialty:', err);
      return {
        success: false,
        message: err.message || 'Error al eliminar la especialidad',
      };
    }
  };

  return (
    <SpecialtyContext.Provider
      value={{
        specialties,
        loading,
        error,
        getSpecialty,
        createSpecialty,
        updateSpecialty,
        updateSpecialtyState,
        deleteSpecialty,
      }}
    >
      {children}
    </SpecialtyContext.Provider>
  );
};
