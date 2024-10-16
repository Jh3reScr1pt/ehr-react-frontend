import {
  CreatePatient,
  UpdatePatient,
} from '../interfaces/Patient/patient.interface';
import { API_URL } from './api';

const API_URL_PATIENTS = `${API_URL}/patients`;

// Función para crear un rol
export const createPatientRequest = async (patient: CreatePatient) => {
  try {
    const response = await fetch(`${API_URL_PATIENTS}`, {
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al registrar el paciente',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createRoleRequest:', error);
    throw error;
  }
};
// Función para obtener roles
export const getAllPatientsRequest = async () => {
  try {
    const response = await fetch(`${API_URL_PATIENTS}`);
    if (!response.ok) {
      throw new Error('Error al obtener los pacientes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllPatientsRequest:', error);
    throw error;
  }
};

export const getPatientRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PATIENTS}/find/${id}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener el paciente');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getPatientRequest:', error);
    throw error;
  }
};
export const deletePatientRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PATIENTS}/${id}`, {
      method: 'DELETE',
    });

    // Si la respuesta es 204, no hay contenido que procesar
    if (response.status === 204) {
      return {
        status: 204,
        message: 'Patient deleted successfully',
      };
    }

    // Si la respuesta no es 204, asumimos que hay un error o un cuerpo con más información
    const data = await response.json();

    // Chequear si la respuesta tiene un error
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al eliminar paciente',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en deletePatientRequest:', error);
    throw error;
  }
};

export const updatePatientRequest = async (
  id: number,
  personal: UpdatePatient,
) => {
  try {
    const response = await fetch(`${API_URL_PATIENTS}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(personal),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar paciente',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updatePatientRequest:', error);
    throw error;
  }
};
export const updatePatientStateRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PATIENTS}/state/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar el estado del paciente',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updatePatientStateRequest:', error);
    throw error;
  }
};