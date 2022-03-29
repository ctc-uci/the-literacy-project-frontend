import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AssessmentRow.module.css';

const AssessmentRow = ({
  formName,
  fieldIndex,
  testNumber,
  gameName,
  skillTest,
  passingScore,
  numQuestions,
}) => {
  const { register } = useFormContext();
  if (numQuestions !== 0) {
    return (
      <tr>
        <td className={styles['test-number']}>{testNumber}</td>
        <td className={styles['game-name']}>{gameName}</td>
        <td className={styles['skill-test']}>{skillTest}</td>
        <td>{passingScore}</td>
        <td className={styles['player-score']}>
          <form>
            <input type="number" {...register(`${formName}.${fieldIndex}.value`)} />
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className={styles['test-number']}>{testNumber}</td>
      <td className={styles['game-name']}>{gameName}</td>
      <td className={styles['skill-test']}>{skillTest}</td>
      <td>---</td>
      <td>-----</td>
    </tr>
  );
  // Notes for later:
  // We need to make sure we error check postScore and preScore for being Int
};

AssessmentRow.defaultProps = {
  testNumber: 0,
  gameName: '',
  skillTest: 'test',
  passingScore: '1/3',
  numQuestions: 0,
};

AssessmentRow.propTypes = {
  formName: PropTypes.number.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  testNumber: PropTypes.number,
  gameName: PropTypes.string,
  skillTest: PropTypes.string,
  passingScore: PropTypes.string,
  numQuestions: PropTypes.number,
};

export default AssessmentRow;
