import './CreationPageTabs.css';
import React from 'react';
import { Nav } from 'react-bootstrap';

const CreationPageTabs = () => {
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/sites">
        <Nav.Item>
          <Nav.Link href="/sites">Sites</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/teachers">Teachers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/students">Students</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default CreationPageTabs;
