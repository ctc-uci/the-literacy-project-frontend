import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AreaManagementFilter.module.css';

function AreaManagementFilter(props) {
  const { isOpen, setIsOpen, states, filters, setFilters } = props;
  const [showActive, setShowActive] = useState(!filters.active);
  const [showInactive, setShowInactive] = useState(!filters.inactive);

  /**
   * Create a map of states with their checked status.
   * @param {boolean} status
   * @returns Map of the states with their value as status
   * @example {'California': true, 'Utah': true}
   */
  const statesStatusMap = status => {
    return states.reduce((acc, state) => {
      acc[state] = status;
      return acc;
    }, {});
  };

  const [statesStatus, setStatesStatus] = useState(statesStatusMap(true));

  /**
   * @returns true if all states are checked
   */
  const areAllStatesChecked = () => {
    return Object.entries(statesStatus).every(([, value]) => value);
  };

  const toggleState = (state, status) => {
    setStatesStatus({
      ...statesStatus,
      [`${state}`]: !status,
    });
  };

  const toggleAllStates = () => {
    if (areAllStatesChecked()) {
      // Set every state to false
      setStatesStatus(statesStatusMap(false));
    } else {
      // Set every state to true
      setStatesStatus(statesStatusMap(true));
    }
  };

  // Reset all filters
  // This sets each value back to checked
  const resetFilters = () => {
    setShowActive(true);
    setShowInactive(true);
    setStatesStatus(statesStatusMap(true));
  };

  const applyFilters = () => {
    // For each value (states, active, inactive), check if it is checked
    // If it is checked, we don't need to filter
    // If it is not checked, we need to provide a function to filter it out
    const statesFilter = areAllStatesChecked() ? null : null;
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
              const status = statesStatus[state];
              return (
                <Form.Check
                  type="checkbox"
                  label={state}
                  key={state}
                  checked={status}
                  onChange={() => {
                    toggleState(state, status);
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
              checked={showActive}
              onChange={() => setShowActive(!showActive)}
            />
            <Form.Check
              type="checkbox"
              label="Inactive"
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