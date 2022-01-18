import { React, useState, propTypes } from 'react';
// import { React, useState } from 'react';
import './CreateTeacherModal.css';

// const DropdownMenu = (choices, setFn) => {
//   <>
//     <div className="dropdown-wrapper">
//       {choices.map(choice => <div role="button" key={choice} value={choice} onClick={e=> setFn(e.target.value)}>{choice}</div>)}
//     </div>
//   </>
// };

const CreateTeacherModal = ({ isOpen, setIsOpen }) => {
  // console.log('isOpen is');
  // console.log(isOpen);
  // console.log('setIsOpen is');
  // console.log(setIsOpen);
  // Placeholders, replace later with backend call
  // const [districts, setDistricts] = useState(['District 1', 'District 2', 'District 3', 'District 4']);
  // const districts = ['District 1', 'District 2', 'District 3', 'District 4'];
  // const [district, setDistrict] = useState('Default District');
  const [email, setEmail] = useState('default@email.com');
  // Placeholders, replace later with backend call
  // const schools = ['School 1', 'School 2', 'School 3', 'School 4'];
  // const [schools, setSchools] = useState([]);
  // const [school, setSchool] = useState('No School');

  return (
    <>
      <div className="create-teacher-modal">
        <div className="create-teacher-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="create-teacher-modal-top-bar-title">Create Teacher Account</div>
          <div className="create-teacher-modal-exit-button">
            <button type="button" className="create-teacher-exit-button" onClick={setIsOpen(false)}>
              {isOpen} X
            </button>
          </div>
        </div>
        <div className="create-teacher-modal-body">
          {/* create the form */}
          {/* <input type="text" defaultValue={district} onChange={e => setDistrict(e.target.value)} /> */}
          {/* {district} <DropdownMenu choices={districts} setFn={setDistrict} /> */}
          <div>Email</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          {/* {school} <DropdownMenu choices={schools} setFn={setSchool} /> */}
        </div>
        <div className="create-teacher-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button type="button" className="create-send-button" onClick={setIsOpen(false)}>
            Send and Create Another
          </button>
          <button type="button" className="create-save-button" onClick={setIsOpen(false)}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

CreateTeacherModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  setIsOpen: propTypes.func.isRequired,
};

export default CreateTeacherModal;
