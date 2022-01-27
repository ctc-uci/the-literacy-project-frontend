import './students-edit.css';
import { React, useState } from 'react';
import EditStudentModal from '../../components/EditStudentModal/EditStudentModal';

const StudentsEditView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  // console.log('modalIsOpen is');
  // console.log(modalIsOpen);
  // console.log('SetModalOpen is');
  // console.log(setModalOpen);

  return (
    <>
      <div className="students-edit-view">
        <div className="edit-student-button-container">
          <button
            className="edit-student-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Edit Student
          </button>
        </div>
        <div>
          <EditStudentModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
          {/* <div>This is the student create view</div> */}
        </div>
      </div>
    </>
  );
};

export default StudentsEditView;
