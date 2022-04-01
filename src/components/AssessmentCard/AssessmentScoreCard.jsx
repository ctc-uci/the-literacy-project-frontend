import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';

import { TLPBackend } from '../../common/utils';
import AssessmentRow from './AssessmentRow';

import styles from './AssessmentScoreCard.module.css';
import rowData from './rowData';

const ScoreCardButton = ({ editState, setEditState }) => {
  const setAsEditing = e => {
    e.preventDefault();
    setEditState('editing');
  };
  if (editState === 'newInput') {
    return (
      <Button
        as="button"
        type="button"
        className={styles['input-score-button']}
        onClick={e => setAsEditing(e)}
      >
        + Input Scores
      </Button>
    );
  }
  if (editState === 'editing') {
    return (
      <Button as="button" type="submit" className={styles['submit-score-button']}>
        Submit Scores
      </Button>
    );
  }
  return (
    <Button
      as="button"
      type="button"
      className={styles['edit-score-button']}
      onClick={e => setAsEditing(e)}
    >
      Edit Scores
    </Button>
  );
};

const AssessmentScoreCard = ({ studentID, name, headerText }) => {
  // Edit states: newInput, editing, editExisting
  const [editState, setEditState] = useState('newInput');
  const [studentData, setStudentData] = useState({});

  const schema = yup.object({
    [name]: yup.array().of(
      yup.object({
        playerScore: yup.number().integer().positive().min(0, 'Number must be positive').nullable(),
      }),
    ),
  });

  const methods = useForm({
    defaultValues: {
      [name]: rowData,
    },
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const { fields } = useFieldArray({
    name,
    control: methods.control,
  });

  const updateStudentScores = async scores => {
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, scores);
    setStudentData(res.data);
  };

  const fetchStudentScores = async () => {
    const res = await TLPBackend.get(`./students/${studentID}`);
    setStudentData(res.data);
  };

  // Populate table on load
  useEffect(async () => {
    fetchStudentScores();
  }, []);
  useEffect(() => {
    methods.setValue(
      name,
      rowData.map((row, i) => ({ ...row, playerScore: studentData?.[name]?.[i] })),
    );
    setEditState(!studentData?.[name] ? 'newInput' : 'editExisting');
  }, [studentData]);

  const onSubmit = async data => {
    const scores = data[name].map(row => row.playerScore);

    const formattedData = {
      [name]: scores,
      notes: data.notes,
    };

    // eslint-disable-next-line no-console
    console.log(formattedData);

    setEditState('editExisting');
    updateStudentScores(formattedData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles['form-header']}>
          <p>{headerText}</p>
          <ScoreCardButton editState={editState} setEditState={setEditState} />
        </div>
        <div>
          <table className={styles['scorecard-table']}>
            <tbody>
              <tr>
                <th>Game Name</th>
                <th>Phonic Skills</th>
                <th>Passing Score</th>
                <th>Score</th>
              </tr>
              {fields.map((field, index) => (
                <AssessmentRow
                  key={field.id}
                  formName={name}
                  fieldIndex={index}
                  editState={editState}
                  {...field}
                />
              ))}
            </tbody>
          </table>
          <textarea
            placeholder="Notes"
            className={styles.notes}
            rows="3"
            cols="50"
            {...methods.register('notes')}
          />
        </div>
      </form>
    </FormProvider>
  );
};

ScoreCardButton.propTypes = {
  editState: PropTypes.string.isRequired,
  setEditState: PropTypes.func.isRequired,
};

AssessmentScoreCard.propTypes = {
  studentID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default AssessmentScoreCard;
