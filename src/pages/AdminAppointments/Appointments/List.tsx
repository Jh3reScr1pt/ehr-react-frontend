import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AppointmentCard from '../../../components/Cards/AppointmentCard';
import DoctorCard from '../../../components/Cards/DoctorCard';

const List = () => {
  return (
    <>
      <Breadcrumb pageName="Citas Médicas" />
      <AppointmentCard />
      <DoctorCard />
    </>
  );
};

export default List;
