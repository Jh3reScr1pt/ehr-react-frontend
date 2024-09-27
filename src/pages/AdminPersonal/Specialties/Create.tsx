import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SpecialtyForm from '../../../components/Forms/SpecialtyForm';
import { SpecialtyProvider } from '../../../context/Specialty/SpecialtyContext';

function Create() {
  return (
    <>
      <Breadcrumb pageName="Crear Rol" />
      <SpecialtyProvider>
        <SpecialtyForm />
      </SpecialtyProvider>
    </>
  );
}

export default Create;
