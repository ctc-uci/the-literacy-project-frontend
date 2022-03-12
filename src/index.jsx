import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

// page imports
import SitesCreateView from './pages/sites-create/sites-create';
import SitesExportDataView from './pages/sites-export-data/sites-export-data';
import AssignStudentsView from './pages/assign-students/assign-students';
import LoginView from './pages/login/login';
import LoginResetPasswordView from './pages/login-reset-password/login-reset-password';
import LoginTeacherStartView from './pages/login-teacher-start/login-teacher-start';
import DashboardView from './pages/dashboard/dashboard';
import TeacherView from './pages/master-teachers/master-teachers';
import TeachersConfirmation from './pages/master-teachers-confirm/master-teachers-confirm';
import TeachersExportDataView from './pages/master-teachers-export-data/master-teachers-export-data';
import SettingsView from './pages/settings/settings';
import SettingsChangePasswordView from './pages/settings-change-password/settings-change-password';
import SettingsEditView from './pages/settings-edit/settings-edit';
import AreaManagement from './pages/area-management/area-management';
import AssessmentScorecardInput from './pages/assessment-scorecard-input/assessment-scorecard-input';
import PeopleView from './pages/people/people';
import AreaDetails from './pages/area-details/area-details';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/sites/create/" exact render={() => window.location.replace('/sites')} />
        <Route path="/sites/create/:areaId" exact element={<SitesCreateView />} />
        <Route path="/sites/assign-students" exact element={<AssignStudentsView />} />
        <Route path="/sites/export-data" exact element={<SitesExportDataView />} />
        <Route path="/login" exact element={<LoginView />} />
        <Route path="/login/reset-password" exact element={<LoginResetPasswordView />} />
        <Route path="/login/master-teacher-start/:id" exact element={<LoginTeacherStartView />} />
        <Route path="/dashboard" exact element={<DashboardView />} />
        <Route path="/master-teachers" exact element={<TeacherView />} />
        <Route path="/master-teachers/confirm" exact element={<TeachersConfirmation />} />
        <Route path="/master-teachers/export-data" exact element={<TeachersExportDataView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/settings/change-password" element={<SettingsChangePasswordView />} />
        <Route path="/settings/edit" element={<SettingsEditView />} />
        <Route path="/people" exact element={<PeopleView />} />
        <Route path="/area-management" element={<AreaManagement />} />
        <Route path="/assessment-scorecard-input" element={<AssessmentScorecardInput />} />
        <Route path="/area-details" element={<AreaDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
