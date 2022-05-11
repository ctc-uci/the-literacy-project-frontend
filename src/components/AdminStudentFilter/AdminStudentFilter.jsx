import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AdminStudentFilter.module.css';

function AdminStudentFilter(props) {
  const { isOpen, setIsOpen, areas, sites, years, grades, filters, setFilters } = props;
  const [showAreas, setShowAreas] = useState([]);
  const [showSites, setShowSites] = useState([]);
  const [showYears, setShowYears] = useState([]);
  const [showGrades, setShowGrades] = useState([]);

  useEffect(() => {
    if (filters.areas) {
      // There is a filter for the areas
      setShowAreas(
        areas
          .map(area => {
            return { areaName: area };
          }) // Convert area names to a mocked list of area objects
          .filter(area => showAreas.includes(area.areaName)) // Apply the areas filter to the list
          .map(area => area.areaName), // Convert the areas back to a list of strings
      );
    } else {
      // There is no filter for the areas
      // setShowAreas to the full list of areas
      setShowAreas(areas);
    }
    if (filters.sites) {
      // There is a filter for the sites
      setShowSites(
        sites
          .map(site => {
            return { siteName: site };
          }) // Convert site names to a mocked list of site objects
          .filter(site => showSites.includes(site.siteName)) // Apply the sites filter to the list
          .map(site => site.siteName), // Convert the sites back to a list of strings
      );
    } else {
      // There is no filter for the sites
      // setShowSites to the full list of sites
      setShowSites(sites);
    }
    if (filters.years) {
      // There is a filter for years
      setShowYears(
        years
          .map(year => {
            return { enrolledYear: year };
          }) // Convert years to a mocked list of year objects
          .filter(year => showYears.includes(year.enrolledYear)) // Apply the years filter to the list
          .map(year => year.enrolledYear), // Convert the years back to a list of strings
      );
    } else {
      // There is no filter for the years
      // setShowYears to the full list of years
      setShowYears(years);
    }
    if (filters.grades) {
      // There is a filter for grades
      setShowGrades(
        grades
          .map(grade => {
            return { gradeLevel: grade };
          }) // Convert grade levels to a mocked list of grade objects
          .filter(grade => showGrades.includes(grade.gradeLevel)) // Apply the grades filter to the list
          .map(grade => grade.gradeLevel), // Convert the grades back to a list of strings
      );
    } else {
      // There is no filter for the grades
      // setShowGrades to the full list of grades
      setShowGrades(grades);
    }
  }, [areas, sites, years, grades]);

  /**
   * @returns true if all areas are checked
   */
  const areAllAreasChecked = () => {
    return areas.length === showAreas.length;
  };

  /**
   * @returns true if all sites are checked
   */
  const areAllSitesChecked = () => {
    return sites.length === showSites.length;
  };

  /**
   * @returns true if all years are checked
   */
  const areAllYearsChecked = () => {
    return years.length === showYears.length;
  };

  /**
   * @returns true if all grades are checked
   */
  const areAllGradesChecked = () => {
    return grades.length === showGrades.length;
  };

  const toggleArea = area => {
    if (showAreas.includes(area)) {
      setShowAreas(showAreas.filter(a => a !== area));
    } else {
      setShowAreas([...showAreas, area]);
    }
  };

  const toggleSite = site => {
    if (showSites.includes(site)) {
      setShowSites(showSites.filter(s => s !== site));
    } else {
      setShowSites([...showSites, site]);
    }
  };

  const toggleYear = year => {
    if (showYears.includes(year)) {
      setShowYears(showYears.filter(y => y !== year));
    } else {
      setShowYears([...showYears, year]);
    }
  };

  const toggleGrade = grade => {
    if (showGrades.includes(grade)) {
      setShowGrades(showGrades.filter(g => g !== grade));
    } else {
      setShowGrades([...showGrades, grade]);
    }
  };

  const toggleAllAreas = () => {
    if (areAllAreasChecked()) {
      // Remove all areas
      setShowAreas([]);
    } else {
      // Add all areas
      setShowAreas(areas);
    }
  };

  const toggleAllSites = () => {
    if (areAllSitesChecked()) {
      // Remove all sites
      setShowSites([]);
    } else {
      // Add all sites
      setShowSites(sites);
    }
  };

  const toggleAllYears = () => {
    if (areAllYearsChecked()) {
      // Remove all years
      setShowYears([]);
    } else {
      // Add all years
      setShowYears(years);
    }
  };

  const toggleAllGrades = () => {
    if (areAllGradesChecked()) {
      // Remove all grades
      setShowGrades([]);
    } else {
      // Add all grades
      setShowGrades(grades);
    }
  };

  // Reset all filters
  // This sets each value back to checked
  const resetFilters = () => {
    setShowAreas(areas);
    setShowSites(sites);
    setShowYears(years);
    setShowGrades(grades);
  };

  const applyFilters = () => {
    // For each filter (areas, sites, years, grades), check if it is checked
    // If it is checked, we don't need to filter
    // If it is not checked, we need to provide a list of things to keep
    const areasFilter = areAllAreasChecked() ? areas : showAreas;
    const sitesFilter = areAllSitesChecked() ? sites : showSites;
    const yearsFilter = areAllYearsChecked() ? years : showYears;
    const gradesFilter = areAllGradesChecked() ? grades : showGrades;

    // Update the filters
    setFilters({
      ...filters,
      areas: areasFilter,
      sites: sitesFilter,
      years: yearsFilter,
      grades: gradesFilter,
    });

    // Close the modal
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="filter.area">
          <div className={styles['label-row']}>
            <Form.Label>
              <b>Areas</b>
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="All Areas"
              checked={areAllAreasChecked()}
              onChange={toggleAllAreas}
            />
          </div>
          <div className={styles.checkboxes}>
            {areas.map(area => {
              const check = showAreas.includes(area);
              return (
                <Form.Check
                  type="checkbox"
                  label={area}
                  className={styles['form-check']}
                  key={area}
                  checked={check}
                  onChange={() => {
                    toggleArea(area);
                  }}
                />
              );
            })}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="filter.site">
          <div className={styles['label-row']}>
            <Form.Label>
              <b>Sites</b>
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="All Sites"
              checked={areAllSitesChecked()}
              onChange={toggleAllSites}
            />
          </div>
          <div className={styles.checkboxes}>
            {sites.map(site => {
              const check = showSites.includes(site);
              return (
                <Form.Check
                  type="checkbox"
                  label={site}
                  className={styles['form-check']}
                  key={site}
                  checked={check}
                  onChange={() => {
                    toggleSite(site);
                  }}
                />
              );
            })}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="filter.year">
          <div className={styles['label-row']}>
            <Form.Label>
              <b>Enrolled Years</b>
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="All Years"
              checked={areAllYearsChecked()}
              onChange={toggleAllYears}
            />
          </div>
          <div className={styles.checkboxes}>
            {years.map(year => {
              const check = showYears.includes(year);
              return (
                <Form.Check
                  type="checkbox"
                  label={year}
                  className={styles['form-check']}
                  key={year}
                  checked={check}
                  onChange={() => {
                    toggleYear(year);
                  }}
                />
              );
            })}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="filter.grade">
          <div className={styles['label-row']}>
            <Form.Label>
              <b>Grade Level</b>
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="All Grades"
              checked={areAllGradesChecked()}
              onChange={toggleAllGrades}
            />
          </div>
          <div className={styles.checkboxes}>
            {grades.map(grade => {
              const check = showGrades.includes(grade);
              return (
                <Form.Check
                  type="checkbox"
                  label={grade}
                  className={styles['form-check']}
                  key={grade}
                  checked={check}
                  onChange={() => {
                    toggleGrade(grade);
                  }}
                />
              );
            })}
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className={styles['button-row']}>
        <Button onClick={resetFilters}>Reset Filters</Button>
        <Button variant="success" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AdminStudentFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  sites: PropTypes.arrayOf(PropTypes.string).isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  grades: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.arrayOf([PropTypes.object]).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default AdminStudentFilter;
