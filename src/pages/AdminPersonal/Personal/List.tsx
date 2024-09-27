import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PersonalList from '../../../components/Lists/PersonalList';
import { PersonalProvider } from '../../../context/Personal/PersonalContext';

const List = () => {
  return (
    <>
      <Breadcrumb pageName="Personal" />
      <PersonalProvider>
        <PersonalList/>
      </PersonalProvider>
    </>
  );
};

export default List;
