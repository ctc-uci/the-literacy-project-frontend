import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TLPBackend, scrollToTop } from '../../common/utils';

import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import ImprovementGraph from '../../components/ImprovementGraph/ImprovementGraph';
import styles from './assessment-scorecard-input.module.css';

const AssessmentScorecardInput = () => {
  const { studentID } = useParams();

  const [preTestData, setPreTestData] = useState({
    notes: [],
    scores: [],
  });
  const [postTestData, setPostTestData] = useState({
    notes: [],
    scores: [],
  });

  const fetchStudentScores = async () => {
    try {
      const res = await TLPBackend.get(`./students/${studentID}`);
      setPreTestData({
        scores: res.data.pretestA,
        notes: res.data.pretestANotes,
      });
      setPostTestData({
        scores: res.data.posttestA,
        notes: res.data.posttestANotes,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const setStudentScores = async (setState, scoreName, data) => {
    console.log(data);
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, data);
    setState({
      notes: res.data?.[`${scoreName}Notes`],
      scores: res.data?.[scoreName],
    });
  };

  useEffect(async () => {
    fetchStudentScores();
  }, []);

  return (
    <div className={styles['form-wrapper']}>
      <ReturnHeader
        returnText={`Return to ${'Last, First'}`}
        returnLink="/"
        rightText="Assessment Score Card"
      />
      <hr size="1" className={styles.divider} />
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

export default AssessmentScorecardInput;
