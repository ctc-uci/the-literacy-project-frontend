import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { TLPBackend, scrollToTop } from '../../common/utils';

import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import Graph from '../../components/Graph/Graph';
import styles from './assessment-scorecard-input.module.css';

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

  const fetchStudentData = async () => {
    try {
      const res = await TLPBackend.get(`./students/${studentID}`);
      setStudentData(res?.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const updateStudentData = async (scoreName, data) => {
    const res = await TLPBackend.put(`./students/update-scores/${studentID}`, data);
    setStudentData({
      ...studentData,
      [scoreName]: res.data?.[scoreName],
      [`${scoreName}Notes`]: res.data?.[`${scoreName}Notes`],
    });
  };

  useEffect(async () => {
    fetchStudentData();
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
        setTableData={data => updateStudentData('pretestA', data)}
      />
      <AssessmentScoreCard
        name="posttestA"
        headerText="Post-Test"
        tableData={{
          scores: studentData.posttestA,
          notes: studentData.posttestANotes,
        }}
        setTableData={data => updateStudentData('posttestA', data)}
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
