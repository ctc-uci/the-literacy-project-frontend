import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

// TEMPORARILY JUST SHOWS THE RECOVER PASSWORD EMAIL SUBMIT COMPONENT
// AND UNDER IT IS THE RECOVERY CONFIRMED COMPONENT

// TO BE ADDED: reset-password component with inputs, then connect the pieces to appear in order one at a time
const LoginResetPasswordView = () => {
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
              <ResetPassword />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginResetPasswordView;
