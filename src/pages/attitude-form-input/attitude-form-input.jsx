import React, { useState, useEffect } from 'react';
import { TLPBackend } from '../../common/utils';

import AttitudeScoreCard from '../../components/AttitudeForm/AttitudeScoreCard';
import styles from './attitude-form-input.module.css';

const AttitudeFormInput = () => {
  // TODO: get studentID
  const studentID = 1;

  const [preTestData, setPreTestData] = useState([]);
  const [postTestData, setPostTestData] = useState([]);

  const fetchStudentScores = async () => {
    try {
      const res = await TLPBackend.get(`./students/${studentID}`);
      setPreTestData(res.data.pretestR);
      setPostTestData(res.data.posttestR);
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
        <AttitudeScoreCard
          name="pretestA"
          headerText="Pre-Test"
          tableData={preTestData}
          setTableData={data => setStudentScores(setPreTestData, 'pretestR', data)}
        />
        <AttitudeScoreCard
          name="posttestA"
          headerText="Post-Test"
          tableData={postTestData}
          setTableData={data => setStudentScores(setPostTestData, 'posttestR', data)}
        />
      </div>
    </div>
  );
};

export default AttitudeFormInput;
