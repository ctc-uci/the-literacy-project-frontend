import React, { useState, useEffect } from 'react';
import { Dropdown, Button, DropdownButton, Card } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';
import './sites.css';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';

const SiteView = () => {
  const [schoolYearDropdownTitle, setSchoolYearDropdownTitle] = useState('Cycle 1');
  const [modalIsOpen, setModalOpen] = useState(false);
  const [areaResponseData, setAreaResponseData] = useState([]);
  // THIS IS ALL STUDENTS - LEAVE A GITHUB COMMENT ON THIS (template for teachers and areas)
  // filter by area id?? see if student is in site in the area
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const areaHeaders = [
    { label: 'Area ID', key: 'areaId' },
    { label: 'Area Name', key: 'areaName' },
    { label: 'Is Active?', key: 'active' },
  ];
  const areaData = TLPBackend.get('/areas');
  console.log(areaData);
  const areaCsvReport = {
    data: `${areaData}`,
    headers: areaHeaders,
    filename: `Areas_Report.csv`,
  };

  const addAssociatedSiteToArea = async resData => {
    async function fetchAllSites() {
      // eslint-disable-next-line no-plusplus
      for (let ind = 0; ind < resData.length; ind++) {
        TLPBackend.get(`/sites/area/${resData[ind].areaId}`)
          .then(res => {
            // eslint-disable-next-line no-param-reassign
            resData[ind].area_sites = res.data;
          })
          .catch(() => {});
      }
    }
    await fetchAllSites();
    setTimeout(() => {
      setAreaResponseData(resData);
    }, 2000);
  };

  function mapAreas(studentCount) {
    return areaResponseData.map(area => {
      return (
        <AreaDropdown
          areaId={area.areaId}
          areaName={area.areaName}
          areaStats={{
            student_count: studentCount,
            master_teacher_count: 2,
            site_count: 2,
          }}
          areaSites={area.area_sites}
          key={`area-dropdown-${area.areaId}`}
        />
      );
    });
  }

  const changeSchoolYearTitle = event => {
    setSchoolYearDropdownTitle(event.target.textContent);
  };

  useEffect(() => {
    async function fetchAreas() {
      await TLPBackend.get('/areas')
        .then(res => {
          setTimeout(() => {
            addAssociatedSiteToArea(res.data);
          }, 1000);
        })
        .catch(() => {});
    }

    // FIX THIS TOO
    async function getAllStudentCount() {
      await TLPBackend.get('/students')
        .then(res => {
          setTimeout(() => {
            setStudents(res.data);
          }, 1000);
        })
        .catch(() => {});
    }

    async function getAllTeacherCount() {
      await TLPBackend.get('/teachers')
        .then(res => {
          setTimeout(() => {
            setTeachers(res.data);
          }, 1000);
        })
        .catch(() => {});
    }

    fetchAreas();
    getAllStudentCount();
    getAllTeacherCount();
  }, []);

  return (
    <div>
      <NavigationBar />
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
          </div>
          {mapAreas(students.length, teachers.count)}
        </div>
        <div className="data">
          <Button variant="primary">
            <CSVLink {...areaCsvReport} class="csvLink">
              Export to CSV
            </CSVLink>
          </Button>
          <h2>Data</h2>
          <h3>Average Scores</h3>
          {/* placeholder for graph */}
          <Card className="graph" />
          <Card className="stats">
            <p>{students.length} Students</p>
            <p>{teachers.length} Teachers</p>
            <p>4 Sites</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteView;
