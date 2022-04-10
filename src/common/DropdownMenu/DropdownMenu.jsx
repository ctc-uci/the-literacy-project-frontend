/* eslint-disable jsx-a11y/click-events-have-key-events */

// import { React, useState } from 'react';
import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './DropdownMenu.css';
import DownwardChevron from '../../assets/downward-chevron.svg';

/**
 * This dropdown menu plugs and plays options as part of dynamic state to allow for easy changing. Choices, current, and setFn are all required.
 *
 * @param {[string]} choices - array of choices to be displayed in the dropdown menu
 * @param {string} current - initial value of dropdown (usually, a first half of useState)
 * @param {callable} setFn - function to set the current value (usually second half of useState)
 *
 * You can also optionally pass in custom CSS classnames to change how the dropdown menu looks. Use double-select in your implementing component's .module.css to override (ex. .custom-class.custom-class {})
 *
 * More info: http://alvinnovian.com/blog/css-modules-overriding
 * @param {string} outerClass - The outer dropdown wrapper. Use this to set dropdown width
 * @param {string} innerClass - The inner dropdown wrapper. Use this to set dropdown height, corner styles, margins/padding, content justify, etc...
 * @param {string} buttonClass - The selected choice style. Change this if you need a different text style on the selected option
 * @param {string} arrowClass - The dropdown arrow style. Change if you need to modify the arrow next to the current option
 * @param {string} choiceWrapperClass - The div wrapper for the entire expanded dropdown; change to modify size of the entire expanded dropdown
 * @param {string} choiceClass - The div wrapper for each individual choice in the expanded dropdown
 */
const DropdownMenu = ({
  choices,
  current,
  setFn,
  outerClass,
  innerClass,
  buttonClass,
  arrowClass,
  choiceWrapperClass,
  choiceClass,
}) => {
  const [showChoices, setShowChoices] = useState(false);
  const [currentChoice, setCurrentChoice] = useState(current);
  return (
    <div className={`${outerClass != null ? `${outerClass}${' '}` : ''}dropdown-super-wrapper`}>
      <div
        role="button"
        tabIndex={0}
        className={`${innerClass != null ? `${innerClass}${' '}` : ''}dropdown-wrapper`}
        onClick={() => setShowChoices(!showChoices)}
      >
        <div className={`${buttonClass != null ? `${buttonClass}${' '}` : ''}dropdown-button`}>
          {currentChoice}
        </div>
        <img
          alt="arrow"
          src={DownwardChevron}
          className={
            showChoices
              ? `${arrowClass != null ? `${arrowClass}${' '}` : ''}dropdown-arrow-up`
              : `${arrowClass != null ? `${arrowClass}${' '}` : ''}dropdown-arrow-down`
          }
        />
      </div>
      <div>
        {showChoices ? (
          <div
            className={`${
              choiceWrapperClass != null ? `${choiceWrapperClass}${' '}` : ''
            }dropdown-choices-wrapper`}
          >
            {choices.map(choice => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                className={`${choiceClass != null ? `${choiceClass}${' '}` : ''}dropdown-choice`}
                role="button"
                tabIndex={0}
                key={choice}
                value={choice}
                onClick={e => {
                  setFn(e.target.innerText);
                  setCurrentChoice(e.target.innerText);
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
  outerClass: PropTypes.string,
  innerClass: PropTypes.string,
  buttonClass: PropTypes.string,
  arrowClass: PropTypes.string,
  choiceWrapperClass: PropTypes.string,
  choiceClass: PropTypes.string,
};

DropdownMenu.defaultProps = {
  outerClass: null,
  innerClass: null,
  buttonClass: null,
  arrowClass: null,
  choiceWrapperClass: null,
  choiceClass: null,
};

export default DropdownMenu;
