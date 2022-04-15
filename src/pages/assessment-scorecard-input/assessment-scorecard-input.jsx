import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { TLPBackend, scrollToTop } from '../../common/utils';

import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import Graph from '../../components/Graph/Graph';
import styles from './assessment-scorecard-input.module.css';

// eslint-disable-next-line react/prop-types, no-unused-vars
const ImprovementGraph = ({ studentData }) => {
  const MAX_ASSESSMENT_SCORE = 93;
  const MAX_ATTITUDE_SCORE = 80;

  const preAttitude =
    (studentData?.pretestR?.reduce((tot, a) => tot + a, 0) / MAX_ATTITUDE_SCORE) * 100;
  const postAttitude =
    (studentData?.posttestR?.reduce((tot, a) => tot + a, 0) / MAX_ATTITUDE_SCORE) * 100;
  const preAssessment =
    (studentData?.pretestA?.reduce((tot, a) => tot + a, 0) / MAX_ASSESSMENT_SCORE) * 100;
  const postAssessment =
    (studentData?.posttestA?.reduce((tot, a) => tot + a, 0) / MAX_ASSESSMENT_SCORE) * 100;

  return (
    <Graph
      xLabels={['Attitudinal', 'Academic']}
      preData={[preAttitude, preAssessment]}
      postData={[postAttitude, postAssessment]}
    />
  );
};

const AssessmentScorecardInput = () => {
  const { studentID } = useParams();
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    pretestA: [],
    pretestANotes: [],
    posttestA: [],
    posttestANotes: [],
    pretestR: [],
    pretestRNotes: [],
    posttestR: [],
    posttestRNotes: [],
  });

  const fetchStudentScores = async () => {
    try {
      const res = await TLPBackend.get(`./students/${studentID}`);
      setStudentData(res?.data);
      // setPreTestData({
      //   scores: res.data.pretestA,
      //   notes: res.data.pretestANotes,
      // });
      // setPostTestData({
      //   scores: res.data.posttestA,
      //   notes: res.data.posttestANotes,
      // });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const setStudentScores = async (scoreName, data) => {
    console.log(data);
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, data);
    setStudentData({
      ...studentData,
      [scoreName]: res.data?.[scoreName],
      [`${scoreName}Notes`]: res.data?.[`${scoreName}Notes`],
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
        tableData={{
          scores: studentData.pretestA,
          notes: studentData.pretestANotes,
        }}
        setTableData={data => setStudentScores('pretestA', data)}
      />
      <AssessmentScoreCard
        name="posttestA"
        headerText="Post-Test"
        tableData={{
          scores: studentData.posttestA,
          notes: studentData.posttestANotes,
        }}
        setTableData={data => setStudentScores('posttestA', data)}
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

ImprovementGraph.propTypes = {
  studentData: PropTypes.shape({
    pretestR: PropTypes.arrayOf(PropTypes.number),
    posttestR: PropTypes.arrayOf(PropTypes.number),
    pretestA: PropTypes.arrayOf(PropTypes.number),
    posttestA: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default AssessmentScorecardInput;
