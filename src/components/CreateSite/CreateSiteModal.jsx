import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateSiteModal.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const CreateSiteModal = ({ isOpen, setIsOpen }) => {
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
  // const [teachers, setTeachers] = useState([]);
  const teachers = ['Teacher 1', 'Teacher 2', 'Teacher 3', 'Teacher 4'];
  const [teacher, setTeacher] = useState('No Teacher');

  const [siteName, setSiteName] = useState('School Name');
  const [address, setAddress] = useState('School Address');

  return isOpen ? (
    <>
      <div className="create-site-modal">
        <div className="create-site-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="create-site-modal-top-bar-title">Create New School</div>
          <div className="create-site-modal-exit-button">
            <button
              type="button"
              className="create-site-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="create-site-modal-body">
          {/* create the form */}
          <div className="create-site-modal-field-desc">Area</div>
          <DropdownMenu choices={districts} current={district} setFn={setDistrict} />
          <div className="create-site-modal-field-desc">Name</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={siteName}
            onChange={e => setSiteName(e.target.value)}
          />
          <div className="create-site-modal-field-desc">Address</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={address}
            onChange={e => setAddress(e.target.value)}
          />
          <div className="create-site-modal-field-desc">Master Teacher</div>
          <DropdownMenu choices={teachers} current={teacher} setFn={setTeacher} />
        </div>
        <div className="create-site-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className="create-site-modal-save-create-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Save and Create Another
          </button>
          <button
            type="button"
            className="create-site-modal-save-button"
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

CreateSiteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateSiteModal;
