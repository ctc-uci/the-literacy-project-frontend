import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

// page imports
import SiteView from './pages/sites/sites';
import SitesCreateView from './pages/sites-create/sites-create';
import SitesExportDataView from './pages/sites-export-data/sites-export-data';
import AssignStudentsView from './pages/assign-students/assign-students';
import StudentView from './pages/students/students';
import StudentsCreateView from './pages/students-create/students-create';
import StudentsEditView from './pages/students-edit/students-edit';
import StudentsExportDataView from './pages/students-export-data/students-export-data';
import LoginView from './pages/login/login';
import LoginResetPasswordView from './pages/login-reset-password/login-reset-password';
import LoginTeacherStartView from './pages/login-teacher-start/login-teacher-start';
import DashboardView from './pages/dashboard/dashboard';
import TeacherView from './pages/master-teachers/master-teachers';
import TeachersConfirmation from './pages/master-teachers-confirm/master-teachers-confirm';
import TeachersCreateView from './pages/master-teachers-create/master-teachers-create';
import TeachersEditView from './pages/master-teachers-edit/master-teachers-edit';
import TeachersExportDataView from './pages/master-teachers-export-data/master-teachers-export-data';
import TeachersRemoveTeacherView from './pages/master-teachers-remove-master-teacher/master-teachers-remove-teacher';
import SettingsView from './pages/settings/settings';
import SettingsChangePasswordView from './pages/settings-change-password/settings-change-password';
import SettingsEditView from './pages/settings-edit/settings-edit';
import AdminView from './pages/admin/admin';
import AreaManagement from './pages/area-management/area-management';
import SchoolManagement from './pages/sites-management/sites-management';
import AdminAccountView from './pages/admin-account/admin-account';
import AdminCreateView from './pages/admin-create-account/admin-create';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/sites" exact element={<SiteView />} />
        <Route path="/sites/create" exact element={<SitesCreateView />} />
        <Route path="/sites/assign-students" exact element={<AssignStudentsView />} />
        <Route path="/sites/export-data" exact element={<SitesExportDataView />} />
        <Route path="/students" exact element={<StudentView />} />
        <Route path="/students/create" exact element={<StudentsCreateView />} />
        <Route path="/students/edit" exact element={<StudentsEditView />} />
        <Route path="/students/export-data" exact element={<StudentsExportDataView />} />
        <Route path="/login" exact element={<LoginView />} />
        <Route path="/login/reset-password" exact element={<LoginResetPasswordView />} />
        <Route path="/login/master-teacher-start/:id" exact element={<LoginTeacherStartView />} />
        <Route path="/dashboard" exact element={<DashboardView />} />
        <Route path="/master-teachers" exact element={<TeacherView />} />
        <Route path="/master-teachers/confirm" exact element={<TeachersConfirmation />} />
        <Route path="/master-teachers/create" exact element={<TeachersCreateView />} />
        <Route path="/master-teachers/edit" exact element={<TeachersEditView />} />
        <Route path="/master-teachers/export-data" exact element={<TeachersExportDataView />} />
        <Route
          path="/master-teacher/remove-teacher"
          exact
          element={<TeachersRemoveTeacherView />}
        />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/settings/change-password" element={<SettingsChangePasswordView />} />
        <Route path="/settings/edit" element={<SettingsEditView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/area-management" element={<AreaManagement />} />
        <Route path="/sites/management" exact element={<SchoolManagement />} />
        <Route path="/admin/account" element={<AdminAccountView />} />
        <Route path="/admin/create" element={<AdminCreateView />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
