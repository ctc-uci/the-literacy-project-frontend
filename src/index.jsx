import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

// page imports
import StudentView from './pages/students/students';
import LoginView from './pages/login/login';
import LoginResetPasswordView from './pages/login-reset-password/login-reset-password';
import LoginTeacherStartView from './pages/login-teacher-start/login-teacher-start';
import DashboardView from './pages/dashboard/dashboard';
import TeacherView from './pages/teachers/teachers';
import TeachersCreateView from './pages/teachers-create/teachers-create';
import TeachersEditView from './pages/teachers-edit/teachers-edit';
import TeachersExportDataView from './pages/teachers-export-data/teachers-export-data';
import TeachersRemoveTeacherView from './pages/teachers-remove-teacher/teachers-remove-teacher';
import SettingsView from './pages/settings/settings';
import SettingsChangePasswordView from './pages/settings-change-password/settings-change-password';
import SettingsEditView from './pages/settings-edit/settings-edit';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/students" exact element={<StudentView />} />
        <Route path="/login" exact element={<LoginView />} />
        <Route path="/login/reset-password" exact element={<LoginResetPasswordView />} />
        <Route path="/login/teacher-start/:id" exact element={<LoginTeacherStartView />} />
        <Route path="/dashboard" exact element={<DashboardView />} />
        <Route path="/teachers" exact element={<TeacherView />} />
        <Route path="/teachers/create" exact element={<TeachersCreateView />} />
        <Route path="/teachers/edit" exact element={<TeachersEditView />} />
        <Route path="/teachers/export-data" exact element={<TeachersExportDataView />} />
        <Route path="/teachers/remove-teacher" exact element={<TeachersRemoveTeacherView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/settings/change-password" element={<SettingsChangePasswordView />} />
        <Route path="/settings/edit" element={<SettingsEditView />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
