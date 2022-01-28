import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './AddTeacherToDistrict.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const AddTeacherToDistrictModal = ({ isOpen, setIsOpen }) => {
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
  // Placeholders, replace later with backend call
  // const [teachers, setTeachers] = useState([]);
  const schools = ['School 1', 'School 2', 'School 3', 'School 4'];
  const [school, setSchool] = useState('No School');

  return isOpen ? (
    <>
      <div className="add-teacher-to-district-modal">
        <div className="add-teacher-to-district-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="add-teacher-to-district-modal-top-bar-title">Add Teacher to District</div>
          <div className="add-teacher-to-district-modal-exit-button">
            <button
              type="button"
              className="add-teacher-to-district-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="add-teacher-to-district-modal-body">
          {/* create the form */}
          <div className="add-teacher-to-district-modal-field-desc">Area</div>
          <DropdownMenu choices={districts} current={district} setFn={setDistrict} />
          <div className="add-teacher-to-district-modal-field-desc">Select Master Teacher</div>
          <DropdownMenu choices={teachers} current={teacher} setFn={setTeacher} />
          <div className="add-teacher-to-district-modal-field-desc">Assign School</div>
          <DropdownMenu choices={schools} current={school} setFn={setSchool} />
        </div>
        <div className="add-teacher-to-district-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className="add-teacher-to-district-modal-save-create-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Save and Add Another
          </button>
          <button
            type="button"
            className="add-teacher-to-district-modal-save-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  ) : null;
};

AddTeacherToDistrictModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddTeacherToDistrictModal;
