import React, { createContext, useState, useEffect } from 'react';
import { Props } from '../../interfaces/props/props.interface';
import {
  createDiagnosisRequest,
  getSymptomsRequest,
} from '../../api/fuzzy_diagnosis_service/fuzzy_diagnosis';
import {
  CreateDiagnosis,
  Diagnosis,
} from '../../interfaces/Fuzzy_Service/diagnoses.interface';
import { Symptom } from '../../interfaces/Fuzzy_Service/symptoms.interface';

export interface DiagnosisContextValue {
  symptoms: Symptom[];
  loading: boolean;
  error: string | null;
  createDiagnosis: (diagnosis: CreateDiagnosis) => Promise<Diagnosis>;
  getSymptoms: () => Promise<void>;
}

export const DiagnosisContext = createContext<DiagnosisContextValue>({
  symptoms: [],
  loading: true,
  error: null,
  createDiagnosis: async () => {
    throw new Error('createDiagnosis() not implemented');
  },
  getSymptoms: async () => {
    throw new Error('getSymptoms() not implemented');
  },
});

export const DiagnosisProvider: React.FC<Props> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSymptoms = async () => {
    try {
      const data = await getSymptomsRequest();
      setSymptoms(data);
    } catch (err) {
      console.error('Error al obtener los síntomas:', err);
      setError('Error al obtener los síntomas');
    } finally {
      setLoading(false);
    }
  };

  const createDiagnosis = async (
    diagnosis: CreateDiagnosis,
  ): Promise<Diagnosis> => {
    try {
      return await createDiagnosisRequest(diagnosis);
    } catch (err) {
      console.error('Error al crear el diagnóstico:', err);
      throw err;
    }
  };

  useEffect(() => {
    getSymptoms();
  }, []);

  return (
    <DiagnosisContext.Provider
      value={{ symptoms, loading, error, createDiagnosis, getSymptoms }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};
