import { React, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Badge, Alert, CloseButton } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { TLPBackend } from '../../common/utils';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import styles from './CreateStudentModal.module.css';

// import { create } from 'yup/lib/Reference';

const CreateStudentModal = ({ siteId, teacherId, isOpen, setIsOpen }) => {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formSubmitted, setFormSubmmited] = useState(false);

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');

  const [homeTeacher, setHomeTeacher] = useState('');

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
    console.log(siteId);
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
    if (
      studentFirstName === '' ||
      studentLastName === '' ||
      studentGender === 'Select Gender' ||
      studentGrade === 'Select Grade' ||
      studentGroup === 'Select Group'
    ) {
      setFormSubmmited(true);
      return;
    }

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
    setShowAlert(true);
    closeModal();
  };

  return (
    <>
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Create New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles['form-body']}>
            <div className={styles['input-area']}>
              <p className={styles.required}>First Name</p>
              <input
                type="text"
                className={`form-control ${
                  studentFirstName === '' && formSubmitted ? styles['input-empty'] : ''
                }`}
                name="firstName"
                placeholder="First Name"
                onChange={e => setStudentFirstName(e.target.value)}
                required
              />
              {studentFirstName === '' && formSubmitted ? (
                <p className={styles['error-message']}>This field is required</p>
              ) : null}
            </div>
            <div className={styles['input-area']}>
              <p className={styles.required}>Last Name</p>
              <input
                type="text"
                className={`form-control ${
                  studentLastName === '' && formSubmitted ? styles['input-empty'] : ''
                }`}
                name="lastName"
                placeholder="Last Name"
                onChange={e => setStudentLastName(e.target.value)}
                required
              />
              {studentLastName === '' && formSubmitted ? (
                <p className={styles['error-message']}>This field is required</p>
              ) : null}
            </div>

            <div className={styles['input-area']}>
              <p className={styles.required}>Ethnicity</p>
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
                innerClass={
                  studentGender === 'Select Gender' && formSubmitted ? styles['input-empty'] : ''
                }
              />
              {studentGender === 'Select Gender' && formSubmitted ? (
                <p className={styles['error-message']}>This field is required</p>
              ) : null}
            </div>
            <div className={styles['input-area']}>
              <p className={styles.required}>Grade</p>
              <DropdownMenu
                choices={studentGrades}
                current={studentGrade}
                setFn={setStudentGrade}
                outerClass="w-100"
                innerClass={
                  studentGrade === 'Select Grade' && formSubmitted ? styles['input-empty'] : ''
                }
              />
              {studentGrade === 'Select Grade' && formSubmitted ? (
                <p className={styles['error-message']}>This field is required</p>
              ) : null}
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
              <p className={styles.required}>Add To Student Group</p>
              <DropdownMenu
                choices={studentGroupNames}
                current={studentGroup}
                setFn={setStudentGroup}
                outerClass="w-100"
                innerClass={
                  studentGroup === 'Select Group' && formSubmitted ? styles['input-empty'] : ''
                }
              />
              {studentGroup === 'Select Group' && formSubmitted ? (
                <p className={styles['error-message']}>This field is required</p>
              ) : null}
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
      {showAlert ? (
        <div className="center-block">
          <Alert variant="success" className={styles['alert-custom']}>
            Student Created Successfully
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

CreateStudentModal.propTypes = {
  siteId: PropTypes.number.isRequired,
  teacherId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateStudentModal;
