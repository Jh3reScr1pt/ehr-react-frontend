import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import HealthRecordViewForm from '../../../components/Forms/HealthRecordViewForm';
import { MedicalRecordProvider } from '../../../context/MedicalRecord/MedicalRecordContext';

const View = () => {
  return (
    <>
      <Breadcrumb pageName="Ver Historia Clínica" />
      <MedicalRecordProvider>
        <HealthRecordViewForm />
      </MedicalRecordProvider>
    </>
  );
};
export default View;
