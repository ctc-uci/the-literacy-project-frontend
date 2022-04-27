import { React, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { TLPBackend } from '../../common/utils';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import styles from './CreateStudentModal.module.css';

// import { create } from 'yup/lib/Reference';

const CreateStudentModal = ({ siteId, teacherId, isOpen, setIsOpen }) => {
  const [error, setError] = useState(null);
  const [studentFirstName, setStudentFirstName] = useState('First Name');
  const [studentLastName, setStudentLastName] = useState('Last Name');

  const [homeTeacher, setHomeTeacher] = useState('Home Teacher');

  const ethnicities = [
    'white',
    'black',
    'asian',
    'latinx',
    'american indian or alaska native',
    'non-specified',
  ];
  const [ethnicity, setEthnicity] = useState('Select Ethnicity');
  const [addedEthnicity, setAddedEthicity] = useState([]);
  const addEthnicity = ethnic => {
    // console.log(addedEthnicity);
    if (!addedEthnicity.includes(ethnic)) {
      addedEthnicity.push(ethnic);
      setAddedEthicity(addedEthnicity);
    }
    setEthnicity(ethnic);
  };

  const removeEthnicity = e => {
    const name = e.target.getAttribute('name');
    setAddedEthicity(addedEthnicity.filter(ethnic => ethnic !== name));
  };

  const studentGenders = ['Male', 'Female', 'Non-specified'];
  const [studentGender, setStudentGender] = useState('Select Gender');
  const studentGrades = [
    '1st grade',
    '2nd grade',
    '3rd grade',
    '4th grade',
    '5th grade',
    '6th grade',
  ];
  const [studentGrade, setStudentGrade] = useState('Select Grade');
  const [studentGroupNames, setStudentGroupNames] = useState([]);
  const [groupNameToId, setGroupNameToId] = useState({});
  const [studentGroup, setStudentGroup] = useState('Select Group');

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
      const nameToId = {};
      // Filter for groups that belong to site and teacher
      studentGroupData.forEach(group => {
        if (group.masterTeacherId === teacherId) {
          masterTeacherGroups.push(group.name);
          nameToId[group.name] = group.groupId;
        }
      });

      setGroupNameToId(nameToId);
      setStudentGroupNames(masterTeacherGroups);
    } else {
      setError(error);
    }
  }, []);

  const createStudent = async () => {
    const formData = {
      firstName: studentFirstName,
      lastName: studentLastName,
      grade: parseInt(studentGrade.charAt(0), 10),
      gender: studentGender.toLowerCase(),
      homeTeacher,
      studentGroupId: groupNameToId[studentGroup],
      ethnicity: addedEthnicity,
    };
    await TLPBackend.post('/students', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    closeModal();
  };

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Create New Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={styles['form-body']}>
          <div className={styles['input-area']}>
            <p className={styles.required}>First Name</p>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              onChange={e => setStudentFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-area']}>
            <p className={styles.required}>Last Name</p>
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              onChange={e => setStudentLastName(e.target.value)}
              required
            />
          </div>

          <div className={styles['input-area']}>
            <p>Ethnicity</p>
            <div className={styles['selected-ethnicity']}>
              {/* buttons to show which ethnicies are already selected and removed when clicked */}
              {addedEthnicity.map(ethnic => {
                return (
                  <Badge key={ethnic} text="dark" className={styles['ethnicity-badge']}>
                    <BsX cursor="pointer" name={ethnic} onClick={removeEthnicity} /> {ethnic}
                  </Badge>
                );
              })}
            </div>
            <DropdownMenu choices={ethnicities} current={ethnicity} setFn={addEthnicity} />
          </div>
          <div className={styles['input-area']}>
            <p className={styles.required}>Gender</p>
            <DropdownMenu
              choices={studentGenders}
              current={studentGender}
              setFn={setStudentGender}
              outerClass="w-100"
            />
          </div>
          <div className={styles['input-area']}>
            <p className={styles.required}>Grade</p>
            <DropdownMenu
              choices={studentGrades}
              current={studentGrade}
              setFn={setStudentGrade}
              outerClass="w-100"
            />
          </div>
          <div className={styles['input-area']}>
            <p>Home Teacher</p>
            <input
              type="text"
              className="form-control"
              name="homeTeacher"
              placeholder="Home Teacher"
              onChange={e => setHomeTeacher(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-area']}>
            <p>Add To Student Group</p>
            <DropdownMenu
              choices={studentGroupNames}
              current={studentGroup}
              setFn={setStudentGroup}
              outerClass="w-100"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" className={styles['cancel-button']} onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className={styles['save-button']}
          onClick={() => createStudent()}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CreateStudentModal.propTypes = {
  siteId: PropTypes.number.isRequired,
  teacherId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateStudentModal;
