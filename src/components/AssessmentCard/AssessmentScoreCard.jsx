import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
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
      <Button as="button" type="button" onClick={e => setAsEditing(e)}>
        + Input Scores
      </Button>
    );
  }
  if (editState === 'editing') {
    return (
      <Button as="button" type="submit">
        Submit Scores
      </Button>
    );
  }
  return (
    <Button as="button" type="button" onClick={e => setAsEditing(e)}>
      Edit Scores
    </Button>
  );
};

const AssessmentScoreCard = ({ name, headerText }) => {
  const [formOutput, setFormOutput] = useState(); // TODO: remove
  // Edit states: newInput, editing, editExisting
  const [editState, setEditState] = useState('newInput');

  const schema = yup.object({
    [name]: yup.array().of(
      yup.object({
        playerScore: yup.number().positive().min(0, 'Number must be positive'),
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

  const onSubmit = async data => {
    const scores = data[name].map(row => row.playerScore);

    const formattedData = {
      [name]: scores,
      notes: data.notes,
    };
    setEditState('editExisting');
    setFormOutput(formattedData);
  };

  // Populate rowData
  useEffect(() => {
    // TODO: use DB values to populate
    methods.setValue(
      name,
      rowData.map(row => ({ ...row, playerScore: 0 })),
    );
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {headerText}
        <ScoreCardButton editState={editState} setEditState={setEditState} />
        <div>
          <table>
            <tr>
              <th>#</th>
              <th>Game Name</th>
              <th>Phonic Skills</th>
              <th>Passing Score</th>
              <th>Player Score</th>
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
          </table>
          <textarea
            placeholder="Notes"
            className={styles.notes}
            rows="3"
            cols="50"
            {...methods.register('notes')}
          />
        </div>
        <pre>{JSON.stringify(formOutput, null, 2)}</pre>
      </form>
    </FormProvider>
  );
};

ScoreCardButton.propTypes = {
  editState: PropTypes.string.isRequired,
  setEditState: PropTypes.func.isRequired,
};

AssessmentScoreCard.propTypes = {
  name: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default AssessmentScoreCard;
