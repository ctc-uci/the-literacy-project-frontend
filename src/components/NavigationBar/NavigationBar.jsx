import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from './tlp.png';
import styles from './NavigationBar.module.css';
import { logout, useNavigate } from '../../common/auth/auth_utils';
import { Cookies, withCookies, cookieKeys } from '../../common/auth/cookie_utils';
import { AUTH_ROLES } from '../../common/config';

const NavigationBar = ({ cookies }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const role = decodeURIComponent(cookies.get(cookieKeys.POSITION));

  const handleLogOut = async () => {
    try {
      await logout('/login', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // get role from cookies and display the corresponding nav bar
  if (role === AUTH_ROLES.ADMIN_ROLE) {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={Image} width="80" height="55" className={styles['d-inline-block']} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: '#6A91BC' }}>
                Area Management
              </Nav.Link>
              <Nav.Link href="/people" style={{ color: '#6A91BC' }}>
                People
              </Nav.Link>
            </Nav>
            <Nav className={styles['mr-auto']}>
              <Nav.Link href="/settings" style={{ color: '#6A91BC' }}>
                Settings
              </Nav.Link>
              <Nav.Link href="/login" style={{ color: '#E53E3E' }} onClick={handleLogOut}>
                Logout
              </Nav.Link>
              {/* on the off chance there is an error with logging out -- might need a better way to handle showing error */}
              {errorMessage && <p>{errorMessage}</p>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  // If MT, display the navbar below
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={Image} width="80" height="55" className={styles['d-inline-block']} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles['mr-auto']}>
            <Nav.Link href="/" style={{ color: '#6A91BC' }}>
              Home
            </Nav.Link>
            <Nav.Link href="/settings" style={{ color: '#6A91BC' }}>
              Settings
            </Nav.Link>
          </Nav>
          <Nav className={styles['ms-auto']}>
            <form className={styles['form-inline']}>
              <input
                className={styles['form-control mr-sm-2']}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <Nav.Link href="/login" style={{ color: '#E53E3E' }} onClick={handleLogOut}>
              Logout
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
