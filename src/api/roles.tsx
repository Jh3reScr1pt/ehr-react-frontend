import { CreateRole, UpdateRole } from '../interfaces/roles.interface';
import { API_URL } from './api';

const API_URL_ROLES = `${API_URL}/roles`;

// Función para crear un rol
export const createRoleRequest = async (role: CreateRole) => {
  try {
    const response = await fetch(`${API_URL_ROLES}`, {
      method: 'POST',
      body: JSON.stringify(role),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw an error with the status and message from the API
      throw {
        status: response.status,
        message: data.message || 'Error al crear el rol',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createRoleRequest:', error);
    throw error;
  }
};

// Función para obtener roles
export const getRolesRequest = async () => {
  try {
    const response = await fetch(`${API_URL_ROLES}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener los roles');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getRoleRequest:', error);
    throw error;
  }
};

export const getRoleRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_ROLES}/find/${id}`);

    // Chequear si la respuesta es válida
    if (!response.ok) {
      throw new Error('Error al obtener el rol');
    }

    // Convertir la respuesta en JSON
    return await response.json();
  } catch (error) {
    console.error('Error en getRoleRequest:', error);
    throw error;
  }
};

export const deleteRoleRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_URL_ROLES}/${id}`, {
      method: 'DELETE',
    });

    // Si la respuesta es 204, no hay contenido que procesar
    if (response.status === 204) {
      return {
        status: 204,
        message: 'Role deleted successfully',
      };
    }

    // Si la respuesta no es 204, asumimos que hay un error o un cuerpo con más información
    const data = await response.json();

    // Chequear si la respuesta tiene un error
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al eliminar el rol',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en deleteRoleRequest:', error);
    throw error;
  }
};

export const updateRoleRequest = async (id: number, role: UpdateRole) => {
  try {
    const response = await fetch(`${API_URL_ROLES}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(role),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      // Throw an error with the status and message from the API
      throw {
        status: response.status,
        message: data.message || 'Error al actualizar el rol',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en updateRoleRequest:', error);
    throw error;
  }
};
