import { CreateDiagnosis } from '../../interfaces/Fuzzy_Service/diagnoses.interface';
import { API_FUZZY_LOGIC_URL } from './api';

const API_URL_DIAGNOSES = `${API_FUZZY_LOGIC_URL}/diagnoses/`;

// Crear un diagnóstico
export const createDiagnosisRequest = async (diagnosis: CreateDiagnosis) => {
  try {
    const response = await fetch(`${API_URL_DIAGNOSES}`, {
      method: 'POST',
      body: JSON.stringify(diagnosis),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'xyz123',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al crear el diagnóstico',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createDiagnosisRequest:', error);
    throw error;
  }
};

// Obtener todos los síntomas
export const getSymptomsRequest = async () => {
  try {
    const response = await fetch(`${API_FUZZY_LOGIC_URL}/symptoms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'xyz123',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener los síntomas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getSymptomsRequest:', error);
    throw error;
  }
};
