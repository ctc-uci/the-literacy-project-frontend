import './master-teachers-confirm.css';
import { React, useState } from 'react';
import ConfirmMasterTeacherModal from '../../components/ConfirmMasterTeacherModal/ConfirmMasterTeacherModal';

const MasterTeachersConfirmation = () => {
  const [modalIsOpen, setModelOpen] = useState(false);
  return (
    <div className="master-teachers-confirm-view">
      <div className="confirm-master-teacher-button-container">
        <button
          type="button"
          className="confirm-master-teacher-button"
          onClick={() => {
            setModelOpen(true);
          }}
        >
          confirm
        </button>
      </div>
      <ConfirmMasterTeacherModal isOpen={modalIsOpen} setIsOpen={setModelOpen} />
    </div>
  );
};

export default MasterTeachersConfirmation;
