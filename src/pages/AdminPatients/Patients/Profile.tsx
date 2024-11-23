import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PatientProfile from '../../../components/Profiles/PatientProfile';
import { MedicalRecordProvider } from '../../../context/MedicalRecord/MedicalRecordContext';
import { PatientProvider } from '../../../context/Patient/PatientContext';

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="Perfíl del paciente" />
      <PatientProvider>
        <MedicalRecordProvider>
          <PatientProfile />
        </MedicalRecordProvider>
      </PatientProvider>
    </>
  );
};

export default Profile;
