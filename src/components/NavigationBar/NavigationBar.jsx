import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from './tlp.png';
import './NavigationBar.css';
import { logout, useNavigate } from '../../common/auth/auth_utils';
import { Cookies, withCookies } from '../../common/auth/cookie_utils';

const NavigationBar = ({ cookies }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const handleLogOut = async () => {
    try {
      await logout('/login', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/area-management">
          <img src={Image} width="80" height="55" className="d-inline-block" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/area-management" style={{ color: '#6A91BC' }}>
              Area Management
            </Nav.Link>
            <Nav.Link href="/people" style={{ color: '#6A91BC' }}>
              People
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/settings" style={{ color: '#6A91BC' }}>
              Settings
            </Nav.Link>
            <Nav.Link href="/login" style={{ color: '#E53E3E' }} onClick={handleLogOut}>
              Log Out
            </Nav.Link>
            {/* on the off chance there is an error with logging out -- might need a better way to handle showing error */}
            {errorMessage && <p>{errorMessage}</p>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(NavigationBar);
