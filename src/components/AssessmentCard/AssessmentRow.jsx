import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AssessmentScoreCard.module.css';

const notesInput = (note, editState, formName, fieldIndex) => {
  const { register } = useFormContext();

  if (editState === 'editing') {
    return (
      <textarea
        type="text"
        maxLength="255"
        placeholder="Input Notes Here"
        className={styles['row-note-input']}
        {...register(`${formName}.${fieldIndex}.note`)}
      />
    );
  }
  if (note === '') {
    return <>Input Notes Here</>;
  }
  return note;
};

const scoreInput = (playerScore, numQuestions, editState, formName, fieldIndex) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
  note,
  gameName,
  skillTest,
  passingScore,
  numQuestions,
}) => {
  return (
    <tr className={styles['assessment-row']}>
      <td className={styles['game-name']}>{gameName}</td>
      <td className={styles['skill-test']}>{skillTest}</td>
      <td className={`${styles['row-notes']} ${note.length === 0 && styles['empty-notes']}`}>
        {notesInput(note, editState, formName, fieldIndex)}
      </td>
      <td className={styles['passing-score']}>{numQuestions !== 0 ? passingScore : 'N/A'}</td>
      <td className={styles['player-score']}>
        {scoreInput(playerScore, numQuestions, editState, formName, fieldIndex)}
      </td>
    </tr>
  );
};

AssessmentRow.defaultProps = {
  playerScore: 0,
  note: '',
};

AssessmentRow.propTypes = {
  formName: PropTypes.string.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  editState: PropTypes.string.isRequired,
  playerScore: PropTypes.number,
  note: PropTypes.string,
  gameName: PropTypes.string.isRequired,
  skillTest: PropTypes.string.isRequired,
  passingScore: PropTypes.string.isRequired,
  numQuestions: PropTypes.number.isRequired,
};

export default AssessmentRow;
