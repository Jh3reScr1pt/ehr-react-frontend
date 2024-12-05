import { useState } from 'react';
import { usePatientHandlers } from '../../handlers/patientHandlers';
import SearchAndCreateBar from '../SearchAndCreateBar';
import HealthRecordCard from '../Cards/HealthRecordCard';
import { useMedicalRecord } from '../../context/MedicalRecord/useMedicalRecord';
import { useNavigate } from 'react-router-dom';

const HealthRecordList = () => {
  const { medicalRecords } = useMedicalRecord();
  const { handleInfoPersonalSearch } = usePatientHandlers();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleViewClick = (medicalRecordId: number) => {
    navigate(`/health_record/view/${medicalRecordId}`);
  };

  const filteredHealthRecords = medicalRecords.filter((m) =>
    `${m.code} `.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <SearchAndCreateBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={handleInfoPersonalSearch}
        createRoute="/patient/create"
        createButtonText="Crear Paciente"
        showCreateButton={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {filteredHealthRecords.map((m) => (
          <HealthRecordCard
            key={m.medicalRecordId}
            medicalRecord={m}
            onView={handleViewClick}
          />
        ))}
      </div>
    </>
  );
};

export default HealthRecordList;
