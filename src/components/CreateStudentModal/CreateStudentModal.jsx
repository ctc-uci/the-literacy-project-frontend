import { React, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
// import Dropdown from 'react-bootstrap/Dropdown';
import styles from './CreateStudentModal.module.css';
import { TLPBackend } from '../../common/utils';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const CreateStudentModal = ({ siteId, teacherId, isOpen, setIsOpen }) => {
  // const CreateTeacherModal = () => {
  // console.log('isOpen is');
  // console.log(isOpen);
  // console.log('setIsOpen is');
  // console.log(setIsOpen);
  // Placeholders, replace later with backend call
  // const [districts, setDistricts] = useState([]);
  // const districts = ['District 1', 'District 2', 'District 3', 'District 4'];
  // const [district, setDistrict] = useState('Default District');
  // Placeholders, replace later with backend call
  // const [schools, setSchools] = useState([]);
  // const schools = ['School 1', 'School 2', 'School 3', 'School 4'];
  // const [school, setSchool] = useState('No School');
  // const [email, setEmail] = useState('default@email.com');
  const [error, setError] = useState(null);
  const [studentFirstName, setStudentFirstName] = useState('First Name');
  const [studentLastName, setStudentLastName] = useState('Last Name');
  const [homeTeacher, setHomeTeacher] = useState('Last Name');
  const ethnicities = ['Ethnicity 1', 'Ethnicity 2', 'Ethnicity 3', 'Ethnicity 4'];
  const [ethnicity, setEthnicity] = useState('Select Ethnicity');
  const studentGenders = ['Male', 'Female', 'Non-specified'];
  const [studentGender, setStudentGender] = useState('Select');
  const studentGrades = [
    '1st grade',
    '2nd grade',
    '3rd grade',
    '4th grade',
    '5th grade',
    '6th grade',
  ];
  const [studentGrade, setStudentGrade] = useState('2nd grade');
  const [studentGroups] = [];
  const [studentGroup, setStudentGroup] = useState('Default Student Group');
  // const schoolYears = ['2022-23', '2021-22'];
  // const [schoolYear, setSchoolYear] = useState('Default School Year');
  // const cycles = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];
  // const [cycle, setCycle] = useState('Default Cycle');

  const closeModal = () => {
    setIsOpen(false);
  };

  // Get possible student groups
  useEffect(async () => {
    const res = await TLPBackend.get(`student-groups/site/${siteId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const studentGroupData = res.data;
      const masterTeacherGroups = [];
      // Filter for groups that belong to site and teacher
      studentGroupData.forEach(group => {
        if (group.masterTeacherId === teacherId) {
          masterTeacherGroups.push(group);
        }
      });
      setStudentGender(typeof masterTeacherGroups); // "object"
    } else {
      setError(error);
    }
  }, []);

  /*
  const createStudent = () => {
    TLPBackend.post(`students`), {
      firstName: studentFirstName,
      lastName: studentLastName,
      grade: studentGrade,
      gender: studentGender,
      homeTeacher: homeTeacher,
      studentGroupId:
    };
  };
  */

  return isOpen ? (
    <>
      <div className={styles['create-student-modal']}>
        <div className={styles['create-student-modal-top-bar']}>
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className={styles['create-student-modal-top-bar-title']}>Create Student</div>
          <div className={styles['create-student-modal-exit-button']}>
            <button
              type="button"
              className={styles['create-student-exit-button']}
              onClick={() => {
                closeModal();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className={styles['create-student-modal-body']}>
          {/* create the form */}
          <div>{studentGroups}</div>
          <div className={styles['create-student-modal-field-desc']}>First Name</div>
          <input
            className={styles['modal-text-input']}
            type="text"
            placeholder={studentFirstName}
            onChange={e => setStudentFirstName(e.target.value)}
          />
          <div className={styles['create-student-modal-field-desc']}>Last Name</div>
          <input
            className={styles['modal-text-input']}
            type="text"
            placeholder={studentLastName}
            onChange={e => setStudentLastName(e.target.value)}
          />
          <div className={styles['create-student-modal-field-desc']}>Ethnicity</div>
          <DropdownMenu choices={ethnicities} current={ethnicity} setFn={setEthnicity} />
          <div className={styles['create-student-modal-field-desc']}>Gender</div>
          <DropdownMenu choices={studentGenders} current={studentGender} setFn={setStudentGender} />
          <div className={styles['create-student-modal-field-desc']}>Grade</div>
          <DropdownMenu choices={studentGrades} current={studentGrade} setFn={setStudentGrade} />
          <div className={styles['create-student-modal-field-desc']}>Home Teacher</div>
          <input
            className={styles['modal-text-input']}
            type="text"
            placeholder={homeTeacher}
            onChange={e => setHomeTeacher(e.target.value)}
          />
          <div className={styles['create-student-modal-field-desc']}>Add to Student Group</div>
          <DropdownMenu choices={studentGroups} current={studentGroup} setFn={setStudentGroup} />
        </div>
        <div className={styles['create-student-modal-bottom-bar']}>
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className={styles['create-delete-button']}
            onClick={() => {
              closeModal();
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className={styles['create-add-button']}
            onClick={() => {
              closeModal();
            }}
          >
            Create and Add Another
          </button>
          <button
            type="button"
            className={styles['create-save-button']}
            onClick={() => {
              closeModal();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  ) : null;
};

CreateStudentModal.propTypes = {
  siteId: PropTypes.number.isRequired,
  teacherId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateStudentModal;
