import { React } from 'react';
import { PropTypes } from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { BsCheck, BsCaretDownFill } from 'react-icons/bs';

import styles from './StudentGroupDropdown.module.css';

const StudentGroupDropdown = ({ choices, current, setFn, errorState }) => {
  const DropdownOptions = () => (
    <>
      {choices.map(choice => {
        // If option is currently selected, display check mark
        return choice === current ? (
          <Dropdown.Item
            as="button"
            eventKey={choice}
            key={choice}
            className={styles['bs-dropdown-selected-item']}
          >
            {choice}
            <BsCheck className={styles['dropdown-option-checkmark']} />
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            as="button"
            eventKey={choice}
            key={choice}
            className={styles['bs-dropdown-unselected-item']}
          >
            {choice}
          </Dropdown.Item>
        );
      })}
    </>
  );

  // const DropdownToggle = () => (
  //   <button
  //     type="button"
  //     className={styles['dropdown-toggle-button']}
  //     onClick={() => console.log("click")}
  //   >
  //     {current}
  //     <BsCaretDownFill />
  //   </button>
  // );

  return (
    <>
      <Dropdown onSelect={setFn} className={styles['meeting-day-dropdown']}>
        {/* <Dropdown.Toggle as="button" className={styles['dropdown-toggle']}> */}
        <Dropdown.Toggle
          as="button"
          className={errorState ? styles['dropdown-toggle'] : styles['dropdown-toggle-error']}
        >
          {current}
          <BsCaretDownFill className={styles['dropdown-toggle-icon']} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles['dropdown-menu']}>
          <DropdownOptions />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

StudentGroupDropdown.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  current: PropTypes.string.isRequired,
  setFn: PropTypes.func.isRequired,
  errorState: PropTypes.bool.isRequired,
};

export default StudentGroupDropdown;
