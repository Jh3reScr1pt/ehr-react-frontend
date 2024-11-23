import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import HealthRecordForm from '../../../components/Forms/HealthRecordForm';
import { DiagnosisProvider } from '../../../context/Fuzzy_Diagnosis/DiagnosisContext';
import { MedicalRecordProvider } from '../../../context/MedicalRecord/MedicalRecordContext';
import { PatientProvider } from '../../../context/Patient/PatientContext';

const Create = () => {
  return (
    <>
      <Breadcrumb pageName="Crear Historia Clínica" />
      <PatientProvider>
        <DiagnosisProvider>
          <MedicalRecordProvider>
            <HealthRecordForm />
          </MedicalRecordProvider>
        </DiagnosisProvider>
      </PatientProvider>
    </>
  );
};

export default Create;
