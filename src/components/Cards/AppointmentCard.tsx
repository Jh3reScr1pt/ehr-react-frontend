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
  CheckCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useIconToggles } from '../../hooks/useIconToggles';
import { MedicalAppointment } from '../../interfaces/Appointment/medical_appointment.inteface';

interface AppointmentCardProps {
  appointment: MedicalAppointment;
  onEdit: (id: number) => void;
  onDeactivate: (id: number) => void;
  onActivate: (id: number) => void;
  onDelete: (id: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onEdit,
  onDeactivate,
  onActivate,
  onDelete,
}) => {
  const { iconStates, toggleIconState } = useIconToggles();

  // Ajustar fecha para sumar un día
  const correctDate = new Date(appointment.date_appointment);
  correctDate.setDate(correctDate.getDate() + 1);

  return (
    <div className="w-full max-w-full bg-white border-stroke rounded-xl shadow-default overflow-hidden dark:border-strokedark dark:bg-boxdark">
      <div className="p-6 flex flex-row md:flex-row items-center justify-between">
        {/* Fecha */}
        <div className="bg-yellow-300 dark:bg-yellow-500 p-4 rounded-lg text-center md:mr-4">
          <p className="text-4xl font-bold text-white">
            {correctDate.getDate()}
          </p>
          <p className="text-sm text-white">
            {correctDate.toLocaleDateString('es-ES', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Detalles de la cita */}
        <div className="ml-4 flex-1 w-full text-center md:text-left">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Cita Médica
          </div>
          <p className="mt-2 text-gray-500">
            {appointment.start_time} - {appointment.end_time}
          </p>
          <p className="mt-2 text-gray-500">
            Dr. {appointment.doctor?.first_name}{' '}
            {appointment.doctor?.first_last_name}
          </p>
          <p className="mt-2 text-gray-500">
            Paciente: {appointment.patient?.first_name}{' '}
            {appointment.patient?.first_last_name}
          </p>
        </div>
      </div>

      {/* Botones en dos filas en pantallas pequeñas */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 p-4 bg-gray-100 dark:bg-gray-800">
        {appointment.isActive ? (
          <>
            <button className="inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
              <EyeOutlined /> Detalles
            </button>
            <button
              onMouseDown={() => toggleIconState(appointment.id, 'edit')}
              onMouseUp={() => {
                toggleIconState(appointment.id, 'edit');
                onEdit(appointment.id);
              }}
              className="inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
            >
              {iconStates[appointment.id]?.edit ? (
                <EditFilled />
              ) : (
                <EditOutlined />
              )}{' '}
              Editar
            </button>
            <button
              onMouseDown={() => toggleIconState(appointment.id, 'close')}
              onMouseUp={() => {
                toggleIconState(appointment.id, 'close');
                onDeactivate(appointment.id);
              }}
              className="inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              {iconStates[appointment.id]?.close ? (
                <CheckCircleFilled />
              ) : (
                <CheckCircleOutlined />
              )}{' '}
              Cumplido
            </button>
            <button
              onMouseDown={() => toggleIconState(appointment.id, 'close')}
              onMouseUp={() => {
                toggleIconState(appointment.id, 'close');
                onDeactivate(appointment.id);
              }}
              className="inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              {iconStates[appointment.id]?.close ? (
                <CloseCircleFilled />
              ) : (
                <CloseCircleOutlined />
              )}{' '}
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onActivate(appointment.id)}
              className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800"
            >
              <ReloadOutlined /> Activar
            </button>
            <button
              onMouseDown={() => toggleIconState(appointment.id, 'delete')}
              onMouseUp={() => {
                toggleIconState(appointment.id, 'delete');
                onDelete(appointment.id);
              }}
              className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              {iconStates[appointment.id]?.delete ? (
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

export default AppointmentCard;
