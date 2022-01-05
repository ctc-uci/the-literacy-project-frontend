import './login-teacher-start.css';
import React from 'react';
import { useParams } from 'react-router';

const LoginTeacherStartView = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 className="login-teacher-start-view">Login Teacher Start View - {id} </h1>
    </div>
  );
};

export default LoginTeacherStartView;
