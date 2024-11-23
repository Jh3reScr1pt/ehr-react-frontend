import { useNavigate } from 'react-router-dom';
import { useToasts } from '../hooks/useToasts';
import { useState } from 'react';
import { useDiagnoses } from '../context/Fuzzy_Diagnosis/useDiagnoses';
import { useMedicalRecord } from '../context/MedicalRecord/useMedicalRecord';

export const useMedicalRecordHandlers = () => {
  const navigate = useNavigate();
  const { ToastSuccess, ToastError } = useToasts();
  
};
