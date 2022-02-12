import './master-teachers-create.css';
import { React, useState } from 'react';
import CreateMasterTeacherModal from '../../components/CreateMasterTeacherModal/CreateMasterTeacherModal';

const MasterTeachersCreateView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  // console.log('modalIsOpen is');
  // console.log(modalIsOpen);
  // console.log('SetModalOpen is');
  // console.log(setModalOpen);

  return (
    <>
      <div className="master-teachers-create-view">
        <div className="create-master-teacher-button-container">
          <button
            className="create-master-teacher-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Teacher
          </button>
        </div>
        <CreateMasterTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
        {/* <div>This is the master-teacher create view</div> */}
      </div>
    </>
  );
};

export default MasterTeachersCreateView;
