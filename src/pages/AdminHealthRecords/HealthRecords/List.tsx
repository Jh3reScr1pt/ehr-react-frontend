import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import HealthRecordList from '../../../components/Lists/HealthRecordList';
import { MedicalRecordProvider } from '../../../context/MedicalRecord/MedicalRecordContext';

const List = () => {
  return (
    <>
      <Breadcrumb pageName="Historias Clínicas" />
      <MedicalRecordProvider>
        <HealthRecordList />
      </MedicalRecordProvider>
    </>
  );
};

export default List;
