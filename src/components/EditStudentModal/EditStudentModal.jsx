import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './EditStudentModal.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const EditStudentModal = ({ isOpen, setIsOpen }) => {
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
  // const [email, setEmail] = useState('default@email.com');
  const [firstName, setFirstName] = useState('Default First Name');
  const [lastName, setLastName] = useState('Default Last Name');
  const ethnicities = ['Ethnicity 1', 'Ethnicity 2', 'Ethnicity 3', 'Ethnicity 4'];
  const [ethnicity, setEthnicity] = useState('Default Ethnicity');
  const studentGroups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];
  const [studentGroup, setStudentGroup] = useState('Default Student Group');
  const schoolYears = ['2021-22', '2020-21', '2019-20', '2018-19'];
  const [schoolYear, setSchoolYear] = useState('Default School Year');
  const cycles = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];
  const [cycle, setCycle] = useState('Default Cycle');

  return isOpen ? (
    <>
      <div className="edit-student-modal">
        <div className="edit-student-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="edit-student-modal-top-bar-title">Edit Student</div>
          <div className="edit-student-modal-exit-button">
            <button
              type="button"
              className="edit-student-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="edit-student-modal-body">
          {/* create the form */}
          <div className="edit-student-modal-field-desc">District</div>
          <DropdownMenu choices={districts} current={district} setFn={setDistrict} />
          <div className="edit-student-modal-field-desc">First Name</div>
          <input
            className="modal-text-input"
            type="text"
            default_value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <div className="edit-student-modal-field-desc">Last Name</div>
          <input
            className="modal-text-input"
            type="text"
            default_value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <div className="edit-student-modal-field-desc">Ethnicity</div>
          <DropdownMenu choices={ethnicities} current={ethnicity} setFn={setEthnicity} />
          <div className="edit-student-modal-field-desc">Assign Site</div>
          <DropdownMenu choices={schools} current={school} setFn={setSchool} />
          <div className="edit-student-modal-field-desc">Student Group</div>
          <DropdownMenu choices={studentGroups} current={studentGroup} setFn={setStudentGroup} />
          <div className="edit-student-modal-field-desc">School Year</div>
          <DropdownMenu choices={schoolYears} current={schoolYear} setFn={setSchoolYear} />
          <div className="edit-student-modal-field-desc">Cycle</div>
          <DropdownMenu choices={cycles} current={cycle} setFn={setCycle} />
        </div>
        <div className="edit-student-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className="edit-student-modal-delete-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="edit-student-modal-save-changes-button"
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

EditStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditStudentModal;
