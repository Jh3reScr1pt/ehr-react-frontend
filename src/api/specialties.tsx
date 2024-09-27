import {
  CreateSpecialty,
  UpdateSpecialty,
} from '../interfaces/Specialty/specialties.interface';
import { API_URL } from './api';

const API_URL_SPECIALTIES = `${API_URL}/specialties`;

// Función para crear una especialidad
export const createSpecialtyRequest = async (specialty: CreateSpecialty) => {
  try {
    const response = await fetch(`${API_URL_SPECIALTIES}`, {
      method: 'POST',
      body: JSON.stringify(specialty),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw an error with the status and message from the API
      throw {
        status: response.status,
        message: data.message || 'Error al crear la especialidad',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createSpecialtyRequest:', error);
    throw error;
  }
};
// Función para obtener especialidades
export const getSpecialtiesRequest = async () => {
  try {
    const response = await fetch(`${API_URL_SPECIALTIES}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener las especialidades');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getSpecialtiesRequest:', error);
    throw error;
  }
};
// Función para una especialidad
export const getSpecialtyRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_SPECIALTIES}/find/${id}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener la especialidad');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getSpecialtyRequest:', error);
    throw error;
  }
};
export const deleteSpecialtyRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_SPECIALTIES}/${id}`, {
      method: 'DELETE',
    });

    // Si la respuesta es 204, no hay contenido que procesar
    if (response.status === 204) {
      return {
        status: 204,
        message: 'Specialty deleted successfully',
      };
    }

    // Si la respuesta no es 204, asumimos que hay un error o un cuerpo con más información
    const data = await response.json();

    // Chequear si la respuesta tiene un error
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al eliminar la especialidad',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en deleteSpecialtyRequest:', error);
    throw error;
  }
};
// Función para editar un rol
export const updateSpecialtyRequest = async (
  id: number,
  specialty: UpdateSpecialty,
) => {
  try {
    const response = await fetch(`${API_URL_SPECIALTIES}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(specialty),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      // Throw an error with the status and message from the API
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar la especialidad',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updateSpecialtyRequest:', error);
    throw error;
  }
};
// Función para actualizar estado de un rol
export const updateSpecialtyStateRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_SPECIALTIES}/state/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message:
          data.message || 'Error al actualizar el estado de la especialidad',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updateSpecialtyStateRequest:', error);
    throw error;
  }
};
