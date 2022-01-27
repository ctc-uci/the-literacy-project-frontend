import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateTeacherModal.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const CreateTeacherModal = ({ isOpen, setIsOpen }) => {
  // const CreateTeacherModal = () => {
  // console.log('isOpen is');
  // console.log(isOpen);
  // console.log('setIsOpen is');
  // console.log(setIsOpen);
  // Placeholders, replace later with backend call
  // const [districts, setDistricts] = useState([]);
  const districts = ['District 1', 'District 2', 'District 3', 'District 4'];
  const [district, setDistrict] = useState('Default District');
  // Placeholders, replace later with backend call
  // const [schools, setSchools] = useState([]);
  const schools = ['School 1', 'School 2', 'School 3', 'School 4'];
  const [school, setSchool] = useState('No School');
  const [email, setEmail] = useState('default@email.com');

  return isOpen ? (
    <>
      <div className="create-teacher-modal">
        <div className="create-teacher-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="create-teacher-modal-top-bar-title">Create Teacher Account</div>
          <div className="create-teacher-modal-exit-button">
            <button
              type="button"
              className="create-teacher-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="create-teacher-modal-body">
          {/* create the form */}
          <div className="create-teacher-modal-field-desc">Area</div>
          <DropdownMenu choices={districts} current={district} setFn={setDistrict} />
          <div className="create-teacher-modal-field-desc">Email</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="create-teacher-modal-field-desc">Site</div>
          <DropdownMenu choices={schools} current={school} setFn={setSchool} />
        </div>
        <div className="create-teacher-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className="create-send-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Send and Create Another
          </button>
          <button
            type="button"
            className="create-save-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  ) : null;
};

CreateTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateTeacherModal;
