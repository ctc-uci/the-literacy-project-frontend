import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import AssessmentRow from './AssessmentRow';

import styles from './AssessmentScoreCard.module.css';
import rowData from './rowData';

const AssessmentScoreCard = ({ name }) => {
  const [formOutput, setFormOutput] = useState();

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
    setFormOutput(formattedData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Button type="submit">Submit</Button>
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
              <AssessmentRow key={field.id} formName={name} fieldIndex={index} {...field} />
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

// Ideas for table layout:
// Have given information stored in an array of objects like [{testNumber: 1, gameName: "Alphabet", skillTest = "m,n,o,p", passingScore = "13/15"}, {...}, ...]
// And then to create the whole table just use the .map function or some other function to create each assessment row.

AssessmentScoreCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AssessmentScoreCard;
