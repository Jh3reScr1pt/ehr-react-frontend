import { createContext, useEffect, useState } from 'react';
import { Props } from '../../interfaces/props/props.interface';
import { MedicalAppointmentContextValue } from '../../interfaces/Appointment/MedicalAppointmentContextValue.interface';
import {
  CreateMedicalAppointment,
  MedicalAppointment,
  UpdateMedicalAppointment,
} from '../../interfaces/Appointment/medical_appointment.inteface';
import {
  createMedicalAppointmentRequest,
  deleteMedicalAppointmentRequest,
  getAllMedicalAppointmentsRequest,
  getMedicalAppointmentRequest,
  updateMedicalAppointmentRequest,
  updateMedicalAppointmentStateRequest,
} from '../../api/medical_appointments';

export const MedicalAppointmentContext =
  createContext<MedicalAppointmentContextValue>({
    medicalAppointment: [],
    loading: true,
    error: null,
    getMedicalAppointment: async () => {
      throw new Error('getMedicalAppointment() not implemented');
    },
    createMedicalAppointment: async () => {
      throw new Error('createMedicalAppointment() not implemented');
    },
    updateMedicalAppointment: async () => {
      throw new Error('updateMedicalAppointment() not implemented');
    },
    deleteMedicalAppointment: async () => {
      throw new Error('deleteMedicalAppointment() not implemented');
    },
    updateMedicalAppointmentState: async () => {
      throw new Error('updateMedicalAppointmentState() not implemented');
    },
  });

export const MedicalAppointmentProvider: React.FC<Props> = ({ children }) => {
  const [medicalAppointment, setMedicalAppointment] = useState<
    MedicalAppointment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalAppointments = async () => {
      try {
        const data = await getAllMedicalAppointmentsRequest();
        setMedicalAppointment(data);
        console.log(data);
      } catch (err) {
        setError('Error fetching all medical Appointments');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalAppointments();
  }, []);

  const getMedicalAppointment = async (
    id: number,
  ): Promise<MedicalAppointment> => {
    try {
      const appointment = await getMedicalAppointmentRequest(id);
      console.log(appointment);
      return appointment;
    } catch (err: any) {
      console.error('Error getting medical appointment:', err);
      throw err;
    }
  };

  // Función para crear un rol
  const createMedicalAppointment = async (
    medicalAppointment: CreateMedicalAppointment,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response =
        await createMedicalAppointmentRequest(medicalAppointment);
      setMedicalAppointment((prevMedicalAppointment) => [
        ...prevMedicalAppointment,
        response,
      ]);
      return { success: true, message: 'Cita registrada exitosamente' };
    } catch (err: any) {
      console.error('Error creating medical appointment:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el personal',
      };
    }
  };

  const updateMedicalAppointment = async (
    id: number,
    medicalAppointment: UpdateMedicalAppointment,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateMedicalAppointmentRequest(
        id,
        medicalAppointment,
      );

      if (response.statusCode === 200) {
        setMedicalAppointment((prevMedicalAppointment) =>
          prevMedicalAppointment.map((p) =>
            p.id === id ? { ...p, ...medicalAppointment } : p,
          ),
        );
        return {
          success: true,
          message: response.message || 'Cita actualizada exitosamente',
        };
      } else {
        throw new Error(response.message || 'Error al actualizar cita médica');
      }
    } catch (err: any) {
      console.error('Error updating medical appointment:', err);
      return {
        success: false,
        message: err.message || 'Error al actualizar personal',
      };
    }
  };

  const updateMedicalAppointmentState = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateMedicalAppointmentStateRequest(id);
      if (response.statusCode === 200) {
        setMedicalAppointment((prevMedicalAppointment) =>
          prevMedicalAppointment.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive } : p,
          ),
        );
        return {
          success: true,
          message:
            response.message || 'Estado de la cita actualizada exitosamente',
        };
      } else {
        throw new Error(
          response.message || 'Error al actualizar el estado de la cita',
        );
      }
    } catch (err: any) {
      console.error('Error updating medical appointment state:', err);
      return {
        success: false,
        message:
          err.message || 'Error al actualizar el estado de la cita médica',
      };
    }
  };

  const deleteMedicalAppointment = async (
    id: number,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      await deleteMedicalAppointmentRequest(id);
      setMedicalAppointment((prevMedicalAppointment) =>
        prevMedicalAppointment.filter((p) => p.id !== id),
      );
      return { success: true, message: 'Cita eliminada exitosamente' };
    } catch (err: any) {
      console.error('Error deleting appointment:', err);
      return {
        success: false,
        message: err.message || 'Error al eliminar cita',
      };
    }
  };

  return (
    <MedicalAppointmentContext.Provider
      value={{
        medicalAppointment,
        loading,
        error,
        getMedicalAppointment,
        createMedicalAppointment,
        updateMedicalAppointment,
        updateMedicalAppointmentState,
        deleteMedicalAppointment,
      }}
    >
      {children}
    </MedicalAppointmentContext.Provider>
  );
};
