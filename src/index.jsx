import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

// page imports
import SchoolView from './pages/schools/schools';
import SchoolsCreateView from './pages/schools-create/schools-create';
import SchoolsExportDataView from './pages/schools-export-data/schools-export-data';
import AdminAccountView from './pages/admin-account/admin-account';
import AssignStudentsView from './pages/assign-students/assign-students';
import StudentView from './pages/students/students';
import StudentsCreateView from './pages/students-create/students-create';
import StudentsEditView from './pages/students-edit/students-edit';
import StudentsExportDataView from './pages/students-export-data/students-export-data';
import LoginView from './pages/login/login';
import LoginResetPasswordView from './pages/login-reset-password/login-reset-password';
import LoginTeacherStartView from './pages/login-teacher-start/login-teacher-start';
import DashboardView from './pages/dashboard/dashboard';
import TeacherView from './pages/teachers/teachers';
import TeachersConfirmation from './pages/teachers-confirm/teachers-confirm';
import TeachersCreateView from './pages/teachers-create/teachers-create';
import TeachersEditView from './pages/teachers-edit/teachers-edit';
import TeachersExportDataView from './pages/teachers-export-data/teachers-export-data';
import TeachersRemoveTeacherView from './pages/teachers-remove-teacher/teachers-remove-teacher';
import SettingsView from './pages/settings/settings';
import SettingsChangePasswordView from './pages/settings-change-password/settings-change-password';
import SettingsEditView from './pages/settings-edit/settings-edit';
import AdminCreateView from './pages/admin-create-account/admin-create';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/schools" exact element={<SchoolView />} />
        <Route path="/schools/create" exact element={<SchoolsCreateView />} />
        <Route path="/admin/account" exact element={<AdminAccountView />} />
        <Route path="/schools/assign-students" exact element={<AssignStudentsView />} />
        <Route path="/schools/export-data" exact element={<SchoolsExportDataView />} />
        <Route path="/students" exact element={<StudentView />} />
        <Route path="/students/create" exact element={<StudentsCreateView />} />
        <Route path="/students/edit" exact element={<StudentsEditView />} />
        <Route path="/students/export-data" exact element={<StudentsExportDataView />} />
        <Route path="/login" exact element={<LoginView />} />
        <Route path="/login/reset-password" exact element={<LoginResetPasswordView />} />
        <Route path="/login/teacher-start/:id" exact element={<LoginTeacherStartView />} />
        <Route path="/dashboard" exact element={<DashboardView />} />
        <Route path="/teachers" exact element={<TeacherView />} />
        <Route path="/teachers/confirm" exact element={<TeachersConfirmation />} />
        <Route path="/teachers/create" exact element={<TeachersCreateView />} />
        <Route path="/teachers/edit" exact element={<TeachersEditView />} />
        <Route path="/teachers/export-data" exact element={<TeachersExportDataView />} />
        <Route path="/teachers/remove-teacher" exact element={<TeachersRemoveTeacherView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/settings/change-password" element={<SettingsChangePasswordView />} />
        <Route path="/settings/edit" element={<SettingsEditView />} />
        <Route path="/admin/create-account/confirmation" element={<AdminCreateView />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
