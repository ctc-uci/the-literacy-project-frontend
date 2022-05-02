import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AreaManagementFilter.module.css';

function AreaManagementFilter(props) {
  const { isOpen, setIsOpen, states, filters, setFilters } = props;
  const [showActive, setShowActive] = useState(!filters.active);
  const [showInactive, setShowInactive] = useState(!filters.inactive);
  const [showStates, setShowStates] = useState([]);

  useEffect(() => {
    if (filters.states) {
      // There is a filter for the states
      setShowStates(
        states
          .map(state => {
            return { areaState: state };
          }) // Convert stats to a mocked list of area objects
          .filter(filters.states) // Apply the states filter to the list
          .map(area => area.areaState), // Convert the areas back to a list of strings
      );
    } else {
      // There is no filter for the states
      // setShowStates to the full list of states
      setShowStates(states);
    }
  }, [states]);

  /**
   * @returns true if all states are checked
   */
  const areAllStatesChecked = () => {
    return states.length === showStates.length;
  };

  const toggleState = state => {
    if (showStates.includes(state)) {
      setShowStates(showStates.filter(s => s !== state));
    } else {
      setShowStates([...showStates, state]);
    }
  };

  const toggleAllStates = () => {
    if (areAllStatesChecked()) {
      // Remove all states
      setShowStates([]);
    } else {
      // Add all states
      setShowStates(states);
    }
  };

  // Reset all filters
  // This sets each value back to checked
  const resetFilters = () => {
    setShowActive(true);
    setShowInactive(false);
    setShowStates(states);
  };

  const applyFilters = () => {
    // For each value (states, active, inactive), check if it is checked
    // If it is checked, we don't need to filter
    // If it is not checked, we need to provide a function to filter it out
    const statesFilter = areAllStatesChecked() ? null : area => showStates.includes(area.areaState);
    const activeFilter = showActive ? null : area => !area.active;
    const inactiveFilter = showInactive ? null : area => area.active;

    // Update the filters
    setFilters({
      ...filters,
      states: statesFilter,
      active: activeFilter,
      inactive: inactiveFilter,
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
        <Form.Group className="mb-3" controlId="filter.state">
          <div className={styles['state-label-row']}>
            <Form.Label>
              <b>State</b>
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="All States"
              checked={areAllStatesChecked()}
              onChange={toggleAllStates}
            />
          </div>
          <div className={styles.checkboxes}>
            {states.map(state => {
              const check = showStates.includes(state);
              return (
                <Form.Check
                  type="checkbox"
                  label={state}
                  className={styles['form-check']}
                  key={state}
                  checked={check}
                  onChange={() => {
                    toggleState(state);
                  }}
                />
              );
            })}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="filter.state">
          <Form.Label>
            <b>Area Status</b>
          </Form.Label>
          <div className={styles.checkboxes}>
            <Form.Check
              type="checkbox"
              label="Active"
              className={styles['form-check']}
              checked={showActive}
              onChange={() => setShowActive(!showActive)}
            />
            <Form.Check
              type="checkbox"
              label="Inactive"
              className={styles['form-check']}
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
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

AreaManagementFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default AreaManagementFilter;
