import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFormState, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

import AssessmentRow from './AssessmentRow';
import CommonAlert from '../../common/CommonAlert/CommonAlert';

import styles from './AssessmentScoreCard.module.css';
import rowData from './rowData';

const ScoreCardButton = ({ editState, setEditState }) => {
  const setAsEditing = e => {
    e.preventDefault();
    setEditState('editing');
  };
  if (editState === 'newInput') {
    return (
      <Button as="button" type="button" variant="warning" onClick={e => setAsEditing(e)}>
        + Input Scores
      </Button>
    );
  }
  if (editState === 'editing') {
    return (
      <Button as="button" type="submit" variant="success" className={styles['submit-score-button']}>
        <IoCheckmarkDoneOutline className={styles['checkmark-icon']} />
        Submit Scores
      </Button>
    );
  }
  return (
    <Button
      as="button"
      type="button"
      variant="primary"
      className={styles['edit-score-button']}
      onClick={e => setAsEditing(e)}
    >
      Edit Scores
    </Button>
  );
};

const AssessmentScoreCard = ({ name, headerText, tableData, setTableData }) => {
  // Edit states: newInput, editing, editExisting
  const [editState, setEditState] = useState('newInput');
  const [alertState, setAlertState] = useState({
    variant: 'success',
    open: false,
  });

  const schema = yup.object({
    [name]: yup.array().of(
      yup.object({
        playerScore: yup.number().integer().positive().min(0, 'Number must be positive').nullable(),
        note: yup.mixed().nullable(),
      }),
    ),
  });

  const methods = useForm({
    defaultValues: {
      [name]: rowData,
    },
    resolver: yupResolver(schema),
    delayError: 750,
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   console.log('formData', data);
    //   console.log('validation result', await yupResolver(schema)(data, context, options));
    //   return yupResolver(schema)(data, context, options);
    // },
  });

  const { isSubmitting, errors, isDirty } = useFormState({
    control: methods.control,
  });

  const { fields } = useFieldArray({
    name,
    control: methods.control,
  });

  // Populate table on load
  useEffect(() => {
    methods.setValue(
      name,
      rowData.map((row, i) => ({
        ...row,
        playerScore: tableData?.scores?.[i] ?? 0,
        note: tableData?.notes?.[i] ?? '',
      })),
    );
    setEditState(!Object.values(tableData).some(v => v) ? 'newInput' : 'editExisting');
  }, [tableData]);

  // Show error alert
  useEffect(() => {
    if (errors?.[name]) {
      setAlertState({
        variant: 'danger',
        open: true,
      });
    }
  }, [isSubmitting]);

  const onSubmit = async data => {
    console.log(data);
    if (!isDirty) {
      setEditState(!Object.values(tableData).some(v => v) ? 'newInput' : 'editExisting');
      return;
    }
    const scores = data[name].map(row => row.playerScore);
    const notes = data[name].map(row => row.note);

    const formattedData = {
      [name]: scores,
      [`${name}Notes`]: notes,
    };

    // eslint-disable-next-line no-console
    console.log(formattedData);

    setEditState('editExisting');
    setTableData(formattedData);
    setAlertState({
      variant: 'success',
      open: true,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles['form-header']}>
          <p>{headerText}</p>
          <ScoreCardButton editState={editState} setEditState={setEditState} />
        </div>

        <table className={styles['scorecard-table']}>
          <tbody styles={{ overflow: 'hidden' }}>
            <tr>
              <th>Game Name</th>
              <th>Phonic Skills</th>
              <th>Notes</th>
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
      </form>
      <CommonAlert
        variant={alertState.variant}
        open={alertState.open}
        setOpen={val => setAlertState({ ...alertState, open: val })}
      >
        {alertState.variant === 'success'
          ? 'Scores Successfully Saved.'
          : 'Error Submitting Scores.'}
      </CommonAlert>
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
  tableData: PropTypes.arrayOf(Number).isRequired,
  setTableData: PropTypes.func.isRequired,
};

export default AssessmentScoreCard;
