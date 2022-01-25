import React, { useState } from 'react';
import { Dropdown, Button, DropdownButton } from 'react-bootstrap';
import './sites.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const SiteView = () => {
  const [areaDropdownTitle, setAreaDropdownTitle] = useState('Bellevue SD');
  const [schoolYearDropdownTitle, setSchoolYearDropdownTitle] = useState('Cycle 1');

  const theadData = ['Name', 'Schools', 'Status'];
  const tbodyData = [
    {
      id: 1,
      items: ['Test Name', 'Test School', 'Active'],
    },
  ];

  const changeAreaTitle = event => {
    setAreaDropdownTitle(event.target.textContent);
  };
  const changeSchoolYearTitle = event => {
    setSchoolYearDropdownTitle(event.target.textContent);
  };

  return (
    <div>
      <div>
        <h1>School Year</h1>
        <DropdownButton drop="down" title={schoolYearDropdownTitle} variant="primary">
          <Dropdown.Item eventKey="1" onClick={e => changeSchoolYearTitle(e)}>
            Cycle 2
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={e => changeSchoolYearTitle(e)}>
            Cycle 3
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={e => changeSchoolYearTitle(e)}>
            Cycle 4
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={e => changeSchoolYearTitle(e)}>
            Cycle 5
          </Dropdown.Item>
        </DropdownButton>
        <input type="text" placeholder="Search All Schools" />
        <Button variant="primary">Search</Button>
      </div>
      <div>
        <h1>Area</h1>
        <DropdownButton drop="down" title={areaDropdownTitle} variant="primary">
          <Dropdown.Item eventKey="1" onClick={e => changeAreaTitle(e)}>
            Bellvue SD
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={e => changeAreaTitle(e)}>
            View All
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3" onClick={e => changeAreaTitle(e)}>
            Edit District
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={e => changeAreaTitle(e)}>
            Add New District
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div>
        <ManagementDataSection
          sectionTitle="Master Teacher"
          theadData={theadData}
          tbodyData={tbodyData}
        />
        <ManagementDataSection sectionTitle="Sites" theadData={theadData} tbodyData={tbodyData} />
      </div>
    </div>
  );
};

export default SiteView;
