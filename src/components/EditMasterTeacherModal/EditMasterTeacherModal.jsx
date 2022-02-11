import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './EditMasterTeacherModal.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const EditMasterTeacherModal = ({ isOpen, setIsOpen }) => {
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
  // Placeholders, replace later with backend call
  // const [status, setStatus] = useState("Active");
  const statuses = ['Active', 'Inactive'];
  const [status, setStatus] = useState('Active');

  const [firstName, setFirstName] = useState('Sam');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('default@email.com');

  return isOpen ? (
    <>
      <div className="edit-master-teacher-modal">
        <div className="edit-master-teacher-modal-top-bar">
          <div className="edit-master-teacher-modal-top-bar-title">Edit Teacher</div>
          <div className="edit-master-teacher-modal-exit-button">
            <button
              type="button"
              className="edit-master-teacher-modal-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="edit-master-teacher-modal-body">
          {/* create the form */}
          <div className="edit-master-teacher-modal-field-desc">Area</div>
          <DropdownMenu choices={districts} current={district} setFn={setDistrict} />
          <div className="edit-master-teacher-modal-field-desc">First Name</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <div className="edit-master-teacher-modal-field-desc">Last Name</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <div className="edit-master-teacher-modal-field-desc">Email</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="edit-master-teacher-modal-field-desc">Status</div>
          <DropdownMenu choices={statuses} current={status} setFn={setStatus} />
          <div className="edit-master-teacher-modal-field-desc">Assign Site</div>
          <DropdownMenu choices={schools} current={school} setFn={setSchool} />
        </div>
        <div className="edit-master-teacher-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className="edit-master-teacher-modal-delete-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="edit-master-teacher-modal-save-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  ) : null;
};

EditMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditMasterTeacherModal;
