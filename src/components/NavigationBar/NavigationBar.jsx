import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from './tlp.png';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img src={Image} width="100" height="75" className="d-inline-block" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard" style={{ color: '#6A91BC' }}>
              Home
            </Nav.Link>
            <Nav.Link href="/dashboard" style={{ color: '#6A91BC' }}>
              Area Management
            </Nav.Link>
            <Nav.Link href="/settings" style={{ color: '#6A91BC' }}>
              Settings
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
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
