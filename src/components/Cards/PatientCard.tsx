// src/components/PatientCard.tsx
import React from 'react';
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
  EyeFilled,
} from '@ant-design/icons';
import { Patient } from '../../interfaces/Patient/patient.interface';
import { useIconToggles } from '../../hooks/useIconToggles';

interface PatientCardProps {
  patient: Patient;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDeactivate: (id: number) => void;
  onActivate: (id: number) => void;
  onDelete: (id: number) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onView,
  onEdit,
  onDeactivate,
  onActivate,
  onDelete,
}) => {
  const { iconStates, toggleIconState } = useIconToggles();

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.birth_date);

  return (
    <div className="max-w-sm mb-5 p-4 bg-white border-stroke rounded-lg shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-full"
          src={'https://randomuser.me/api/portraits/men/1.jpg'} // Imagen por defecto si no hay
          alt={`${patient.first_name} ${patient.second_name}`}
        />
        <div className="flex-1">
          <h5 className="text-lg font-medium text-gray-900 dark:text-white">
            {patient.first_name} {patient.second_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            CI: {patient.ci} | Edad: {age}
          </span>
        </div>
      </div>
      <div className="mt-4 flex space-x-3 md:mt-6">
        {/* Botones de Recuperar/Desactivar y Eliminar */}
        {patient.isActive ? (
          <>
            <button
              onMouseDown={() => toggleIconState(patient.id, 'view')}
              onMouseUp={() => {
                toggleIconState(patient.id, 'view');
                onView(patient.id);
              }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              {iconStates[patient.id]?.edit ? <EyeFilled /> : <EyeOutlined />}{' '}
              Vista
            </button>

            {/* Botón de Editar */}
            <button
              onMouseDown={() => toggleIconState(patient.id, 'edit')}
              onMouseUp={() => {
                toggleIconState(patient.id, 'edit');
                onEdit(patient.id);
              }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              {iconStates[patient.id]?.edit ? <EditFilled /> : <EditOutlined />}{' '}
              Editar
            </button>
            <button
              onMouseDown={() => toggleIconState(patient.id, 'close')}
              onMouseUp={() => {
                toggleIconState(patient.id, 'close');
                onDeactivate(patient.id);
              }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              {iconStates[patient.id]?.close ? (
                <CloseCircleFilled />
              ) : (
                <CloseCircleOutlined />
              )}{' '}
              Desactivar
            </button>
          </>
        ) : (
          <>
            <button
              onMouseUp={() => {
                onActivate(patient.id);
              }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800"
            >
              <ReloadOutlined /> Activar
            </button>
            <button
              onMouseDown={() => toggleIconState(patient.id, 'delete')}
              onMouseUp={() => {
                toggleIconState(patient.id, 'delete');
                onDelete(patient.id);
              }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              {iconStates[patient.id]?.delete ? (
                <DeleteFilled />
              ) : (
                <DeleteOutlined />
              )}{' '}
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
