import './school-management.css';
import React from 'react';
import { Nav } from 'react-bootstrap';

const SchoolManagement = () => {
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="schools">
        <Nav.Item>
          <Nav.Link eventKey="schools">Schools</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="admin">Admin</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="teachers">Teachers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="students">Students</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SchoolManagement;
