/* eslint-disable jsx-a11y/click-events-have-key-events */

// import { React, useState } from 'react';
import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { BsCheck, BsCaretDownFill } from 'react-icons/bs';
import './DropdownStudentGroup.css';

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
 * @param {string} checkmarkClass - The checkmark in a selected choice. Change if you need to modify the icon next to the currently selected choice in the dropdown
 * @param {string} choiceWrapperClass - The div wrapper for the entire expanded dropdown; change to modify size of the entire expanded dropdown
 * @param {string} choiceClassSelected - The div wrapper for each selected individual choice in the expanded dropdown
 * @param {string} choiceClassUnSelected - The div wrapper for each unselected individual choice in the expanded dropdown
 */
const DropdownStudentGroup = ({
  choices,
  current,
  setFn,
  outerClass,
  innerClass,
  buttonClass,
  checkmarkClass,
  choiceWrapperClass,
  choiceClassSelected,
  choiceClassUnselected,
}) => {
  const [showChoices, setShowChoices] = useState(false);
  return (
    <div className={`${outerClass != null ? `${outerClass}${' '}` : ''}dropdown-super-wrapper`}>
      <div
        role="button"
        tabIndex={0}
        className={`${innerClass != null ? `${innerClass}${' '}` : ''}dropdown-wrapper`}
        onClick={() => setShowChoices(!showChoices)}
      >
        <div className={`${buttonClass != null ? `${buttonClass}${' '}` : ''}dropdown-button`}>
          {current}
        </div>
        <BsCaretDownFill />
      </div>
      <div>
        {showChoices ? (
          <div
            className={`${
              choiceWrapperClass != null ? `${choiceWrapperClass}${' '}` : ''
            }dropdown-choices-wrapper`}
          >
            {choices.map(choice => {
              // If option is current selected, display check mark
              return choice === current ? (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  className={`${
                    choiceClassSelected != null ? `${choiceClassSelected}${' '}` : ''
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
                  <BsCheck
                    className={`${
                      checkmarkClass != null ? `${checkmarkClass}${' '}` : ''
                    }dropdown-selected-checkmark`}
                  />
                </div>
              ) : (
                <div
                  className={`${
                    choiceClassUnselected != null ? `${choiceClassUnselected}${' '}` : ''
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
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

DropdownStudentGroup.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  current: PropTypes.string.isRequired,
  setFn: PropTypes.func.isRequired,
  outerClass: PropTypes.string,
  innerClass: PropTypes.string,
  buttonClass: PropTypes.string,
  checkmarkClass: PropTypes.string,
  choiceWrapperClass: PropTypes.string,
  choiceClassSelected: PropTypes.string,
  choiceClassUnselected: PropTypes.string,
};

DropdownStudentGroup.defaultProps = {
  outerClass: null,
  innerClass: null,
  buttonClass: null,
  checkmarkClass: null,
  choiceWrapperClass: null,
  choiceClassSelected: null,
  choiceClassUnselected: null,
};

export default DropdownStudentGroup;
