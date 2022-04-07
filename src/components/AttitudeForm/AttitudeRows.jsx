/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AttitudeScoreCard.module.css';

const notesInput = (notes, column, editState, register, errors, formName, fieldIndex) => {
  if (editState === 'editing') {
    return (
      <textarea
        type="text"
        className={styles['row-note-input']}
        placeholder="Input Notes Here"
        tabIndex={column === 'left' ? 1 : 2}
        // className={errors?.[formName]?.[fieldIndex]?.playerScore ? styles['input-error'] : ''}
        // {...register(`${formName}.${fieldIndex}.playerScore`)}
      />
    );
  }
  return notes;
};

const scoreInput = (playerScore, column, editState, register, errors, formName, fieldIndex) => {
  if (editState === 'editing') {
    return (
      <input
        type="number"
        className={styles['score-input']}
        tabIndex={column === 'left' ? 1 : 2}
        // className={errors?.[formName]?.[fieldIndex]?.playerScore ? styles['input-error'] : ''}
        // {...register(`${formName}.${fieldIndex}.playerScore`)}
      />
    );
  }
  return playerScore;
};

// eslint-disable-next-line react/prop-types
const AssessmentRow = ({ editState, left, right }) => {
  return (
    <tr className={styles['attitude-row']}>
      <td className={styles.question}>
        {left?.testNumber}. {left?.question}
      </td>
      <td className={styles['row-notes']}>{notesInput(left.notes, 'left', editState)}</td>
      <td className={styles['player-score']}> {scoreInput(left.playerScore, 'left', editState)}</td>
      <td className={styles.question}>
        {right?.testNumber}. {right?.question}
      </td>
      <td className={styles['row-notes']}>{notesInput(right.notes, 'right', editState)}</td>
      <td className={styles['player-score']}>
        {scoreInput(right.playerScore, 'right', editState)}
      </td>
    </tr>
  );
};

const zipData = data => {
  const recreationalData = data.filter(row => row.readingType === 'recreational');
  const academicData = data.filter(row => row.readingType === 'academic');

  return recreationalData.map((rD, i) => ({ left: rD, right: academicData[i] }));
};

const AssessmentRows = ({ formName, formFields, editState }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const zipped = useMemo(() => zipData(formFields), [formFields]);

  return zipped.map((row, rowIndex) => (
    <AssessmentRow
      // eslint-disable-next-line react/no-array-index-key
      key={rowIndex}
      className={styles['assessment-row']}
      editState={editState}
      {...row}
    />
  ));
};

AssessmentRow.propTypes = {
  editState: PropTypes.func.isRequired,
  left: PropTypes.objectOf({
    testNumber: PropTypes.number,
    question: PropTypes.string,
    playerScore: PropTypes.number,
  }).isRequired,
  right: PropTypes.objectOf({
    testNumber: PropTypes.number,
    question: PropTypes.string,
    playerScore: PropTypes.number,
  }).isRequired,
};

AssessmentRows.propTypes = {
  formName: PropTypes.string.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  editState: PropTypes.bool.isRequired,
};

export default AssessmentRows;
