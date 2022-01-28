import './login.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../../components/LoginForm/LoginForm';

import Logo from './tlp.png';

const LoginView = () => {
  return (
    <div>
      {/* fluid container, fills entire width and height */}
      <Container fluid className="vh-100">
        {/* Row contains 12 columns, fills entire height */}
        <Row
          className="h-100"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* 8 Columns for LoginForm on left */}
          <Col sm={{ span: 4, offset: 2 }}>
            <LoginForm />
          </Col>
          <Col sm={2}> </Col>

          {/* 4 Columns for logo and images on right */}
          <Col sm={4} className="logoSide">
            <img
              id="logo1"
              src={Logo}
              width="454px"
              height="342px"
              className="d-inline-block img-fluid shadow-4"
              alt=""
              top="100px"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
