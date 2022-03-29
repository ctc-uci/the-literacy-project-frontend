import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* eslint-enable no-unused-vars */
import AssessmentRow from './AssessmentRow';
import styles from './AssessmentScoreCard.module.css';

const rowList = [
  {
    testNumber: 1,
    gameName: 'Alphabet Warm-Up Letters',
    phonicSkills: 'm, p, t, e, k, c, D, b, i, L, u, w, a, S, z',
    passingScore: '13/15',
    numQuestions: 15,
    playerScore: 0,
  },
  {
    testNumber: 2,
    gameName: 'Alphabet Warm-Up Sounds',
    phonicSkills: '/m/, /d/, /p/, /f/, /w/, /l/, /h/',
    passingScore: '6/7',
    numQuestions: 7,
    playerScore: 0,
  },
  {
    testNumber: 3,
    gameName: 'Short Vowel Kick',
    phonicSkills: 'pat, hit, bet, hut, hop, nak, rit, lep, tum, rof',
    passingScore: '8/10',
    numQuestions: 10,
    playerScore: 0,
  },
  {
    testNumber: 4,
    gameName: 'Slight Word Drop Kick',
    phonicSkills:
      'is, of, two, are, the, you, does, give, said, some, want, were, their, where, would',
    passingScore: '0/15',
    numQuestions: 15,
    playerScore: 0,
  },
];

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
      [name]: rowList,
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
        <button type="submit">Submit</button>
        <div className={styles.div}>
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
