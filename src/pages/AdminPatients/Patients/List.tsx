import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PatientList from '../../../components/Lists/PatientList';
import { PatientProvider } from '../../../context/Patient/PatientContext';

const List = () => {
  return (
    <>
      <Breadcrumb pageName="Pacientes" />
      <PatientProvider>
        <PatientList />
      </PatientProvider>
    </>
  );
};

export default List;
