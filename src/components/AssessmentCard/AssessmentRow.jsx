import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AssessmentRow.module.css';

const scoreInput = (playerScore, editState, register, errors, formName, fieldIndex) => {
  if (editState === 'editing') {
    return (
      <input
        type="number"
        className={errors?.[formName]?.[fieldIndex]?.playerScore ? styles['input-error'] : ''}
        {...register(`${formName}.${fieldIndex}.playerScore`)}
      />
    );
  }
  return playerScore;
};

const AssessmentRow = ({
  formName,
  fieldIndex,
  editState,
  playerScore,
  testNumber,
  gameName,
  skillTest,
  passingScore,
  numQuestions,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  if (numQuestions !== 0) {
    return (
      <tr>
        <td className={styles['test-number']}>{testNumber}</td>
        <td className={styles['game-name']}>{gameName}</td>
        <td className={styles['skill-test']}>{skillTest}</td>
        <td>{passingScore}</td>
        <td className={styles['player-score']}>
          {scoreInput(playerScore, editState, register, errors, formName, fieldIndex)}
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
};

AssessmentRow.propTypes = {
  formName: PropTypes.number.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  editState: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  testNumber: PropTypes.number.isRequired,
  gameName: PropTypes.string.isRequired,
  skillTest: PropTypes.string.isRequired,
  passingScore: PropTypes.string.isRequired,
  numQuestions: PropTypes.number.isRequired,
};

export default AssessmentRow;
