import React, { useState, useEffect } from 'react';
import { TLPBackend } from '../../common/utils';

import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import styles from './assessment-scorecard-input.module.css';

const AssessmentScorecardInput = () => {
  // TODO: get studentID
  const studentID = 1;

  const [preTestData, setPreTestData] = useState([]);
  const [postTestData, setPostTestData] = useState([]);

  const fetchStudentScores = async () => {
    try {
      const res = await TLPBackend.get(`./students/${studentID}`);
      setPreTestData(res.data.pretestA);
      setPostTestData(res.data.posttestA);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const setStudentScores = async (setState, scoreName, scores) => {
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, scores);
    setState(res.data?.[scoreName]);
  };

  useEffect(async () => {
    fetchStudentScores();
  }, []);

  return (
    <div>
      <div>Temporarily reading data from student with ID: {studentID}</div>
      <div className={styles['form-wrapper']}>
        <AssessmentScoreCard
          name="pretestA"
          headerText="Pre-Test"
          tableData={preTestData}
          setTableData={data => setStudentScores(setPreTestData, 'pretestA', data)}
        />
        <AssessmentScoreCard
          name="posttestA"
          headerText="Post-Test"
          tableData={postTestData}
          setTableData={data => setStudentScores(setPostTestData, 'posttestA', data)}
        />
      </div>
    </div>
  );
};

export default AssessmentScorecardInput;
