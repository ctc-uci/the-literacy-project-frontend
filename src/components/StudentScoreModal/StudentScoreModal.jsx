import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, CloseButton } from 'react-bootstrap';
import { TLPBackend } from '../../common/utils';

import styles from './StudentScoreModal.module.css';

const StudentScoreModal = ({ isOpen, setIsOpen, studentId }) => {
  // await TLPBackend.get(`/admins/${adminId}`, {
  // });
  const [studentData, setStudentData] = useState({});

  useEffect(async () => {
    const res = await TLPBackend.get(`/students/${studentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setStudentData(res);
  }, []);

  return (
    <Modal show={isOpen} size="lg" centered onHide={() => setIsOpen(false)}>
      <Modal.Header>
        <Modal.Title className={styles.modalTitle}>First Last Scores</Modal.Title>
        <CloseButton onClick={() => setIsOpen(false)} />
      </Modal.Header>
      <Modal.Body>{JSON.stringify(studentData, null, 2)}</Modal.Body>
    </Modal>
  );
};

StudentScoreModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  studentId: PropTypes.number.isRequired,
};

export default StudentScoreModal;
