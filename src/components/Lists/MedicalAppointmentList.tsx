import AppointmentCard from '../Cards/AppointmentCard';
import { useMedicalAppointments } from '../../context/MedicalAppointment/UseMedicalAppointment';
import Loader from '../../common/Loader';
import { useMedicalAppointmentHandlers } from '../../handlers/medicalAppointmentHandlers';
import { useState } from 'react';

const MedicalAppointmentList = () => {
  const { medicalAppointment, loading, error } = useMedicalAppointments();
  const { handleEditClick, handleDeactivate, handleReload, handleDelete } =
    useMedicalAppointmentHandlers();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredAppointments = medicalAppointment.filter((appointment) =>
    `${appointment.patientId} ${appointment.doctorId}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-5">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onEdit={handleEditClick}
            onDeactivate={handleDeactivate}
            onActivate={handleReload}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MedicalAppointmentList;
