import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PersonalForm from '../../../components/Forms/PersonalForm';
import { PersonalProvider } from '../../../context/Personal/PersonalContext';
import { RoleProvider } from '../../../context/Role/RoleContext';

const Edit = () => {
  return (
    <>
      <Breadcrumb pageName="Editar Personal" />
      <PersonalProvider>
        <RoleProvider>
          <PersonalForm />
        </RoleProvider>
      </PersonalProvider>
    </>
  );
};

export default Edit;
