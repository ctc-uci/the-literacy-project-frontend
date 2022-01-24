import './students-create.css';
import { React, useState } from 'react';
import CreateStudentModal from './CreateStudentModal';

const StudentsCreateView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  // console.log('modalIsOpen is');
  // console.log(modalIsOpen);
  // console.log('SetModalOpen is');
  // console.log(setModalOpen);

  return (
    <>
      <div className="students-create-view">
        <div className="create-student-button-container">
          <button
            className="create-student-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Student
          </button>
        </div>
        <div>
          <CreateStudentModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
          {/* <div>This is the student create view</div> */}
        </div>
      </div>
    </>
  );
};

export default StudentsCreateView;
