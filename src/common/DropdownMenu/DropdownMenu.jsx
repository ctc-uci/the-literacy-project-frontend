/* eslint-disable jsx-a11y/click-events-have-key-events */

// import { React, useState } from 'react';
import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './DropdownMenu.css';
import DownwardChevron from '../../assets/downward-chevron.svg';

const DropdownMenu = ({ choices, current, setFn, ...prop }) => {
  // ------------ ...prop Custom CSS Classes -----------------
  // outerClass - width of dropdown menu
  // innerClass - height of dropdown menu, corners, content justify, ...
  // buttonClass - selected choice text
  // arrowClass - dropdown arrow
  // choiceWrapperClass - wrapper for all dropdown choices (opens on choice click)
  // choiceClass - single dropdown choice
  // -- If your overriding attributes don't work, double-select your
  // -- custom classes in your module.css like: .custom-class.custom-class {}
  // More info: http://alvinnovian.com/blog/css-modules-overriding
  const [showChoices, setShowChoices] = useState(false);
  return (
    <div
      className={`${
        prop.outerClass != null ? `${prop.outerClass}${' '}` : ''
      }dropdown-super-wrapper`}
    >
      <div
        role="button"
        tabIndex={0}
        className={`${prop.innerClass != null ? `${prop.innerClass}${' '}` : ''}dropdown-wrapper`}
        onClick={() => setShowChoices(!showChoices)}
      >
        <div
          className={`${
            prop.buttonClass != null ? `${prop.buttonClass}${' '}` : ''
          }dropdown-button`}
        >
          {current}
        </div>
        <img
          alt="arrow"
          src={DownwardChevron}
          className={
            showChoices
              ? `${prop.arrowClass != null ? `${prop.arrowClass}${' '}` : ''}dropdown-arrow-up`
              : `${prop.arrowClass != null ? `${prop.arrowClass}${' '}` : ''}dropdown-arrow-down`
          }
        />
      </div>
      <div>
        {showChoices ? (
          <div
            className={`${
              prop.choiceWrapperClass != null ? `${prop.choiceWrapperClass}${' '}` : ''
            }dropdown-choices-wrapper`}
          >
            {choices.map(choice => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                className={`${
                  prop.choiceClass != null ? `${prop.choiceClass}${' '}` : ''
                }dropdown-choice`}
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
