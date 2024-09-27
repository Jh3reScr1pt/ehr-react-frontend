import {
  CreatePersonal,
  UpdatePersonal,
} from '../interfaces/Personal/personal.interface';
import { API_URL } from './api';

const API_URL_PERSONAL = `${API_URL}/personal`;

// Función para crear un rol
export const createPersonalRequest = async (personal: CreatePersonal) => {
  try {
    const response = await fetch(`${API_URL_PERSONAL}`, {
      method: 'POST',
      body: JSON.stringify(personal),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw an error with the status and message from the API
      throw {
        status: response.status,
        message: data.message || 'Error al crear el personal',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createRoleRequest:', error);
    throw error;
  }
};
// Función para obtener roles
export const getAllPersonalRequest = async () => {
  try {
    const response = await fetch(`${API_URL_PERSONAL}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener los personales');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getAllPersonalRequest:', error);
    throw error;
  }
};
// Función para un rol
export const getPersonalRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PERSONAL}/find/${id}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener el personal');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getPersonalRequest:', error);
    throw error;
  }
};
export const deletePersonalRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PERSONAL}/${id}`, {
      method: 'DELETE',
    });

    // Si la respuesta es 204, no hay contenido que procesar
    if (response.status === 204) {
      return {
        status: 204,
        message: 'Personal deleted successfully',
      };
    }

    // Si la respuesta no es 204, asumimos que hay un error o un cuerpo con más información
    const data = await response.json();

    // Chequear si la respuesta tiene un error
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al eliminar personal',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en deletePersonalRequest:', error);
    throw error;
  }
};
// Función para editar un rol
export const updatePersonalRequest = async (
  id: number,
  personal: UpdatePersonal,
) => {
  try {
    const response = await fetch(`${API_URL_PERSONAL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(personal),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      // Throw an error with the status and message from the API
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar personal',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updatePersonalRequest:', error);
    throw error;
  }
};
// Función para actualizar estado de un rol
export const updatePersonalStateRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_PERSONAL}/state/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar el estado del personal',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updatePersonalStateRequest:', error);
    throw error;
  }
};
