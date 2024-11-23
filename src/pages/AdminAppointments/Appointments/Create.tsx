import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import MedicalAppointmentForm from '../../../components/Forms/MedicalAppointmentForm';
import { MedicalAppointmentProvider } from '../../../context/MedicalAppointment/MedicalAppointmentContext';
import { PatientProvider } from '../../../context/Patient/PatientContext';
import { PersonalProvider } from '../../../context/Personal/PersonalContext';

const Create = () => {
  return (
    <>
      <Breadcrumb pageName="Crear Cita Médica" />
      <MedicalAppointmentProvider>
        <PersonalProvider>
          <PatientProvider>
            <MedicalAppointmentForm />
          </PatientProvider>
        </PersonalProvider>
      </MedicalAppointmentProvider>
    </>
  );
};

export default Create;
