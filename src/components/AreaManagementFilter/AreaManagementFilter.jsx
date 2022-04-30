import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AreaManagementFilter.module.css';

function AreaManagementFilter(props) {
  const { isOpen, setIsOpen, states } = props;

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
            <Form.Check type="checkbox" label="Active" checked />
            <Form.Check type="checkbox" label="Inactive" checked />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className={styles['button-row']}>
        <Button>Reset Filters</Button>
        <Button variant="success">Apply Filters</Button>
      </Modal.Footer>
    </Modal>
  );
}

AreaManagementFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AreaManagementFilter;
