import './login.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../../components/LoginForm/LoginForm';

const LoginView = () => {
  return (
    <div>
      {/* fluid container fills entire width and height */}
      <Container fluid className="vh-100">
        {/* row contains 12 columns, fills entire height */}
        <Row
          className="h-100"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* 8 Columns for left side with LoginForm */}
          <Col sm={{ span: 4, offset: 2 }}>
            <LoginForm />
          </Col>
          <Col sm={2}> </Col>

          {/* 4 Columns for right side with logo and images */}
          <Col sm={4} className="logoSide">
            LOGO AND IMAGES GO HERE
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
