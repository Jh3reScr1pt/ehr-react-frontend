import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PatientForm from '../../../components/Forms/PatientForm';
import { PatientProvider } from '../../../context/Patient/PatientContext';

const Create = () => {
  return (
    <>
      <Breadcrumb pageName="Registrar Paciente" />
      <PatientProvider>
        <PatientForm />
      </PatientProvider>
    </>
  );
};

export default Create;
