import './schools.css';
import React from 'react';

import NavigationBar from '../../components/NavigationBar/NavigationBar';

const SchoolView = () => {
  return (
    <div>
      <NavigationBar />
      <h1 className="school-view">School View</h1>
    </div>
  );
};

export default SchoolView;
