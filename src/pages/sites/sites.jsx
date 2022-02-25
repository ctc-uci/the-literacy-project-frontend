import React, { useState } from 'react';
import { Dropdown, Button, DropdownButton, Card } from 'react-bootstrap';
import './sites.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';

const SiteView = () => {
  const [areaDropdownTitle, setAreaDropdownTitle] = useState('Bellevue SD');
  const [schoolYearDropdownTitle, setSchoolYearDropdownTitle] = useState('Cycle 1');
  const [modalIsOpen, setModalOpen] = useState(false);

  const theadData = [
    {
      headerTitle: 'Site Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Master Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
    {
      headerTitle: 'Additional Info',
      headerPopover: '',
    },
  ];
  const tbodyData = [
    {
      id: 1,
      items: ['Test Name', 'Master Teacher A', 'Active', 'Temp'],
    },
  ];

  const changeAreaTitle = event => {
    setAreaDropdownTitle(event.target.textContent);
  };
  const changeSchoolYearTitle = event => {
    setSchoolYearDropdownTitle(event.target.textContent);
  };

  return (
    <div className="site-container">
      <div>
        <h1>Areas</h1>
        <div className="school-year-info">
          <h1>School Year</h1>
          <input type="text" list="school-year" className="school-year-input" />
          <datalist id="school-year">
            <option value="2021-2022" aria-label="2021-2022" />
            <option value="2020-2021" aria-label="2020-2021" />
            <option value="2019-2020" aria-label="2019-2020" />
          </datalist>
          <h2>Cycle</h2>
          <DropdownButton drop="down" title={schoolYearDropdownTitle} variant="primary">
            <Dropdown.Item eventKey="1" onClick={e => changeSchoolYearTitle(e)}>
              Cycle 1
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={e => changeSchoolYearTitle(e)}>
              Cycle 2
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={e => changeSchoolYearTitle(e)}>
              Cycle 3
            </Dropdown.Item>
            <Dropdown.Item eventKey="4" onClick={e => changeSchoolYearTitle(e)}>
              Cycle 4
            </Dropdown.Item>
          </DropdownButton>
          <div className="search-school">
            <input type="text" placeholder="Search All Schools" />
            <Button variant="primary">Search</Button>
          </div>
        </div>
        <div>
          <Button
            variant="warning"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            New Area
            <img className="plus__icon" src={Plus} alt="Plus Icon" />
          </Button>
          <CreateAreaModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
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
            sectionTitle="Sites"
            theadData={theadData}
            tbodyData={tbodyData}
            tbodyColIsBadge={[1]}
          />
        </div>
      </div>
      <div className="data">
        <Button variant="primary">Export to CSV</Button>
        <h2>Data</h2>
        <h3>Average Scores</h3>
        {/* placeholder for graph */}
        <Card className="graph" />
        <Card className="stats">
          <p>40 Students</p>
          <p>4 Teachers</p>
          <p>4 Sites</p>
        </Card>
      </div>
    </div>
  );
};

export default SiteView;
