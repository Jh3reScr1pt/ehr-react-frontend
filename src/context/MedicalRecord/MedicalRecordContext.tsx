import { createContext, useEffect, useState } from 'react';
import { Props } from '../../interfaces/props/props.interface';
import {
  createMedicalRecord,
  createDiagnosis,
  createDiseaseGroup,
  createTreatment,
  getActiveMedicalRecordsWithPatients,
  findDiseaseGroupByName,
  getMedicalRecordsByPatientId,
} from '../../api/medical_records';
import {
  CreateMedicalRecord,
  MedicalRecord,
} from '../../interfaces/Medical_Record_Interfaces/medical_record.interface';
import { CreateDiagnosis } from '../../interfaces/Medical_Record_Interfaces/diagnosis.interface';
import { CreateDiseaseGroup } from '../../interfaces/Medical_Record_Interfaces/disease_group.interface';
import { CreateTreatment } from '../../interfaces/Medical_Record_Interfaces/treatment.interface';

export interface MedicalRecordContextValue {
  medicalRecords: MedicalRecord[];
  loading: boolean;
  error: string | null;
  createMedicalRecord: (
    medicalRecord: CreateMedicalRecord,
  ) => Promise<{ success: boolean; message: string }>;
  createDiagnosis: (
    diagnosis: CreateDiagnosis,
  ) => Promise<{ success: boolean; message: string }>;
  createDiseaseGroup: (
    diseaseGroup: CreateDiseaseGroup,
  ) => Promise<{ success: boolean; message: string }>;
  createTreatment: (
    treatment: CreateTreatment,
  ) => Promise<{ success: boolean; message: string }>;
  findActiveMedicalRecordsWithPatients: () => Promise<MedicalRecord[]>;
  findDiseaseGroupByName: (
    name: string,
  ) => Promise<{ id: number; name: string }>;
  registerFullMedicalRecordProcess: (
    medicalRecordData: {
      patientId: number;
      reason: string;
      finalDiagnosis: string;
      symptomsInformation: string;
      vitalSignsInformation: string;
    },
    diseaseGroups: { name: string; probability: number }[], // Cambiar a array de grupos
    treatmentData: { medication: string; notes: string },
  ) => Promise<{
    medicalRecord: any;
    treatment: any;
  }>;
  getMedicalRecordsByPatientId: (patientId: number) => Promise<MedicalRecord[]>;
}

export const MedicalRecordContext = createContext<MedicalRecordContextValue>({
  medicalRecords: [],
  loading: true,
  error: null,
  createMedicalRecord: async () => {
    throw new Error('createMedicalRecord() no está implementado');
  },
  createDiagnosis: async () => {
    throw new Error('createDiagnosis() no está implementado');
  },
  createDiseaseGroup: async () => {
    throw new Error('createDiseaseGroup() no está implementado');
  },
  createTreatment: async () => {
    throw new Error('createTreatment() no está implementado');
  },
  findActiveMedicalRecordsWithPatients: async () => {
    throw new Error(
      'findActiveMedicalRecordsWithPatients() no está implementado',
    );
  },
  findDiseaseGroupByName: async () => {
    throw new Error('findDiseaseGroupByName() no está implementado');
  },
  registerFullMedicalRecordProcess: async () => {
    throw new Error('registerFullMedicalRecordProcess() no está implementado');
  },
  getMedicalRecordsByPatientId: async () => {
    throw new Error('getMedicalRecordsByPatientId() no está implementado');
  },
});

export const MedicalRecordProvider: React.FC<Props> = ({ children }) => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveMedicalRecords = async () => {
      try {
        const data = await getActiveMedicalRecordsWithPatients();
        setMedicalRecords(data);
      } catch (err) {
        setError('Error al cargar los registros médicos activos con pacientes');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveMedicalRecords();
  }, []);

  // Nueva función para obtener registros médicos por patientId
  const fetchMedicalRecordsByPatientId = async (patientId: number) => {
    try {
      const data = await getMedicalRecordsByPatientId(patientId);
      return data;
    } catch (err) {
      console.error('Error obteniendo registros médicos por patientId:', err);
      throw err;
    }
  };

  // Función que encapsula todo el flujo de creación
  const registerFullMedicalRecordProcess = async (
    medicalRecordData: {
      patientId: number;
      reason: string;
      finalDiagnosis: string;
      symptomsInformation: string;
      vitalSignsInformation: string;
    },
    diseaseGroups: { name: string; probability: number }[], // Recibir múltiples grupos
    treatmentData: { medication: string; notes: string },
  ) => {
    try {
      // Paso 1: Crear el registro médico
      const medicalRecord = await createMedicalRecord(medicalRecordData);

      console.log('Registro Médico creado:', medicalRecord.data.id);

      // Paso 2: Iterar sobre los grupos de enfermedades
      for (const group of diseaseGroups) {
        let diseaseGroup;

        try {
          // Intentar buscar el grupo de enfermedades por nombre
          diseaseGroup = await findDiseaseGroupByName(group.name);
          console.log(diseaseGroup.name);
        } catch (error) {
          console.error(
            `Grupo de enfermedades "${group.name}" no encontrado. Abortando el proceso.`,
          );
          throw new Error(
            `El grupo de enfermedades "${group.name}" no existe. Por favor, verifique los datos del diagnóstico presuntivo.`,
          );
        }

        // Paso 3: Crear el diagnóstico para cada grupo
        await createDiagnosis({
          medicalRecordId: medicalRecord.data.id,
          diseaseGroupId: diseaseGroup.id,
          probability: group.probability, // Usar la probabilidad proporcionada
        });

        console.log(`Diagnóstico creado para el grupo "${group.name}"`);
      }

      // Paso 4: Crear el tratamiento
      const treatment = await createTreatment({
        medicalRecordId: medicalRecord.data.id,
        medication: treatmentData.medication,
        notes: treatmentData.notes,
      });

      console.log('Tratamiento creado:', treatment);

      return {
        medicalRecord,
        treatment,
      };
    } catch (error) {
      console.error('Error en el proceso de creación:', error);
      throw new Error('Error en el proceso de creación completo');
    }
  };

  const createMedicalRecordHandler = async (
    medicalRecord: CreateMedicalRecord,
  ) => {
    try {
      const response = await createMedicalRecord(medicalRecord);
      setMedicalRecords((prevRecords) => [...prevRecords, response]);
      return { success: true, message: 'Registro médico creado exitosamente' };
    } catch (err: any) {
      console.error('Error creando registro médico:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el registro médico',
      };
    }
  };

  const createDiagnosisHandler = async (diagnosis: CreateDiagnosis) => {
    try {
      await createDiagnosis(diagnosis);
      return { success: true, message: 'Diagnóstico creado exitosamente' };
    } catch (err: any) {
      console.error('Error creando diagnóstico:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el diagnóstico',
      };
    }
  };

  const createDiseaseGroupHandler = async (
    diseaseGroup: CreateDiseaseGroup,
  ) => {
    try {
      await createDiseaseGroup(diseaseGroup);
      return {
        success: true,
        message: 'Grupo de enfermedades creado exitosamente',
      };
    } catch (err: any) {
      console.error('Error creando grupo de enfermedades:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el grupo de enfermedades',
      };
    }
  };

  const createTreatmentHandler = async (treatment: CreateTreatment) => {
    try {
      await createTreatment(treatment);
      return { success: true, message: 'Tratamiento creado exitosamente' };
    } catch (err: any) {
      console.error('Error creando tratamiento:', err);
      return {
        success: false,
        message: err.message || 'Error al crear el tratamiento',
      };
    }
  };

  const findActiveMedicalRecordsHandler = async () => {
    try {
      return await getActiveMedicalRecordsWithPatients();
    } catch (err) {
      console.error('Error obteniendo registros médicos activos:', err);
      throw err;
    }
  };

  const findDiseaseGroupByNameHandler = async (name: string) => {
    try {
      return await findDiseaseGroupByName(name);
    } catch (err) {
      console.error('Error buscando grupo de enfermedades por nombre:', err);
      throw err;
    }
  };

  return (
    <MedicalRecordContext.Provider
      value={{
        medicalRecords,
        loading,
        error,
        createMedicalRecord: createMedicalRecordHandler,
        createDiagnosis: createDiagnosisHandler,
        createDiseaseGroup: createDiseaseGroupHandler,
        createTreatment: createTreatmentHandler,
        findActiveMedicalRecordsWithPatients: findActiveMedicalRecordsHandler,
        findDiseaseGroupByName: findDiseaseGroupByNameHandler,
        registerFullMedicalRecordProcess, // Añadido a los valores del contexto
        getMedicalRecordsByPatientId: fetchMedicalRecordsByPatientId,
      }}
    >
      {children}
    </MedicalRecordContext.Provider>
  );
};
