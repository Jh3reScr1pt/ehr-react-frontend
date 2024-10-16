import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

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
import { ToastContainer } from 'react-toastify';

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

// APPOINTMENTS
import CreateAppointment from './pages/AdminAppointments/Appointments/Create';
import ListAppointments from './pages/AdminAppointments/Appointments/List';
import EditAppointment from './pages/AdminAppointments/Appointments/Edit';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
              <>
                <PageTitle title="Signin | Centro Médico ZOE" />
                <SignIn />
              </>
            }
          />

          {/* Rutas protegidas dentro del layout */}

          <Route
            path="/"
            element={
              <ProtectedRoute permission="MANAGE_PERSONAL">
                <DefaultLayout>
                  <PageTitle title="EHR | Centro Médico ZOE" />
                  <ECommerce />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <DefaultLayout>
                <PageTitle title="Calendar | Centro Médico ZOE" />
                <Calendar />
              </DefaultLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DefaultLayout>
                <PageTitle title="Profile | Centro Médico ZOE" />
                <Profile />
              </DefaultLayout>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <DefaultLayout>
                <PageTitle title="Form Elements | Centro Médico ZOE" />
                <FormElements />
              </DefaultLayout>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <DefaultLayout>
                <PageTitle title="Form Layout | Centro Médico ZOE" />
                <FormLayout />
              </DefaultLayout>
            }
          />
          <Route
            path="/tables"
            element={
              <DefaultLayout>
                <PageTitle title="Tables | Centro Médico ZOE" />
                <Tables />
              </DefaultLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DefaultLayout>
                <PageTitle title="Settings | Centro Médico ZOE" />
                <Settings />
              </DefaultLayout>
            }
          />
          <Route
            path="/chart"
            element={
              <DefaultLayout>
                <PageTitle title="Basic Chart | Centro Médico ZOE" />
                <Chart />
              </DefaultLayout>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <DefaultLayout>
                <PageTitle title="Alerts | Centro Médico ZOE" />
                <Alerts />
              </DefaultLayout>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <DefaultLayout>
                <PageTitle title="Buttons | Centro Médico ZOE" />
                <Buttons />
              </DefaultLayout>
            }
          />

          {/* <!-- EHR Section --> */}
          {/* <!-- Personal Section --> */}
          <Route
            path="/personal/create"
            element={
              <DefaultLayout>
                <PageTitle title="Crear Personal | Centro Médico ZOE" />
                <CreatePersonal />
              </DefaultLayout>
            }
          />
          <Route
            path="/personal/list"
            element={
              <DefaultLayout>
                <PageTitle title="Lista de Personal | Centro Médico ZOE" />
                <ListPersonal />
              </DefaultLayout>
            }
          />
          <Route
            path="/personal/edit/:id"
            element={
              <DefaultLayout>
                <PageTitle title="Editar Personal | Centro Médico ZOE" />
                <EditPersonal />
              </DefaultLayout>
            }
          />

          {/* <!-- Role Section --> */}
          <Route
            path="/role/create"
            element={
              <DefaultLayout>
                <PageTitle title="Crear Rol | Centro Médico ZOE" />
                <CreateRole />
              </DefaultLayout>
            }
          />
          <Route
            path="/role/list"
            element={
              <DefaultLayout>
                <PageTitle title="Lista de Roles | Centro Médico ZOE" />
                <ListRoles />
              </DefaultLayout>
            }
          />
          <Route
            path="/role/edit/:id"
            element={
              <DefaultLayout>
                <PageTitle title="Editar Rol | Centro Médico ZOE" />
                <EditRole />
              </DefaultLayout>
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
              <DefaultLayout>
                <PageTitle title="Registrar Paciente | Centro Médico ZOE" />
                <CreatePatient />
              </DefaultLayout>
            }
          />
          <Route
            path="/patient/list"
            element={
              <DefaultLayout>
                <PageTitle title="Lista de Pacientes | Centro Médico ZOE" />
                <ListPatients />
              </DefaultLayout>
            }
          />
          <Route
            path="/patient/edit/:id"
            element={
              <DefaultLayout>
                <PageTitle title="Editar Información del Paciente | Centro Médico ZOE" />
                <EditPatient />
              </DefaultLayout>
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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
