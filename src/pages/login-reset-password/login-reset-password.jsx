import React from 'react';
import './login-reset-password.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const LoginResetPasswordView = () => {
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
          {/* 4 Columns for right side with logo and images */}
          <Col sm={4}>
            <div>
              {/* body of LoginForm */}
              <div className="formWrapper">
                <h1 className="title">
                  {' '}
                  Recover <br /> Password{' '}
                </h1>

                {/* email input and label */}
                <form>
                  <div className="emailInput">
                    <label htmlFor="email">
                      Enter your email and instructions will be sent to recover your password.
                      <br />
                      <input type="text" id="email" placeholder="Email Address" />
                    </label>
                  </div>
                  {/* submit button */}
                  <input id="submitButton" type="submit" value="Send Email" />
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginResetPasswordView;
