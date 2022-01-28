import './teachers-confirm.css';
import { React, useState } from 'react';
import ConfirmTeacherModal from '../../components/ConfirmTeacherModal/ConfirmTeacherModal';

const TeachersConfirmation = () => {
  const [modalIsOpen, setModelOpen] = useState(false);
  return (
    <div className="teachers-confirm-view">
      <div className="confirm-teacher-button-container">
        <button
          type="button"
          className="confirm-teacher-button"
          onClick={() => {
            setModelOpen(true);
          }}
        >
          confirm
        </button>
      </div>
      <ConfirmTeacherModal isOpen={modalIsOpen} setIsOpen={setModelOpen} />
    </div>
  );
};

export default TeachersConfirmation;
