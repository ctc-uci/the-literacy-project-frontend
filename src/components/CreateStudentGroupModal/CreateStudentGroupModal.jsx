import { React, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { PropTypes } from 'prop-types';
import { Modal, Button, Badge } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { BsXLg } from 'react-icons/bs';
import Select from 'react-select';

import styles from './CreateStudentGroupModal.module.css';
import { TLPBackend } from '../../common/utils';

import StudentGroupDropdown from '../EditStudentGroupModal/StudentGroupDropdown';

const CreateStudentGroupModal = ({ siteId, teacherId, isOpen, setIsOpen }) => {
  const schoolYears = [
    '2020-2021',
    '2021-2022',
    '2022-2023',
    '2023-2024',
    '2024-2025',
    '2025-2026',
    '2026-2027',
    '2027-2028',
    '2028-2029',
    '2029-2030',
    '2030-2031',
  ];
  const schoolCycles = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];
  const meetingDays = [
    'Mondays',
    'Tuesdays',
    'Wednesdays',
    'Thursdays',
    'Fridays',
    'Saturdays',
    'Sundays',
  ];

  const [studentGroupInfo, setStudentGroupInfo] = useState({
    groupName: '',
    masterTeacherId: teacherId,
    schoolYear: 'Year',
    schoolCycle: 'Cycle',
    meetingDay: 'Day',
    meetingTime: 'Time',
  });

  const [validName, setValidName] = useState(true);
  const [validYear, setValidYear] = useState(true);
  const [validCycle, setValidCycle] = useState(true);
  const [validDay, setValidDay] = useState(true);
  const [validTime, setValidTime] = useState(true);

  // Students in the group
  const [currentStudents, setCurrentStudents] = useState([]);
  // Students in the system that are not in the group
  const [possibleStudents, setPossibleStudents] = useState();
  const [possibleStudentsLoaded, setPossibleStudentsLoaded] = useState(false);

  const getPossibleStudents = async () => {
    const siteStudents = await TLPBackend.get(`/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      const possibleStudentsObj = Object.assign(
        {},
        ...siteStudents.data.map(student => ({
          [student.studentId]: {
            studentId: student.studentId,
            firstName: student.firstName,
            lastName: student.lastName,
          },
        })),
      );
      setPossibleStudents(possibleStudentsObj);
      setPossibleStudentsLoaded(true);
    } catch (err) {
      // setError(err);
    }
  };

  const addToCurrentStudents = studentId => {
    // If studentId is already in currentStudents, skip
    if (studentId in currentStudents) {
      return;
    }

    setCurrentStudents({ ...currentStudents, [studentId]: possibleStudents[studentId] });
    // Remove student from possibleStudents
    const newPossibleStudents = possibleStudents;
    delete newPossibleStudents[studentId];
    setPossibleStudents(newPossibleStudents);
  };

  const removeFromCurrentStudents = studentId => {
    // If studentId is already in possibleStudents, skip
    if (studentId === -1 || studentId in possibleStudents) {
      return;
    }

    setPossibleStudents({ ...possibleStudents, [studentId]: currentStudents[studentId] });
    // Remove student from possibleStudents
    const newCurrentStudents = currentStudents;
    delete newCurrentStudents[studentId];
    setCurrentStudents(newCurrentStudents);
  };

  // Check that fields are not the default
  const checkNotDefaultFields = () => {
    let notDefault = true;
    if (studentGroupInfo.groupName === '') {
      setValidName(false);
      notDefault = false;
    }
    if (studentGroupInfo.schoolYear === 'Year') {
      setValidYear(false);
      notDefault = false;
    }
    if (studentGroupInfo.schoolCycle === 'Cycle') {
      setValidCycle(false);
      notDefault = false;
    }
    if (studentGroupInfo.meetingDay === 'Day') {
      setValidDay(false);
      notDefault = false;
    }
    if (studentGroupInfo.meetingTime === 'Time') {
      setValidTime(false);
      notDefault = false;
    }
    return notDefault;
  };

  const closeModal = () => setIsOpen(false);

  const resetModal = () => {
    setStudentGroupInfo({
      groupName: '',
      masterTeacherId: teacherId,
      schoolYear: 'Year',
      schoolCycle: 'Cycle',
      meetingDay: 'Day',
      meetingTime: 'Time',
    });
    setValidName(true);
    setValidYear(true);
    setValidCycle(true);
    setValidDay(true);
    setValidTime(true);
    setCurrentStudents([]);
    closeModal();
  };

  const createStudentGroup = async () => {
    if (!checkNotDefaultFields()) {
      return;
    }
    const studentGroupData = await TLPBackend.post(`/student-groups`, {
      name: studentGroupInfo.groupName,
      year: Number(studentGroupInfo.schoolYear.slice(0, 4)),
      cycle: studentGroupInfo.schoolCycle.slice(6),
      masterTeacherId: studentGroupInfo.masterTeacherId,
      siteId,
      meetingDay: studentGroupInfo.meetingDay.slice(0, -1),
      meetingTime: studentGroupInfo.meetingTime,
    });
    // Array of studentIds of students added to created group
    const addedStudents = Object.keys(currentStudents).map(stringId => {
      return Number(stringId);
    });

    await TLPBackend.put(`/students/update-bulk`, {
      studentIds: addedStudents,
      studentGroupId: studentGroupData.data.groupId,
    });
    resetModal();
    closeModal();
  };

  useEffect(async () => {
    if (!isOpen) {
      return;
    }
    await getPossibleStudents();
  }, [isOpen]);

  const StudentBadges = () => (
    <>
      {Object.keys(currentStudents).map(studentId => {
        const studentObj = currentStudents[studentId];
        return (
          <Badge bg="secondary" className={styles['student-badge']} id={studentId} key={studentId}>
            <BsXLg
              className={styles['student-badge-icon']}
              cursor="pointer"
              id={studentId}
              onClick={() => removeFromCurrentStudents(studentId)}
            />
            {`${studentObj.firstName} ${studentObj.lastName}`}
          </Badge>
        );
      })}
    </>
  );

  const updateName = name => {
    setStudentGroupInfo({
      ...studentGroupInfo,
      groupName: name?.target?.value,
    });
    setValidName(true);
  };

  const debouncedUpdateName = debounce(updateName, 800);

  // Styling for react-select component used to search for students
  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? 'whitesmoke' : 'white',
    }),
    indicatorSeparator: provided => ({
      ...provided,
      background: 'white',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background: 'white',
      color: state.isFocused ? 'white' : 'white',
    }),
  };

  return (
    <Modal show={isOpen} onHide={closeModal} dialogClassName={styles['modal-content']}>
      <Modal.Header dialogClassName={styles['create-student-group-modal-header']}>
        <Modal.Title dialogClassName={styles['create-student-group-modal-top-bar-title']}>
          Create Student Group
        </Modal.Title>
        <CloseButton onClick={() => resetModal()} />
      </Modal.Header>
      <Modal.Body>
        <div className={styles['create-student-group-modal-body']}>
          <div className={styles['create-student-group-modal-field-desc']}>Group Name</div>
          <input
            className={validName ? styles['modal-text-input'] : styles['modal-text-input-error']}
            type="text"
            defaultValue={studentGroupInfo.groupName}
            onChange={debouncedUpdateName}
            placeholder="Group"
          />
          <div className={styles['meeting-day-err-message']}>
            {validName ? '' : 'Invalid Group Name'}
          </div>
          <div className={styles['create-student-group-modal-field-desc']}>School Cycle</div>
          <div className={styles['create-student-group-school-cycle']}>
            <StudentGroupDropdown
              choices={schoolYears}
              current={studentGroupInfo.schoolYear}
              setFn={eventKey => {
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  schoolYear: eventKey,
                });
                setValidYear(true);
              }}
              errorState={validYear}
            />
            <StudentGroupDropdown
              choices={schoolCycles}
              current={studentGroupInfo.schoolCycle}
              setFn={eventKey => {
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  schoolCycle: eventKey,
                });
                setValidCycle(true);
              }}
              errorState={validCycle}
            />
            <div className={styles['school-year-err-message']}>
              {validYear ? '' : 'Invalid School Year'}
            </div>
            <div className={styles['school-cycle-err-message']}>
              {validCycle ? '' : 'Invalid School Cycle'}
            </div>
          </div>
          <div className={styles['create-student-group-modal-field-desc']}>Meeting Time</div>
          <div className={styles['create-student-group-meeting']}>
            <StudentGroupDropdown
              choices={meetingDays}
              current={studentGroupInfo.meetingDay}
              setFn={eventKey => {
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  meetingDay: eventKey,
                });
                setValidDay(true);
              }}
              errorState={validDay}
            />
            <input
              className={validTime ? styles['time-input'] : styles['time-input-error']}
              type="time"
              min="00:00"
              max="23:59"
              value={studentGroupInfo.meetingTime}
              onChange={event => {
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  meetingTime: event.target.value,
                });
                setValidTime(true);
              }}
            />
            <div className={styles['meeting-day-err-message']}>
              {validDay ? '' : 'Invalid Meeting Day'}
            </div>
            <div className={styles['meeting-time-err-message']}>
              {validTime ? '' : 'Invalid Meeting Time'}
            </div>
          </div>
          <div className={styles['create-student-group-modal-field-desc']}>Add/Remove Students</div>
          <div className={styles['create-student-group-badges']}>
            <StudentBadges />
          </div>
          <div className={styles['students-select']}>
            {possibleStudentsLoaded ? (
              <Select
                options={Object.keys(possibleStudents).map(studentId => ({
                  value: studentId,
                  label: `${possibleStudents[studentId].firstName} ${possibleStudents[studentId].lastName}`,
                }))}
                onChange={opt => addToCurrentStudents(opt.value)}
                placeholder="Select Students"
                styles={selectStyles}
              />
            ) : null}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles['create-student-group-modal-footer']}>
          <div className={styles['create-student-group-cancel-button']}>
            <Button variant="secondary" onClick={() => resetModal()}>
              Cancel
            </Button>
          </div>
          <div className={styles['create-student-group-save-button']}>
            <Button variant="primary" onClick={() => createStudentGroup()}>
              Save
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

CreateStudentGroupModal.defaultProps = {
  siteId: null,
};

CreateStudentGroupModal.propTypes = {
  siteId: PropTypes.number,
  teacherId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateStudentGroupModal;
