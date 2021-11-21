import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

// page imports
import StudentView from './pages/students/students';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/students" exact element={<StudentView />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
