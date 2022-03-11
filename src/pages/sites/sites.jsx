import React, { useState } from 'react';
import { Button, Card, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import './sites.css';
// import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import { BsFillCaretDownFill, BsPeople, BsFilterRight } from 'react-icons/bs';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import NavigationBarTwo from '../../components/NavigationBarTwo/NavigationBarTwo';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';

const SiteView = () => {
  // const [areaDropdownTitle, setAreaDropdownTitle] = useState('Bellevue SD');
  const [modalIsOpen, setModalOpen] = useState(false);
  const [schoolYear, setSchoolYear] = useState('2020-21');

  const areas = [
    {
      area_id: 1,
      area_name: 'Bellevue SD',
      area_stats: {
        student_count: 15,
        master_teacher_count: 2,
        site_count: 2,
      },
      area_sites: [
        {
          site_id: 1,
          site_name: 'Highland Middle School',
        },
        {
          site_id: 2,
          site_name: 'Odle Middle School',
        },
        {
          site_id: 3,
          site_name: 'Odle Middle School',
        },
        {
          site_id: 4,
          site_name: 'Odle Middle School',
        },
        {
          site_id: 5,
          site_name: 'Odle Middle School',
        },
      ],
    },
    {
      area_id: 2,
      area_name: 'Irvine Unified School District',
      area_stats: {
        student_count: 30,
        master_teacher_count: 22,
        site_count: 5,
      },
      area_sites: [],
    },
  ];

  function mapAreas() {
    return areas.map(area => {
      return (
        <AreaDropdown
          areaId={area.area_id}
          areaName={area.area_name}
          areaStats={area.area_stats}
          areaSites={area.area_sites}
          key={`area-dropdown-${area.area_id}`}
        />
      );
    });
  }

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);
  };

  // const theadData = [
  //   {
  //     headerTitle: 'Site Name',
  //     headerPopover: '',
  //   },
  //   {
  //     headerTitle: 'Master Teacher',
  //     headerPopover: '',
  //   },
  //   {
  //     headerTitle: 'Status',
  //     headerPopover:
  //       "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
  //   },
  //   {
  //     headerTitle: 'Additional Info',
  //     headerPopover: '',
  //   },
  // ];
  // const tbodyData = [
  //   {
  //     id: 1,
  //     items: ['Test Name', 'Master Teacher A', 'Active', 'Temp'],
  //   },
  // ];

  // const changeAreaTitle = event => {
  //   setAreaDropdownTitle(event.target.textContent);
  // };

  return (
    <div>
      <NavigationBarTwo />
      <div className="site-container">
        <h1>Areas</h1>
        <div className="area-content">
          <div className="site-container-information">
            <div className="school-year-info">
              <div className="school-year-container">
                <h1>School Year</h1>
                <DropdownButton
                  variant="outline-secondary"
                  title={schoolYear}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item
                    onClick={() => {
                      updateSchoolYear('2021-22');
                    }}
                  >
                    2021-22
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateSchoolYear('2020-21');
                    }}
                  >
                    2020-21
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateSchoolYear('2019-20');
                    }}
                  >
                    2019-20
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="search-school">
                <InputGroup>
                  <FormControl
                    className="search-school-search-bar"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-school-search-icon"
                  />
                  <InputGroup.Text id="search-school-search-icon">
                    <BsFilterRight />
                  </InputGroup.Text>
                </InputGroup>
                <Button variant="primary">Search</Button>
              </div>
            </div>
            <div className="area-button-options-container">
              <Button
                variant="warning"
                className="create-new-area-button"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <img className="plus__icon" src={Plus} alt="Plus Icon" />
                New Area
              </Button>
              <CreateAreaModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
              <Button
                variant="primary"
                className="create-new-area-button"
                onClick={() => {
                  console.log('needs functionality');
                }}
              >
                Sort By: A-Z <BsFillCaretDownFill />
              </Button>
            </div>
            {mapAreas()}
          </div>
          <div className="sites-data">
            <Button variant="primary">Export to CSV</Button>
            <p>All Areas</p>
            <p>Year: 2021-22 Cycle: 1</p>
            <p>
              <strong>Average Growth in Reading</strong>
            </p>
            {/* placeholder for graph */}
            <Card className="sites-graph" />
            <Card className="area-data-stats">
              <p>
                <BsPeople /> 40 Students
              </p>
              <p>
                <img
                  className="area-dropdown__open__area_stats__section-icon"
                  src={TeacherIcon}
                  alt="Teacher Icon"
                />
                4 Teachers
              </p>
              <p>
                <img
                  className="area-dropdown__open__area_stats__section-icon"
                  src={SchoolIcon}
                  alt="School Icon"
                />
                4 Sites
              </p>
            </Card>
          </div>
          {/* <div>
            <ManagementDataSection
              sectionTitle="Sites"
              theadData={theadData}
              tbodyData={tbodyData}
              tbodyColIsBadge={[1]}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SiteView;
