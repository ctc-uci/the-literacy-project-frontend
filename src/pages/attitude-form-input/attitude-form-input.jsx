import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TLPBackend } from '../../common/utils';
import ReturnHeader from '../../common/ReturnHeader/ReturnHeader';
import { AttitudeScoreCard, ImprovementGraph } from '../../components/AssessmentForms';
import styles from './attitude-form-input.module.css';

const AttitudeFormInput = () => {
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
          returnLink={`/student/${studentID}`}
          rightText="Reading Attitude Survey"
        />
        <hr size="1" className={styles.divider} />
        <AttitudeScoreCard
          name="pretestR"
          headerText="Pre-Test"
          tableData={{
            scores: studentData.pretestR,
            notes: studentData.pretestRNotes,
          }}
          setTableData={data => updateStudentData('pretestR', data)}
        />
        <AttitudeScoreCard
          name="posttestR"
          headerText="Post-Test"
          tableData={{
            scores: studentData.posttestR,
            notes: studentData.posttestRNotes,
          }}
          setTableData={data => updateStudentData('posttestR', data)}
        />
        <h3 className={styles['graph-header']}>Improvement</h3>
        <div className={styles['improvement-graph']}>
          <ImprovementGraph studentData={studentData} />
        </div>
      </div>
    </div>
  );
};

export default AttitudeFormInput;
