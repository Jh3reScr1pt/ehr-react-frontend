import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import RoleForm from "../../../components/Forms/RoleForm";
import { RoleProvider } from "../../../context/Role/RoleContext";


function Create() {
  return (
    <>
      <Breadcrumb pageName="Crear Rol" />
      <RoleProvider>
        <RoleForm />
      </RoleProvider>
    </>
  );
}

export default Create;
