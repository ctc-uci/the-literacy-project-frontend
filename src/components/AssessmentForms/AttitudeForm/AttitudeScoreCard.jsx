import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFormState, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AssessmentRows from './AttitudeRows';
import ScoreCardButton from '../ScoreCardButton';
import CommonAlert from '../../../common/CommonAlert/CommonAlert';

import styles from './AttitudeScoreCard.module.css';
import rowData from './rowData';

const AttitudeScoreCard = ({ name, headerText, tableData, setTableData }) => {
  // Edit states: newInput, editing, editExisting
  const [editState, setEditState] = useState('newInput');
  const [alertState, setAlertState] = useState({
    variant: 'success',
    open: false,
  });
  const [recTotal, setRecTotal] = useState(0);
  const [acadTotal, setAcadTotal] = useState(0);

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

    // Calculate score totals
    setRecTotal(
      methods
        .getValues(name)
        .filter(row => row.readingType === 'recreational')
        .reduce((a, b) => a + (b.playerScore || 0), 0),
    );
    setAcadTotal(
      methods
        .getValues(name)
        .filter(row => row.readingType === 'academic')
        .reduce((a, b) => a + (b.playerScore || 0), 0),
    );
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
        <div>
          <table className={styles['scorecard-table']}>
            <thead>
              <tr>
                <th>Recreational Reading</th>
                <th>Notes</th>
                <th>Scores</th>
                <th>Academic Reading</th>
                <th>Notes</th>
                <th>Scores</th>
              </tr>
            </thead>
            <tbody>
              <AssessmentRows formName={name} formFields={fields} editState={editState} />
            </tbody>
          </table>
          <table className={`${styles['scorecard-table']} ${styles['indiv-score-table']}`}>
            <thead>
              <tr>
                <th>Recreational Reading Total</th>
                <th>Academic Reading Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{recTotal}</td>
                <td>{acadTotal}</td>
              </tr>
            </tbody>
          </table>
          <table className={`${styles['scorecard-table']} ${styles['combined-score-table']}`}>
            <thead>
              <tr>
                <th>Combined Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{recTotal + acadTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
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

AttitudeScoreCard.propTypes = {
  name: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  tableData: PropTypes.shape({
    scores: PropTypes.arrayOf(PropTypes.number),
    notes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setTableData: PropTypes.func.isRequired,
};

export default AttitudeScoreCard;
