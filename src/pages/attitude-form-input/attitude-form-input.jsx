import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TLPBackend, scrollToTop } from '../../common/utils';

import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import AttitudeScoreCard from '../../components/AttitudeForm/AttitudeScoreCard';
import ImprovementGraph from '../../components/ImprovementGraph/ImprovementGraph';
import styles from './attitude-form-input.module.css';

const AttitudeFormInput = () => {
  const { studentID } = useParams();

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
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, data);
    setState({
      notes: data.notes,
      scores: res.data?.[scoreName],
    });
  };

  useEffect(async () => {
    fetchStudentData();
  }, []);

  return (
    <div className={styles['form-wrapper']}>
      <ReturnHeader
        returnText={`Return to ${'Last, First'}`}
        returnLink="/"
        rightText="Reading Attitude Survey"
      />
      <hr size="1" className={styles.divider} />
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
  );
};

export default AttitudeFormInput;
