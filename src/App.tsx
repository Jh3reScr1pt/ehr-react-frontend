import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { IStaticMethods } from 'flyonui/flyonui';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

// AUTH
import { AuthProvider } from './context/Auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// PERSONAL
import CreatePersonal from './pages/AdminPersonal/Personal/Create';
import ListPersonal from './pages/AdminPersonal/Personal/List';
import EditPersonal from './pages/AdminPersonal/Personal/Edit';

// ROLES
import CreateRole from './pages/AdminPersonal/Roles/Create';
import ListRoles from './pages/AdminPersonal/Roles/List';
import EditRole from './pages/AdminPersonal/Roles/Edit';

// SPECIALTIES
import ListSpecialties from './pages/AdminPersonal/Specialties/List';
import CreateSpecialty from './pages/AdminPersonal/Specialties/Create';
import EditSpecialty from './pages/AdminPersonal/Specialties/Edit';

// PATIENTS
import CreatePatient from './pages/AdminPatients/Patients/Create';
import ListPatients from './pages/AdminPatients/Patients/List';
import EditPatient from './pages/AdminPatients/Patients/Edit';
import ProfilePatient from './pages/AdminPatients/Patients/Profile';

// APPOINTMENTS
import CreateAppointment from './pages/AdminAppointments/Appointments/Create';
import ListAppointments from './pages/AdminAppointments/Appointments/List';
import EditAppointment from './pages/AdminAppointments/Appointments/Edit';

// HEALTH RECORDS
import CreateHealthRecord from './pages/AdminHealthRecords/HealthRecords/Create';
import ListHealthRecords from './pages/AdminHealthRecords/HealthRecords/List';
import ViewHealthRecord from './pages/AdminHealthRecords/HealthRecords/View';

import { useAuth } from './context/Auth/useAuth';
import Home from './pages/Dashboard/Home';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { token } = useAuth(); // Obtener el token del contexto

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Páginas de autenticación fuera del layout */}
          <Route
            path="/auth/signin"
            element={
              token ? ( // Si el token existe, redirige a "/"
                <Navigate to="/" replace />
              ) : (
                <>
                  <PageTitle title="Inicio de Sesión | Centro Médico ZOE" />
                  <SignIn />
                </>
              )
            }
          />

          {/* Rutas protegidas dentro del layout */}

          <Route
            path="/"
            element={
              <ProtectedRoute
                permissions={[
                  'MANAGE_PERSONAL',
                  'MANAGE_COMPONENTS',
                  'VIEW_PATIENTS',
                ]}
              >
                <DefaultLayout>
                  <PageTitle title="Centro Médico ZOE" />
                  <Home />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Calendar | Centro Médico ZOE" />
                  <Calendar />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Profile | Centro Médico ZOE" />
                  <Profile />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Form Elements | Centro Médico ZOE" />
                  <FormElements />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Form Layout | Centro Médico ZOE" />
                  <FormLayout />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tables"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Tables | Centro Médico ZOE" />
                  <Tables />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Settings | Centro Médico ZOE" />
                  <Settings />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chart"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Basic Chart | Centro Médico ZOE" />
                  <Chart />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Alerts | Centro Médico ZOE" />
                  <Alerts />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <ProtectedRoute permissions={['MANAGE_COMPONENTS']}>
                <DefaultLayout>
                  <PageTitle title="Buttons | Centro Médico ZOE" />
                  <Buttons />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />

          {/* <!-- EHR Section --> */}
          {/* <!-- Personal Section --> */}
          <Route
            path="/personal/create"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL']}
                requireAll={true}
              >
                <DefaultLayout>
                  <PageTitle title="Crear Personal | Centro Médico ZOE" />
                  <CreatePersonal />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal/list"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL']}
                requireAll={true}
              >
                <DefaultLayout>
                  <PageTitle title="Lista de Personal | Centro Médico ZOE" />
                  <ListPersonal />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal/edit/:id"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL']}
                requireAll={true}
              >
                <DefaultLayout>
                  <PageTitle title="Editar Personal | Centro Médico ZOE" />
                  <EditPersonal />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />

          {/* <!-- Role Section --> */}
          <Route
            path="/role/create"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL']}
                requireAll={true}
              >
                <DefaultLayout>
                  <PageTitle title="Crear Rol | Centro Médico ZOE" />
                  <CreateRole />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/role/list"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL']}
                requireAll={true}
              >
                <DefaultLayout>
                  <PageTitle title="Lista de Roles | Centro Médico ZOE" />
                  <ListRoles />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/role/edit/:id"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL']}
                requireAll={true}
              >
                <DefaultLayout>
                  <PageTitle title="Editar Rol | Centro Médico ZOE" />
                  <EditRole />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />

          {/* <!-- Specialty Section --> */}
          <Route
            path="/specialty/create"
            element={
              <DefaultLayout>
                <PageTitle title="Crear Especialidad | Centro Médico ZOE" />
                <CreateSpecialty />
              </DefaultLayout>
            }
          />
          <Route
            path="/specialty/list"
            element={
              <DefaultLayout>
                <PageTitle title="Lista de Especialidades | Centro Médico ZOE" />
                <ListSpecialties />
              </DefaultLayout>
            }
          />
          <Route
            path="/specialty/edit/:id"
            element={
              <DefaultLayout>
                <PageTitle title="Editar Especialidad | Centro Médico ZOE" />
                <EditSpecialty />
              </DefaultLayout>
            }
          />

          {/* <!-- Patient Section --> */}
          <Route
            path="/patient/create"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL', 'CREATE_PATIENTS']}
              >
                <DefaultLayout>
                  <PageTitle title="Registrar Paciente | Centro Médico ZOE" />
                  <CreatePatient />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/list"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL', 'VIEW_PATIENTS']}
              >
                <DefaultLayout>
                  <PageTitle title="Lista de Pacientes | Centro Médico ZOE" />
                  <ListPatients />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/edit/:id"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL', 'EDIT_PATIENTS']}
              >
                <DefaultLayout>
                  <PageTitle title="Editar Información del Paciente | Centro Médico ZOE" />
                  <EditPatient />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/profile/:id"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL', 'CONSULT_PATIENT_INFO']}
              >
                <DefaultLayout>
                  <PageTitle title="Información del Paciente | Centro Médico ZOE" />
                  <ProfilePatient />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          {/* <!-- Appointment Section --> */}
          <Route
            path="/appointment/create"
            element={
              <DefaultLayout>
                <PageTitle title="Crear Cita Médica | Centro Médico ZOE" />
                <CreateAppointment />
              </DefaultLayout>
            }
          />
          <Route
            path="/appointment/list"
            element={
              <DefaultLayout>
                <PageTitle title="Lista de Citas Médicas | Centro Médico ZOE" />
                <ListAppointments />
              </DefaultLayout>
            }
          />
          <Route
            path="/appointment/edit/:id"
            element={
              <DefaultLayout>
                <PageTitle title="Editar Cita Médica | Centro Médico ZOE" />
                <EditAppointment />
              </DefaultLayout>
            }
          />
          {/* <!-- Health Record Section --> */}
          <Route
            path="/health_record/create/:id"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL', 'CREATE_CLINICAL_HISTORY']}
              >
                <DefaultLayout>
                  <PageTitle title="Crear Historia Clínica | Centro Médico ZOE" />
                  <CreateHealthRecord />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/health_record/list"
            element={
              <DefaultLayout>
                <PageTitle title="Lista de Historias Clínicas | Centro Médico ZOE" />
                <ListHealthRecords />
              </DefaultLayout>
            }
          />
          <Route
            path="/health_record/view/:id"
            element={
              <ProtectedRoute
                permissions={['MANAGE_PERSONAL', 'REVIEW_CLINICAL_HISTORY']}
              >
                <DefaultLayout>
                  <PageTitle title="Ver Historia Clínica | Centro Médico ZOE" />
                  <ViewHealthRecord />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
