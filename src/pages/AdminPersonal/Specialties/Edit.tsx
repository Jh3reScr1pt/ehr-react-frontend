import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SpecialtyForm from '../../../components/Forms/SpecialtyForm';
import { SpecialtyProvider } from '../../../context/Specialty/SpecialtyContext';

function Edit() {
  return (
    <>
      <Breadcrumb pageName="Editar Especialidad" />
      <SpecialtyProvider>
        <SpecialtyForm />
      </SpecialtyProvider>
    </>
  );
}

export default Edit;
