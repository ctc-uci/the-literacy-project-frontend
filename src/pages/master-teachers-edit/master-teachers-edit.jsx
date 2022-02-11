import './master-teachers-edit.css';
import { React, useState } from 'react';
import EditTeacherModal from '../../components/EditMasterTeacherModal/EditMasterTeacherModal';

const MasterTeachersEditView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="master-teachers-edit-view">
        <div className="create-master-teacher-button-container">
          <button
            className="create-master-teacher-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Edit Teacher
          </button>
        </div>
        <EditTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
        {/* <div>This is the master teacher edit view</div> */}
      </div>
    </>
  );
};

export default MasterTeachersEditView;
