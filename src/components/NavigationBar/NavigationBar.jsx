import React, { useState } from 'react';
import { instanceOf, PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Image from './tlp.png';
import styles from './NavigationBar.module.css';
import { logout, useNavigate } from '../../common/auth/auth_utils';
import { Cookies, withCookies } from '../../common/auth/cookie_utils';

const NavigationBar = ({ cookies, roles }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [userRole] = useState(cookies.cookies.position);

  const handleLogOut = async () => {
    try {
      await logout('/login', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const searchForStudent = event => {
    if (event.key === 'Enter') {
      console.log('Need to implement search feature.');
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href={roles.ADMIN_ROLE === 'admin' ? '/area-management' : '/home'}>
          <img src={Image} width="80" height="55" className={styles['d-inline-block']} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userRole === roles.ADMIN_ROLE ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/area-management" style={{ color: '#6A91BC' }}>
                  Area Management
                </Nav.Link>
                <Nav.Link href="/people" style={{ color: '#6A91BC' }}>
                  People
                </Nav.Link>
                <Nav.Link href="/settings" style={{ color: '#6A91BC' }}>
                  Settings
                </Nav.Link>
                <Nav.Link href="/help" style={{ color: '#6A91BC' }}>
                  Help
                </Nav.Link>
              </Nav>
              <Nav className={styles['mr-auto']}>
                <Nav.Link href="/login" style={{ color: '#E53E3E' }} onClick={handleLogOut}>
                  Logout
                </Nav.Link>
                {/* on the off chance there is an error with logging out -- might need a better way to handle showing error */}
                {errorMessage && <p>{errorMessage}</p>}
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/home" style={{ color: '#6A91BC' }}>
                  Home
                </Nav.Link>
                <Nav.Link href="/settings" style={{ color: '#6A91BC' }}>
                  Settings
                </Nav.Link>
                <Nav.Link href="/help" style={{ color: '#6A91BC' }}>
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
                    onKeyPress={searchForStudent}
                  />
                  <InputGroup.Text id={styles['student-search-icon']}>
                    <BsSearch />
                  </InputGroup.Text>
                </InputGroup>
                <Nav.Link href="/login" style={{ color: '#E53E3E' }} onClick={handleLogOut}>
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

NavigationBar.defaultProps = {
  roles: 'master teacher',
};

NavigationBar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  roles: PropTypes.objectOf(PropTypes.string),
};

export default withCookies(NavigationBar);
