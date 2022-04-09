import React, { useState, useEffect } from 'react';
import { TLPBackend, scrollToTop } from '../../common/utils';

import AttitudeScoreCard from '../../components/AttitudeForm/AttitudeScoreCard';
import ImprovementGraph from '../../components/ImprovementGraph/ImprovementGraph';
import styles from './attitude-form-input.module.css';

const AttitudeFormInput = () => {
  // TODO: get studentID
  const studentID = 1;

  const [preTestData, setPreTestData] = useState({
    notes: [],
    scores: [],
  });
  const [postTestData, setPostTestData] = useState({
    notes: [],
    scores: [],
  });

  const fetchStudentData = async () => {
    try {
      const res = await TLPBackend.get(`./students/${studentID}`);
      setPreTestData({
        scores: res.data.pretestR,
        notes: [],
      });
      setPostTestData({
        scores: res.data.posttestR,
        notes: [],
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const setStudentData = async (setState, scoreName, data) => {
    console.log('setting student data');
    console.log(data);
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, data);
    setState({
      notes: [],
      scores: res.data?.[scoreName],
    });
  };

  useEffect(async () => {
    fetchStudentData();
  }, []);

  return (
    <>
      <div>Temporarily reading data from student with ID: {studentID}</div>
      <div className={styles['form-wrapper']}>
        <AttitudeScoreCard
          name="pretestR"
          headerText="Pre-Test"
          tableData={preTestData}
          setTableData={data => setStudentData(setPreTestData, 'pretestR', data)}
        />
        <AttitudeScoreCard
          name="posttestR"
          headerText="Post-Test"
          tableData={postTestData}
          setTableData={data => setStudentData(setPostTestData, 'posttestR', data)}
        />
        <div className={styles['improvement-graph']}>
          <ImprovementGraph data={{ preTestData, postTestData }} />
        </div>
        <div
          onClick={() => scrollToTop()}
          onKeyDown={() => scrollToTop()}
          className={styles['top-button']}
          role="button"
          tabIndex="0"
        >
          Back to Top
        </div>
      </div>
    </>
  );
};

export default AttitudeFormInput;
