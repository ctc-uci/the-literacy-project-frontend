import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './EditTeacherModal.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const EditTeacherModal = ({ isOpen, setIsOpen }) => {
  const areas = ['District 1', 'District 2', 'District 3', 'District 4'];
  const [area, setArea] = useState('Default District');
  const sites = ['Site 1', 'Site 2', 'Site 3', 'Site 4'];
  const [site, setSite] = useState('No Site Selected');
  const [FirstName, setFirstName] = useState('Sam');
  const [LastName, setLastName] = useState('Smith');
  const [Email, setEmail] = useState('firstname@gmail.com');
  const status = ['Status 1', 'Status 2', 'Status 3', 'Status 4'];
  const [Status, setStatus] = useState('Active');

  return isOpen ? (
    <>
      <div className="edit-teacher-modal">
        <div className="edit-teacher-modal-top-bar">
          <div className="edit-teacher-modal-top-bar-title">Edit Teacher</div>
          <div className="edit-teacher-modal-exit-button">
            <button
              type="button"
              className="edit-teacher-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="edit-teacher-modal-body">
          <div className="edit-teacher-modal-field-desc">Area</div>
          <div className="drop-text">
            <DropdownMenu choices={areas} current={area} setFn={setArea} />
          </div>
          <div className="edit-teacher-modal-field-desc">First Name</div>
          <input
            className="modal-input"
            type="text"
            defaultValue={FirstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <div className="edit-teacher-modal-field-desc">Last Name</div>
          <input
            className="modal-input"
            type="text"
            defaultValue={LastName}
            onChange={e => setLastName(e.target.value)}
          />
          <div className="edit-teacher-modal-field-desc">Email</div>
          <input
            className="modal-input"
            type="text"
            defaultValue={Email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="edit-teacher-modal-field-desc">Status</div>
          <div className="drop-text">
            <DropdownMenu choices={status} current={Status} setFn={setStatus} />
          </div>
          <div className="edit-teacher-modal-field-desc">Assign Sites</div>
          <div className="drop-text">
            <DropdownMenu choices={sites} current={site} setFn={setSite} />
          </div>
        </div>
        <div className="edit-teacher-modal-bottom-bar">
          <button
            type="button"
            className="edit-send-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="edit-save-button"
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

EditTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditTeacherModal;
