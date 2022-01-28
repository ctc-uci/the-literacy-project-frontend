/* eslint-disable jsx-a11y/click-events-have-key-events */

// import { React, useState } from 'react';
import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './DropdownMenu.css';
import DownwardChevron from '../../assets/downward-chevron.svg';

const DropdownMenu = ({ choices, current, setFn }) => {
  const [showChoices, setShowChoices] = useState(false);
  return (
    <div className="dropdown-super-wrapper">
      <div
        role="button"
        tabIndex={0}
        className="dropdown-wrapper"
        onClick={() => setShowChoices(!showChoices)}
      >
        <div className="dropdown-button">{current}</div>
        <img
          alt="arrow"
          src={DownwardChevron}
          className={showChoices ? 'dropdown-arrow-up' : 'dropdown-arrow-down'}
        />
      </div>
      <div>
        {showChoices ? (
          <div className="dropdown-choices-wrapper">
            {choices.map(choice => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                className="dropdown-choice"
                role="button"
                tabIndex={0}
                key={choice}
                value={choice}
                onClick={e => {
                  setFn(e.target.innerText);
                  setShowChoices(false);
                }}
              >
                {choice}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  current: PropTypes.string.isRequired,
  setFn: PropTypes.func.isRequired,
};

export default DropdownMenu;
