import React, { useState, useEffect } from 'react';
import { Button, Card, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillCaretDownFill, BsPeople, BsFilterRight, BsFilter } from 'react-icons/bs';
import { TLPBackend } from '../../common/utils';
import styles from './area-management.module.css';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';

const AreaManagement = () => {
  // const [areaDropdownTitle, setAreaDropdownTitle] = useState('Bellevue SD');
  const [modalIsOpen, setModalOpen] = useState(false);
  const [areaResponseData, setAreaResponseData] = useState([]);
  const [schoolYear, setSchoolYear] = useState('2020-21');

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

  function mapAreas() {
    return areaResponseData.map(area => {
      return (
        <AreaDropdown
          areaId={area.areaId}
          areaActive={area.active}
          areaName={area.areaName}
          areaStats={{
            student_count: 15,
            master_teacher_count: 2,
            site_count: 2,
          }}
          areaSites={area.area_sites}
          key={`area-dropdown-${area.areaId}`}
        />
      );
    });
  }

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);
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
    fetchAreas();
  }, []);

  return (
    <div>
      <div className={styles['site-container']}>
        <h1>Areas</h1>
        <div className={styles['area-content']}>
          <div className={styles['site-container-information']}>
            <div className={styles['school-year-info']}>
              <div className={styles['school-year-container']}>
                <h2>School Year</h2>
                <DropdownButton
                  variant="outline-secondary"
                  title={schoolYear}
                  className={styles['school-year-dropdown']}
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
              <div className={styles['search-school']}>
                <InputGroup>
                  <FormControl
                    className={styles['search-school-search-bar']}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-school-search-icon"
                  />
                  <InputGroup.Text id={styles['search-school-search-icon']}>
                    <BsFilterRight />
                  </InputGroup.Text>
                </InputGroup>
                <Button
                  variant="primary"
                  className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                >
                  Search
                </Button>
              </div>
            </div>
            <div className={styles['area-button-options-container']}>
              <Button
                variant="warning"
                className={styles['create-new-area-button']}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
                New Area
              </Button>
              <CreateAreaModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
              <div className={styles['area-button-options-right']}>
                <Button
                  variant="primary"
                  className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                  onClick={() => {}}
                >
                  Filter By <BsFilter />
                </Button>
                <Button
                  variant="primary"
                  className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                  onClick={() => {}}
                >
                  Sort By: A-Z <BsFillCaretDownFill />
                </Button>
              </div>
            </div>
            {mapAreas()}
          </div>
          <div className={styles['sites-data']}>
            <Button
              variant="primary"
              className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
            >
              Export to CSV
            </Button>
            <p>All Areas</p>
            <p>Year: 2021-22 Cycle: 1</p>
            <p>
              <strong>Average Growth in Reading</strong>
            </p>
            {/* placeholder for graph */}
            <Card className={styles['sites-graph']} />
            <Card className={styles['area-data-stats']}>
              <p>
                <BsPeople /> 40 Students
              </p>
              <p>
                <img
                  className={styles['area-dropdown__open__area_stats__section-icon']}
                  src={TeacherIcon}
                  alt="Teacher Icon"
                />
                4 Teachers
              </p>
              <p>
                <img
                  className={styles['area-dropdown__open__area_stats__section-icon']}
                  src={SchoolIcon}
                  alt="School Icon"
                />
                4 Sites
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaManagement;
