import './CreationPageTabs.css';
import React from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CreationPageTabs = ({ currentActiveTab }) => {
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey={currentActiveTab}>
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

CreationPageTabs.defaultProps = {
  currentActiveTab: '/sites',
};

CreationPageTabs.propTypes = {
  currentActiveTab: PropTypes.string,
};

export default CreationPageTabs;
