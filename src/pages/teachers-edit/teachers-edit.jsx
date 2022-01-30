import './teachers-edit.css';
import { React, useState } from 'react';
import EditTeacherModal from '../../components/EditTeacherModal/EditTeacherModal';

const TeachersEditView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="teachers-edit-view">
        <div className="create-teacher-button-container">
          <button
            className="create-teacher-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Edit Teacher
          </button>
        </div>
        <EditTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
        {/* <div>This is the teacher edit view</div> */}
      </div>
    </>
  );
};

export default TeachersEditView;
