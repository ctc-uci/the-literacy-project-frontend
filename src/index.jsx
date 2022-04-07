import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';

// page imports
import SitesCreateView from './pages/sites-create/sites-create';
import LoginView from './pages/login/login';
import LoginRecoverPasswordView from './pages/login-recover-password/login-recover-password';
import SettingsView from './pages/settings/settings';
import SettingsEditView from './pages/settings-edit/settings-edit';
import AreaManagement from './pages/area-management/area-management';
import AssessmentScorecardInput from './pages/assessment-scorecard-input/assessment-scorecard-input';
import AreaDetails from './pages/area-details/area-details';
import PeopleView from './pages/people/people';
import NotFoundView from './pages/not-found/not-found';
import AccessDeniedView from './pages/access-denied/access-denied';
import EmailAction from './components/EmailAction/EmailAction';
import ProtectedRoute from './common/ProtectedRoute';
import { AUTH_ROLES } from './common/config';
import LoginResetPasswordView from './pages/login-reset-password/login-reset-password';

const { ADMIN_ROLE, USER_ROLE } = AUTH_ROLES;

// useNavigate for redirects
// const navigate = useNavigate();

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginView />} />
          <Route path="/login" exact element={<LoginView />} />
          <Route path="/login/recover-password" exact element={<LoginRecoverPasswordView />} />
          <Route path="/login/reset-password" exact element={<LoginResetPasswordView />} />
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
          <Route
            path="/settings/edit"
            element={
              <ProtectedRoute
                Component={SettingsEditView}
                redirectPath="/login"
                roles={[ADMIN_ROLE, USER_ROLE]}
              />
            }
          />
          <Route
            path="/people"
            element={
              <ProtectedRoute
                Component={PeopleView}
                redirectPath="/access-denied"
                roles={[ADMIN_ROLE]}
              />
            }
          />
          <Route
            path="/area-management"
            element={
              <ProtectedRoute
                Component={AreaManagement}
                redirectPath="/access-denied"
                roles={[ADMIN_ROLE]}
              />
            }
          />
          <Route
            path="/sites/create/:areaId"
            element={
              <ProtectedRoute
                Component={SitesCreateView}
                redirectPath="/access-denied"
                roles={[ADMIN_ROLE]}
              />
            }
          />
          <Route
            path="/area-details"
            element={
              <ProtectedRoute
                Component={AreaDetails}
                redirectPath="/access-denied"
                roles={[ADMIN_ROLE]}
              />
            }
          />
          <Route path="/assessment-scorecard-input" element={<AssessmentScorecardInput />} />
          <Route path="/area" render={() => Navigate('/area-management')} />
          <Route path="/area/:areaId" element={<AreaDetails />} />
          <Route exact path="/emailAction" element={<EmailAction redirectPath="/" />} />
          <Route exact path="/access-denied" element={<AccessDeniedView />} />
          <Route exact path="/not-found" element={<NotFoundView />} />
          <Route exact path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
