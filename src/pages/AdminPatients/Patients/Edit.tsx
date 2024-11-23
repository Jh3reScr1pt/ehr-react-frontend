import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PatientForm from '../../../components/Forms/PatientForm';
import { PatientProvider } from '../../../context/Patient/PatientContext';

const Edit = () => {
  return (
    <>
      <Breadcrumb pageName="Editar Información del Paciente" />
      <PatientProvider>
        <PatientForm />
      </PatientProvider>
    </>
  );
};

export default Edit;
