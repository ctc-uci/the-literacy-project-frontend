import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TLPBackend, scrollToTop } from '../../common/utils';

import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import Graph from '../../components/Graph/Graph';
import styles from './assessment-scorecard-input.module.css';

// eslint-disable-next-line react/prop-types, no-unused-vars
const ImprovementGraph = ({ studentData }) => {
  // const MAX_SCORE = 93;

  // scoresArray.reduce((tot, a) => tot + a, 0)) / MAX_SCORE) * 100;
  return <Graph xLabels={['Attitudinal', 'Academic']} preData={[10, 10]} postData={[20, 20]} />;
};

const AssessmentScorecardInput = () => {
  const { studentID } = useParams();
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
  });
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
      setStudentData(res.data);
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
        returnText={`Return to ${studentData?.lastName}, ${studentData?.firstName}`}
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
      <h3 className={styles['graph-header']}>Improvement</h3>
      <div className={styles['improvement-graph']}>
        <ImprovementGraph studentData={studentData} />
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
