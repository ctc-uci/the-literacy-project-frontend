import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TLPBackend } from '../../common/utils';
import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import { AssessmentScoreCard, ImprovementGraph } from '../../components/AssessmentForms';
import styles from './assessment-scorecard-input.module.css';

const AssessmentScorecardInput = () => {
  const { studentID } = useParams();
  const navigate = useNavigate();
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
      navigate('/');
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
    <div>
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
      </div>
    </div>
  );
};

export default AssessmentScorecardInput;
