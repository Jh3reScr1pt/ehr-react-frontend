// src/components/PatientCard.tsx
import React from 'react';
import { EyeOutlined, EyeFilled } from '@ant-design/icons';
import { useIconToggles } from '../../hooks/useIconToggles';
import PatientUser from '../../images/profile_images/patient.png';
import { MedicalRecordInfo } from '../../interfaces/Medical_Record_Interfaces/medical_record.interface';

interface HealthRecordCardProps {
  medicalRecord: MedicalRecordInfo;
  onView: (id: number) => void;
}

const HealthRecordCard: React.FC<HealthRecordCardProps> = ({
  medicalRecord,
  onView,
}) => {
  const { iconStates, toggleIconState } = useIconToggles();

  return (
    <div className="max-w-sm mb-5 p-4 bg-white border-stroke rounded-lg shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center space-x-4">
        <img className="w-12 h-12 rounded-full" src="https://media.istockphoto.com/id/922551734/es/vector/m%C3%A9dica-cruz-blanca.jpg?s=612x612&w=0&k=20&c=w13NgznHG_s7O4To1U4lV1SUTtH0f4mq9-NE4VHVbwU=" />
        <div className="flex-1">
          <h5 className="text-lg font-medium text-gray-900 dark:text-white">
            {`${medicalRecord.code}`}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Paciente: {medicalRecord.patient.fullName}
          </span>
        </div>
      </div>
      <div className="mt-4 flex space-x-3 md:mt-6">
        <button
          onMouseDown={() =>
            toggleIconState(medicalRecord.medicalRecordId, 'view')
          }
          onMouseUp={() => {
            toggleIconState(medicalRecord.medicalRecordId, 'view');
            onView(medicalRecord.medicalRecordId);
          }}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          {iconStates[medicalRecord.medicalRecordId]?.edit ? (
            <EyeFilled />
          ) : (
            <EyeOutlined />
          )}{' '}
          Vista
        </button>
      </div>
    </div>
  );
};

export default HealthRecordCard;
