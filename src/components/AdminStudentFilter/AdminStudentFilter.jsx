import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AdminStudentFilter.module.css';

function AdminStudentFilter(props) {
  const { isOpen, setIsOpen, areas, filters, setFilters } = props;
  const [showAreas, setShowAreas] = useState([]);

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
  }, [areas]);

  /**
   * @returns true if all areas are checked
   */
  const areAllAreasChecked = () => {
    return areas.length === showAreas.length;
  };

  const toggleArea = area => {
    if (showAreas.includes(area)) {
      setShowAreas(showAreas.filter(a => a !== area));
    } else {
      setShowAreas([...showAreas, area]);
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

  // Reset all filters
  // This sets each value back to checked
  const resetFilters = () => {
    setShowAreas(areas);
  };

  const applyFilters = () => {
    // For each value (areas), check if it is checked
    // If it is checked, we don't need to filter
    // If it is not checked, we need to provide a list of things to keep
    const areasFilter = areAllAreasChecked() ? areas : showAreas;

    // Update the filters
    setFilters({
      ...filters,
      areas: areasFilter,
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
          <div className={styles['area-label-row']}>
            <Form.Label>
              <b>Area</b>
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
  filters: PropTypes.arrayOf([PropTypes.object]).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default AdminStudentFilter;
