import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import MedicalAppointmentList from '../../../components/Lists/MedicalAppointmentList';
import { MedicalAppointmentProvider } from '../../../context/MedicalAppointment/MedicalAppointmentContext';
import { PatientProvider } from '../../../context/Patient/PatientContext';

const List = () => {
  return (
    <>
      <Breadcrumb pageName="Citas Médicas" />

      <MedicalAppointmentProvider>
        <PatientProvider>
          <MedicalAppointmentList />
        </PatientProvider>
      </MedicalAppointmentProvider>
    </>
  );
};

export default List;
