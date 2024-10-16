import { createContext, useEffect, useState } from 'react';
import { PatientContextValue } from '../../interfaces/Patient/PatientContextValue.interface';
import { Props } from '../../interfaces/props/props.interface';
import {
  CreatePatient,
  Patient,
  UpdatePatient,
} from '../../interfaces/Patient/patient.interface';
import {
  createPatientRequest,
  deletePatientRequest,
  getAllPatientsRequest,
  getPatientRequest,
  updatePatientRequest,
  updatePatientStateRequest,
} from '../../api/patient';

export const PatientContext = createContext<PatientContextValue>({
  patient: [],
  loading: true,
  error: null,
  getPatient: async () => {
    throw new Error('getPatient() not implemented');
  },
  createPatient: async () => {
    throw new Error('createPatient() not implemented');
  },
  updatePatient: async () => {
    throw new Error('updatePatient() not implemented');
  },
  deletePatient: async () => {
    throw new Error('deletePatient() not implemented');
  },
  updatePatientState: async () => {
    throw new Error('updatePatientState() not implemented');
  },
});

export const PatientProvider: React.FC<Props> = ({ children }) => {
  const [patient, setPatient] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatientsRequest();
        // Convertir birth_date a Date
        const patientsData: Patient[] = data.map((p: any) => ({
          ...p,
          birth_date: new Date(p.birth_date),
        }));
        setPatient(patientsData);
      } catch (err) {
        setError('Error fetching all patients');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const getPatient = async (id: number): Promise<Patient> => {
    try {
      const patient = await getPatientRequest(id);
      return patient;
    } catch (err: any) {
      console.error('Error getting patient:', err);
      throw err;
    }
  };

  const createPatient = async (
    patient: CreatePatient,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await createPatientRequest(patient);
      setPatient((prevPatient) => [...prevPatient, response]);
      return { success: true, message: 'Paciente creado exitosamente' };
    } catch (err: any) {
      console.error('Error creating patient:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el paciente',
      };
    }
  };

  // Función para actualizar un rol
  const updatePatient = async (
    id: number,
    patient: UpdatePatient,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updatePatientRequest(id, patient);

      // Verifica si el statusCode es 200
      if (response.statusCode === 200) {
        setPatient((prevPatient) =>
          prevPatient.map((p) => (p.id === id ? { ...p, ...patient } : p)),
        );
        return {
          success: true,
          message: response.message || 'Paciente actualizado exitosamente',
        };
      } else {
        // Lanza un error si el statusCode no es 200
        throw new Error(response.message || 'Error al actualizar paciente');
      }
    } catch (err: any) {
      console.error('Error updating patient:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar paciente',
      };
    }
  };

  // Función para actualizar el estado de un rol
  const updatePatientState = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updatePatientStateRequest(id);
      if (response.statusCode === 200) {
        setPatient((prevPatient) =>
          prevPatient.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive } : p,
          ),
        );
        return {
          success: true,
          message:
            response.message || 'Estado del paciente actualizado exitosamente',
        };
      } else {
        throw new Error(
          response.message || 'Error al actualizar el estado del paciente',
        );
      }
    } catch (err: any) {
      console.error('Error updating patient state:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar el estado del paciente',
      };
    }
  };

  const deletePatient = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      await deletePatientRequest(id);
      setPatient((prevPatient) => prevPatient.filter((p) => p.id !== id)); // Eliminar el rol del estado
      return { success: true, message: 'Paciente eliminado exitosamente' };
    } catch (err: any) {
      console.error('Error deleting patient:', err);
      return {
        success: false,
        message: err.message || 'Error al eliminar el patient',
      };
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patient,
        loading,
        error,
        getPatient,
        createPatient,
        updatePatient,
        updatePatientState,
        deletePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
