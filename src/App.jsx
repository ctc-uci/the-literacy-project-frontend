import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  navigate('/');
  return <div className="App">hi</div>;
}

export default App;
