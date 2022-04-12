import './login.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginView = () => {
  return (
    <div>
      <Container fluid className="vh-100">
        {/* THIS ROW DISPLAYS RECOVER PASSWORD COMPONENT */}
        <Row
          className="h-100"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col sm={4}>
            <div>
              <LoginForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
