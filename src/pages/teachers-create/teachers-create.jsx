import './teachers-create.css';
import { React, useState } from 'react';
import CreateTeacherModal from './CreateTeacherModal';

const TeachersCreateView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  // console.log('modalIsOpen is');
  // console.log(modalIsOpen);
  // console.log('SetModalOpen is');
  // console.log(setModalOpen);

  return (
    <>
      <div>
        {/* <button className="teachers-create-view" type="button" onClick={setModalOpen(true)}>
          Add Teacher
        </button> */}
        This is the teacher create view
      </div>
      <CreateTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default TeachersCreateView;
