import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AssessmentScoreCard.module.css';

const notesInput = (notes, editState, register, errors, formName, fieldIndex) => {
  if (editState === 'editing') {
    return (
      <textarea
        placeholder="Input Notes Here"
        className={
          errors?.[formName]?.[fieldIndex]?.notes ? styles['input-error'] : styles['row-note-input']
        }
        {...register(`${formName}.${fieldIndex}.notes`)}
      />
    );
  }
  if (notes === '') {
    return <span className={styles['empty-notes']}>Input Notes Here</span>;
  }
  return notes;
};

const scoreInput = (
  playerScore,
  numQuestions,
  editState,
  register,
  errors,
  formName,
  fieldIndex,
) => {
  if (numQuestions === 0) return '0';
  if (editState === 'editing') {
    return (
      <input
        type="number"
        className={errors?.[formName]?.[fieldIndex]?.playerScore ? styles['input-error'] : ''}
        {...register(`${formName}.${fieldIndex}.playerScore`)}
      />
    );
  }
  return `${playerScore || 0}/${numQuestions}`;
};

const AssessmentRow = ({
  formName,
  fieldIndex,
  editState,
  playerScore,
  notes,
  gameName,
  skillTest,
  passingScore,
  numQuestions,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <tr className={styles['assessment-row']}>
      <td className={styles['game-name']}>{gameName}</td>
      <td className={styles['skill-test']}>{skillTest}</td>
      <td className={styles['row-notes']}>
        {notesInput(notes, editState, register, errors, formName, fieldIndex)}
      </td>
      <td className={styles['passing-score']}>{numQuestions !== 0 ? passingScore : 'N/A'}</td>
      <td className={styles['player-score']}>
        {scoreInput(playerScore, numQuestions, editState, register, errors, formName, fieldIndex)}
      </td>
    </tr>
  );
};

AssessmentRow.defaultProps = {
  playerScore: 0,
  notes: '',
};

AssessmentRow.propTypes = {
  formName: PropTypes.string.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  editState: PropTypes.string.isRequired,
  playerScore: PropTypes.number,
  notes: PropTypes.string,
  gameName: PropTypes.string.isRequired,
  skillTest: PropTypes.string.isRequired,
  passingScore: PropTypes.string.isRequired,
  numQuestions: PropTypes.number.isRequired,
};

export default AssessmentRow;
