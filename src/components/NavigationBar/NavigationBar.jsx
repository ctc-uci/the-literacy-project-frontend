import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from './tlp.png';
import './NavigationBar.css';

function NavigationBar() {
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
            <Nav.Link href="/login" style={{ color: '#E53E3E' }}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
