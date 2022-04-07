/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import styles from './AttitudeScoreCard.module.css';

const scoreInput = (
  playerScore,
  numQuestions,
  editState,
  register,
  errors,
  formName,
  fieldIndex,
) => {
  if (numQuestions === 0) return '-----';
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

// eslint-disable-next-line react/prop-types
const AssessmentRow = ({ editState, left, right }) => {
  return (
    <tr>
      <td>
        {left?.testNumber}. {left?.question}
      </td>
      <td>notes</td>
      <td>{left?.playerScore}</td>
      <td>
        {right?.testNumber}. {right?.question}
      </td>
      <td>notes</td>
      <td>{right?.playerScore}</td>
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
