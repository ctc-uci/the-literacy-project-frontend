import './master-teachers-create.css';
import { React, useState } from 'react';
import CreateTeacherModal from '../../components/CreateTeacherModal/CreateTeacherModal';

const TeachersCreateView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  // console.log('modalIsOpen is');
  // console.log(modalIsOpen);
  // console.log('SetModalOpen is');
  // console.log(setModalOpen);

  return (
    <>
      <div className="teachers-create-view">
        <div className="create-teacher-button-container">
          <button
            className="create-teacher-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Teacher
          </button>
        </div>
        <CreateTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
        {/* <div>This is the teacher create view</div> */}
      </div>
    </>
  );
};

export default TeachersCreateView;
