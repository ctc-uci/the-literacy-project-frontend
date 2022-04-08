import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

import AssessmentRows from './AttitudeRows';

import styles from './AttitudeScoreCard.module.css';
import rowData from './rowData';

const ScoreCardButton = ({ editState, setEditState }) => {
  const setAsEditing = e => {
    e.preventDefault();
    setEditState('editing');
  };
  if (editState === 'newInput') {
    return (
      <Button as="button" type="button" variant="warning" onClick={e => setAsEditing(e)}>
        Input Scores +
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
  const [recTotal, setRecTotal] = useState(0);
  const [acadTotal, setAcadTotal] = useState(0);

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

  // Populate table on load
  useEffect(() => {
    methods.setValue(
      name,
      rowData.map((row, i) => ({
        ...row,
        playerScore: tableData?.scores?.[i] ?? 0,
        notes: tableData?.notes?.[i] ?? '',
      })),
    );
    setEditState(tableData === null ? 'newInput' : 'editExisting');

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

  const onSubmit = async data => {
    const scores = data[name].map(row => row.playerScore);

    const formattedData = {
      [name]: scores,
      notes: data.notes,
    };

    // eslint-disable-next-line no-console
    console.log(formattedData);

    setEditState('editExisting');
    setTableData(formattedData);
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
