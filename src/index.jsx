import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';

// page imports
import SitesCreateView from './pages/sites-create/sites-create';
import LoginView from './pages/login/login';
import LoginResetPasswordView from './pages/login-reset-password/login-reset-password';
import TeacherView from './pages/master-teachers/master-teachers';
import TeachersExportDataView from './pages/master-teachers-export-data/master-teachers-export-data';
import SettingsView from './pages/settings/settings';
import SettingsEditView from './pages/settings-edit/settings-edit';
import AreaManagement from './pages/area-management/area-management';
import AssessmentScorecardInput from './pages/assessment-scorecard-input/assessment-scorecard-input';
import AreaDetails from './pages/area-details/area-details';
import PeopleView from './pages/people/people';
import Register from './components/Register/register';
import EmailAction from './components/EmailAction/EmailAction';
import ProtectedRoute from './common/ProtectedRoute';
import { AUTH_ROLES } from './common/config';

const { ADMIN_ROLE, USER_ROLE } = AUTH_ROLES;
// TODO: add protected routes -- use current few as examples
// specify component to render if access allowed, redirectPath if access denied
// use roles from AUTH_ROLES; add to roles list

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginView />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/sites/create/" exact render={() => window.location.replace('/sites')} />
          <Route path="/sites/create/:areaId" exact element={<SitesCreateView />} />
          <Route path="/login" exact element={<LoginView />} />
          <Route path="/login/reset-password" exact element={<LoginResetPasswordView />} />
          <Route path="/master-teachers" exact element={<TeacherView />} />
          <Route path="/master-teachers/export-data" exact element={<TeachersExportDataView />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                Component={SettingsView}
                redirectPath="/login"
                roles={[ADMIN_ROLE, USER_ROLE]}
              />
            }
          />
          <Route path="/settings/edit" element={<SettingsEditView />} />
          <Route path="/people" exact element={<PeopleView />} />
          <Route
            path="/area-management"
            element={
              <ProtectedRoute
                Component={AreaManagement}
                redirectPath="/login"
                roles={[ADMIN_ROLE]}
              />
            }
          />
          <Route path="/assessment-scorecard-input" element={<AssessmentScorecardInput />} />
          <Route path="/area-details" element={<AreaDetails />} />
          <Route exact path="/emailAction" element={<EmailAction redirectPath="/" />} />
        </Routes>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
