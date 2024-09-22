import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import RoleForm from '../../components/Forms/RoleForm';
import { RoleProvider } from '../../context/Role/RoleContext';

function Edit() {
  return (
    <>
      <Breadcrumb pageName="Editar Rol" />
      <RoleProvider>
        <RoleForm />
      </RoleProvider>
    </>
  );
}

export default Edit;
