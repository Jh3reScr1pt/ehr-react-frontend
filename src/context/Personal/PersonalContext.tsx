import { createContext, useEffect, useState } from 'react';
import { PersonalContextValue } from '../../interfaces/Personal/PersonalContextValue';
import { Props } from '../../interfaces/props/props.interface';
import {
  CreatePersonal,
  Personal,
  UpdatePersonal,
} from '../../interfaces/Personal/personal.interface';
import {
  createPersonalRequest,
  deletePersonalRequest,
  getAllPersonalRequest,
  getPersonalRequest,
  updatePersonalRequest,
  updatePersonalStateRequest,
} from '../../api/personal';

export const PersonalContext = createContext<PersonalContextValue>({
  personal: [],
  loading: true,
  error: null,
  getPersonal: async () => {
    throw new Error('getPersonal() not implemented');
  },
  createPersonal: async () => {
    throw new Error('createPersonal() not implemented');
  },
  updatePersonal: async () => {
    throw new Error('updatePersonal() not implemented');
  },
  deletePersonal: async () => {
    throw new Error('deletePersonal() not implemented');
  },
  updatePersonalState: async () => {
    throw new Error('updatePersonalState() not implemented');
  },
});

export const PersonalProvider: React.FC<Props> = ({ children }) => {
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar los roles al montar el componente
  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        const data = await getAllPersonalRequest();
        setPersonal(data);
      } catch (err) {
        setError('Error fetching all personal');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonal();
  }, []);

  // Función para obtener un rol
  const getPersonal = async (id: number): Promise<Personal> => {
    try {
      const personal = await getPersonalRequest(id);
      return personal;
    } catch (err: any) {
      console.error('Error getting personal:', err);
      throw err;
    }
  };

  // Función para crear un rol
  const createPersonal = async (
    personal: CreatePersonal,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await createPersonalRequest(personal);
      setPersonal((prevPersonal) => [...prevPersonal, response]); // Agregar el nuevo rol al estado
      return { success: true, message: 'Personal creado exitosamente' };
    } catch (err: any) {
      console.error('Error creating personal:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el personal',
      };
    }
  };

  // Función para actualizar un rol
  const updatePersonal = async (
    id: number,
    personal: UpdatePersonal,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updatePersonalRequest(id, personal);

      // Verifica si el statusCode es 200
      if (response.statusCode === 200) {
        setPersonal((prevPersonal) =>
          prevPersonal.map((p) => (p.id === id ? { ...p, ...personal } : p)),
        );
        return {
          success: true,
          message: response.message || 'Personal actualizado exitosamente',
        };
      } else {
        // Lanza un error si el statusCode no es 200
        throw new Error(response.message || 'Error al actualizar personal');
      }
    } catch (err: any) {
      console.error('Error updating personal:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar personal',
      };
    }
  };

  // Función para actualizar el estado de un rol
  const updatePersonalState = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updatePersonalStateRequest(id);
      if (response.statusCode === 200) {
        setPersonal((prevPersonal) =>
          prevPersonal.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive } : p,
          ),
        );
        return {
          success: true,
          message:
            response.message || 'Estado del personal actualizado exitosamente',
        };
      } else {
        throw new Error(
          response.message || 'Error al actualizar el estado del personal',
        );
      }
    } catch (err: any) {
      console.error('Error updating personal state:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar el estado del personal',
      };
    }
  };

  // Función para eliminar un rol
  const deletePersonal = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      await deletePersonalRequest(id);
      setPersonal((prevPersonal) => prevPersonal.filter((p) => p.id !== id)); // Eliminar el rol del estado
      return { success: true, message: 'Personal eliminado exitosamente' };
    } catch (err: any) {
      console.error('Error deleting personal:', err);
      return {
        success: false,
        message: err.message || 'Error al eliminar el personal',
      };
    }
  };

  return (
    <PersonalContext.Provider
      value={{
        personal,
        loading,
        error,
        getPersonal,
        createPersonal,
        updatePersonal,
        updatePersonalState,
        deletePersonal,
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};
