import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Image from './tlp.png';
import styles from './NavigationBar.module.css';
import { logout, useNavigate } from '../../common/auth/auth_utils';
import { Cookies, withCookies, cookieKeys } from '../../common/auth/cookie_utils';
import { AUTH_ROLES, ADMIN_USER_GUIDE, MT_USER_GUIDE } from '../../common/config';

const NavigationBar = ({ cookies }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const userRole = cookies.get(cookieKeys.POSITION);

  const handleLogOut = async () => {
    try {
      await logout('/login', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  /*
  const searchForStudent = event => {
    if (event.key === 'Enter') {
      console.log('Need to implement search feature.');
    }
  };
  */

  return (
    <Navbar className={styles.nav} expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={Image} width="80" height="55" className={styles['d-inline-block']} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userRole === AUTH_ROLES.ADMIN_ROLE ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: 'white' }}>
                  Area Management
                </Nav.Link>
                <Nav.Link href="/people" style={{ color: 'white' }}>
                  People
                </Nav.Link>
                <Nav.Link href="/settings" style={{ color: 'white' }}>
                  Settings
                </Nav.Link>
                <Nav.Link
                  href={ADMIN_USER_GUIDE}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: 'white' }}
                >
                  Help
                </Nav.Link>
              </Nav>
              <Nav className={styles['mr-auto']}>
                <Nav.Link style={{ color: 'white' }} onClick={handleLogOut}>
                  Logout
                </Nav.Link>
                {/* on the off chance there is an error with logging out -- might need a better way to handle showing error */}
                {errorMessage && <p>{errorMessage}</p>}
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: 'white' }}>
                  Home
                </Nav.Link>
                <Nav.Link href="/settings" style={{ color: 'white' }}>
                  Settings
                </Nav.Link>
                <Nav.Link
                  href={MT_USER_GUIDE}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: 'white' }}
                >
                  Help
                </Nav.Link>
              </Nav>
              <Nav className={styles['mr-auto']}>
                <InputGroup>
                  <FormControl
                    className={styles['student-search-bar']}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-school-search-icon"
                  />
                  <InputGroup.Text id={styles['student-search-icon']}>
                    <BsSearch />
                  </InputGroup.Text>
                </InputGroup>
                <Nav.Link style={{ color: 'white' }} onClick={handleLogOut}>
                  Logout
                </Nav.Link>
                {/* on the off chance there is an error with logging out -- might need a better way to handle showing error */}
                {errorMessage && <p>{errorMessage}</p>}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(NavigationBar);
