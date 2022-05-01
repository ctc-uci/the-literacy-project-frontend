import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal } from 'react-bootstrap';
import { TLPBackend, calculateSingleStudentScores } from '../../common/utils';
import Graph from '../Graph/Graph';
import styles from './StudentScoreModal.module.css';

const EmptyText = () => (
  <div className={styles.empty}>
    <p>No score data for this student</p>
  </div>
);

const StudentScoreModal = ({ isOpen, setIsOpen, studentId }) => {
  const [studentScores, setStudentScores] = useState();
  const [studentName, setStudentName] = useState('');

  useEffect(async () => {
    if (isOpen) {
      console.log('fetching data');
      const res = await TLPBackend.get(`/students/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setStudentName(`${res?.data.firstName} ${res?.data.lastName}`);

      const missingScores =
        res?.data.pretestR === null &&
        res?.data.posttestR === null &&
        res?.data.pretestA === null &&
        res?.data.posttestA === null;
      setStudentScores(missingScores ? null : calculateSingleStudentScores(res?.data));
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} size="lg" centered onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>{studentName} Scores</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.graphWrapper}>
          {/* {JSON.stringify(studentScores, null, 2)} */}
          {studentScores ? (
            <Graph
              xLabels={['Attitudinal', 'Academic']}
              preData={[studentScores.preAttitude, studentScores.preAssessment]}
              postData={[studentScores.postAttitude, studentScores.postAssessment]}
            />
          ) : (
            <EmptyText />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

StudentScoreModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  studentId: PropTypes.number.isRequired,
};

export default StudentScoreModal;
