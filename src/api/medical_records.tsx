import { CreateMedicalRecord } from '../interfaces/Medical_Record_Interfaces/medical_record.interface';
import { CreateDiagnosis } from '../interfaces/Medical_Record_Interfaces/diagnosis.interface';
import { CreateDiseaseGroup } from '../interfaces/Medical_Record_Interfaces/disease_group.interface';
import { CreateTreatment } from '../interfaces/Medical_Record_Interfaces/treatment.interface';
import { API_URL } from './api';

// URLs base para cada entidad
const API_URL_MEDICAL_RECORD = `${API_URL}/medical-records`;
const API_URL_DIAGNOSIS = `${API_URL}/diagnosis`;
const API_URL_DISEASE_GROUP = `${API_URL}/diseases-group`;
const API_URL_TREATMENT = `${API_URL}/treatments`;
const API_URL_MEDICAL_RECORDS_PATIENTS = `${API_URL_MEDICAL_RECORD}/medical_records_patients`;

// Crear un registro médico
export const createMedicalRecord = async (
  medicalRecord: CreateMedicalRecord,
) => {
  try {
    const response = await fetch(API_URL_MEDICAL_RECORD, {
      method: 'POST',
      body: JSON.stringify(medicalRecord),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al crear el registro médico',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createMedicalRecord:', error);
    throw error;
  }
};

// Crear un diagnóstico
export const createDiagnosis = async (diagnosis: CreateDiagnosis) => {
  try {
    const response = await fetch(API_URL_DIAGNOSIS, {
      method: 'POST',
      body: JSON.stringify(diagnosis),
      headers: {
        'Content-Type': 'application/json',
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
    console.error('Error en createDiagnosis:', error);
    throw error;
  }
};

// Crear un grupo de enfermedades
export const createDiseaseGroup = async (diseaseGroup: CreateDiseaseGroup) => {
  try {
    const response = await fetch(API_URL_DISEASE_GROUP, {
      method: 'POST',
      body: JSON.stringify(diseaseGroup),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al crear el grupo de enfermedades',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createDiseaseGroup:', error);
    throw error;
  }
};

// Crear un tratamiento
export const createTreatment = async (treatment: CreateTreatment) => {
  try {
    const response = await fetch(API_URL_TREATMENT, {
      method: 'POST',
      body: JSON.stringify(treatment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error al crear el tratamiento',
      };
    }

    return data;
  } catch (error) {
    console.error('Error en createTreatment:', error);
    throw error;
  }
};

// Función para obtener registros médicos activos con información de pacientes
export const getActiveMedicalRecordsWithPatients = async () => {
  try {
    const response = await fetch(API_URL_MEDICAL_RECORDS_PATIENTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'xyz123', // Si se requiere autorización
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message:
          errorData.message ||
          'Error al obtener registros médicos activos con pacientes',
      };
    }

    // Procesar y devolver la respuesta como JSON
    const data = await response.json();
    return data.map((record: any) => ({
      medicalRecordId: record.medicalRecordId,
      code: record.code,
      reason: record.reason,
      finalDiagnosis: record.finalDiagnosis,
      symptoms: record.symptoms.map((s: any) => ({
        symptom: s.symptom,
        severity: s.severity,
      })),
      vitalSigns: record.vitalSigns.map((v: any) => ({
        sign: v.sign,
        value: v.value,
      })),
      patient: {
        id: record.patient.id,
        fullName: record.patient.fullName,
        ci: record.patient.ci,
        phoneNumber: record.patient.phone_number,
        address: record.patient.address,
        age: record.patient.age,
        birthDate: record.patient.birth_date,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    }));
  } catch (error) {
    console.error('Error en getActiveMedicalRecordsWithPatients:', error);
    throw error;
  }
};

// Función para buscar un grupo de enfermedades por su nombre
export const findDiseaseGroupByName = async (name: string) => {
  if (!name || name.trim() === '') {
    throw new Error('El nombre del grupo de enfermedades no puede estar vacío');
  }

  try {
    const response = await fetch(
      `${API_URL_DISEASE_GROUP}/by_name/${name.trim()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'xyz123', // Si se requiere autorización
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message:
          errorData.message ||
          `Error al buscar el grupo de enfermedades con nombre "${name}"`,
      };
    }

    const data = await response.json();

    // Devolver solo los datos necesarios
    return {
      id: data.id,
      name: data.name,
    };
  } catch (error) {
    console.error('Error en findDiseaseGroupByName:', error);
    throw error;
  }
};

// Función para obtener registros médicos por patientId
export const getMedicalRecordsByPatientId = async (patientId: number) => {
  try {
    const response = await fetch(
      `${API_URL_MEDICAL_RECORD}/patient/${patientId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'xyz123', // Si se requiere autorización
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message:
          errorData.message ||
          `Error al obtener registros médicos para el paciente con ID "${patientId}"`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getMedicalRecordsByPatientId:', error);
    throw error;
  }
};
