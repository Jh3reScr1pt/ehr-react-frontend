import { useState } from 'react';
import Loader from '../../common/Loader';
import { usePatients } from '../../context/Patient/UsePatient';
import { usePatientHandlers } from '../../handlers/patientHandlers';
import SearchAndCreateBar from '../SearchAndCreateBar';
import PatientCard from '../Cards/PatientCard'; // Asegúrate de que la ruta sea correcta

const PatientList = () => {
  const { patient, loading, error } = usePatients();
  const {
    handleViewClick,
    handleEditClick,
    handleDeactivate,
    handleReload,
    handleDelete,
    handleInfoPersonalSearch,
  } = usePatientHandlers();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredPatients = patient.filter((p) =>
    `${p.first_name} ${p.second_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      {/* Barra de Búsqueda y Botón de Crear */}
      <SearchAndCreateBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={handleInfoPersonalSearch}
        createRoute="/patient/create"
        createButtonText="Crear Paciente"
      />

      {/* Cuadrícula de Tarjetas de Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {filteredPatients.map((p) => (
          <PatientCard
            key={p.id}
            patient={p}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDeactivate={handleDeactivate}
            onActivate={handleReload}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default PatientList;
