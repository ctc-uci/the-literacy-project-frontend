/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AttitudeScoreCard.module.css';

const notesInput = (note, column, editState, formName, testNumber) => {
  const { register } = useFormContext();

  if (editState === 'editing') {
    return (
      <textarea
        type="text"
        maxLength="255"
        placeholder="Input Notes Here"
        className={styles['row-note-input']}
        tabIndex={column === 'left' ? 1 : 2}
        {...register(`${formName}.${testNumber - 1}.note`)}
      />
    );
  }
  if (note === '') {
    return <>Input Notes Here</>;
  }
  return note;
};

const scoreInput = (playerScore, column, editState, formName, testNumber) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (editState === 'editing') {
    return (
      <input
        type="number"
        tabIndex={column === 'left' ? 1 : 2}
        className={`${styles['score-input']} ${
          errors?.[formName]?.[testNumber - 1]?.playerScore ? styles['input-error'] : ''
        }`}
        {...register(`${formName}.${testNumber - 1}.playerScore`)}
      />
    );
  }
  return playerScore;
};

const AssessmentRow = ({ editState, formName, left, right }) => {
  return (
    <tr className={styles['attitude-row']}>
      <td className={styles.question}>
        {left?.testNumber}. {left?.question}
      </td>
      <td
        className={`${styles['row-notes']} ${left.note?.length === 0 ? styles['empty-notes'] : ''}`}
      >
        {notesInput(left.note, 'left', editState, formName, left.testNumber)}
      </td>
      <td className={styles['player-score']}>
        {scoreInput(left.playerScore, 'left', editState, formName, left.testNumber)}
      </td>
      <td className={styles.question}>
        {right?.testNumber}. {right?.question}
      </td>
      <td
        className={`${styles['row-notes']} ${
          right.note?.length === 0 ? styles['empty-notes'] : ''
        }`}
      >
        {notesInput(right.note, 'right', editState, formName, right.testNumber)}
      </td>
      <td className={styles['player-score']}>
        {scoreInput(right.playerScore, 'right', editState, formName, right.testNumber)}
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
  const zipped = useMemo(() => zipData(formFields), [formFields]);

  return zipped.map(row => (
    <AssessmentRow
      key={row.id}
      className={styles['assessment-row']}
      editState={editState}
      formName={formName}
      {...row}
    />
  ));
};

AssessmentRow.propTypes = {
  editState: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  left: PropTypes.shape({
    testNumber: PropTypes.number,
    question: PropTypes.string,
    playerScore: PropTypes.number,
    note: PropTypes.string,
  }).isRequired,
  right: PropTypes.shape({
    testNumber: PropTypes.number,
    question: PropTypes.string,
    playerScore: PropTypes.number,
    note: PropTypes.string,
  }).isRequired,
};

AssessmentRows.propTypes = {
  formName: PropTypes.string.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  editState: PropTypes.string.isRequired,
};

export default AssessmentRows;
