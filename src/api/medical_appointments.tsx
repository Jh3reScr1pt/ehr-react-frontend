import {
  CreateMedicalAppointment,
  UpdateMedicalAppointment,
} from '../interfaces/Appointment/medical_appointment.inteface';
import { API_URL } from './api';

const API_URL_MEDICAL_APPOINTMENTS = `${API_URL}/medical-appointments`;

export const createMedicalAppointmentRequest = async (
  medicalAppointments: CreateMedicalAppointment,
) => {
  try {
    const response = await fetch(`${API_URL_MEDICAL_APPOINTMENTS}`, {
      method: 'POST',
      body: JSON.stringify(medicalAppointments),
      headers: {
        'Content-Type': 'application/json',
        //authorization: 'xyz123'
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al crear la cita médica',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createMedicalAppointmentRequest:', error);
    throw error;
  }
};

export const getAllMedicalAppointmentsRequest = async () => {
  try {
    const response = await fetch(`${API_URL_MEDICAL_APPOINTMENTS}`);

    if (!response.ok) {
      throw new Error('Error al obtener las citas médicas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getAllMedicalAppointmentsRequest:', error);
    throw error;
  }
};

export const getMedicalAppointmentRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_MEDICAL_APPOINTMENTS}/find/${id}`);

    if (!response.ok) {
      throw new Error('Error al obtener la cita médica');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getMedicalAppointmentRequest:', error);
    throw error;
  }
};
export const deleteMedicalAppointmentRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_MEDICAL_APPOINTMENTS}/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      return {
        status: 204,
        message: 'Medical appointment deleted successfully',
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al eliminar la cita médica',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en deleteMedicalAppointmentRequest:', error);
    throw error;
  }
};

export const updateMedicalAppointmentRequest = async (
  id: number,
  medicalAppointment: UpdateMedicalAppointment,
) => {
  try {
    const response = await fetch(`${API_URL_MEDICAL_APPOINTMENTS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(medicalAppointment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar la cita médica',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updateMedicalAppointmentRequest:', error);
    throw error;
  }
};

export const updateMedicalAppointmentStateRequest = async (id: number) => {
  try {
    const response = await fetch(
      `${API_URL_MEDICAL_APPOINTMENTS}/state/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message:
          data.message || 'Error al actualizar el estado de la cita médica',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updateMedicalAppointmentStateRequest:', error);
    throw error;
  }
};
