import React from 'react';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import styles from './assessment-scorecard-input.module.css';

const AssessmentScorecardInput = () => {
  // TODO: remove
  const studentID = 1;

  return (
    <div>
      <div>Temporarily reading data from student with ID: {studentID}</div>
      <div className={styles['form-wrapper']}>
        <AssessmentScoreCard studentID={studentID} name="pretestA" headerText="Pre-Test" />
        <AssessmentScoreCard studentID={studentID} name="posttestA" headerText="Post-Test" />
      </div>
    </div>
  );
};

export default AssessmentScorecardInput;
