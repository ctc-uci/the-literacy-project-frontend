import './login.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../assets/tlp.png';

const LoginView = () => {
  return (
    <div>
      {/* fluid container, fills entire width and height */}
      <Container fluid className="vh-100">
        {/* THIS ROW IS SHOWN ON A MONITOR AND HIDDEN ON MOBILE */}
        <Row
          className="h-100 monitorView"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* columns for LoginForm, LEFT SIDE */}
          <Col sm={{ span: 4, offset: 2 }} className="loginSide">
            <LoginForm />
          </Col>

          {/* columns for logo and images, RIGHT SIDE */}
          <Col sm={{ span: 4, offset: 2 }} className="logoSide">
            <img id="logo1" src={Logo} alt="TLP Logo" />
          </Col>
        </Row>

        {/* THIS ROW IS HIDDEN ON MONITOR AND SHOWN ON MOBILE */}
        <Row
          className="h-100 mobileView"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col sm={{ span: 8 }} className="mobileCol">
            <img id="logo1" src={Logo} alt="TLP Logo" />
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
