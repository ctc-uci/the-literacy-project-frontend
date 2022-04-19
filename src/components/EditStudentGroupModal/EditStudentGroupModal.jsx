import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import styles from './EditStudentGroupModal.module.css';
import { TLPBackend } from '../../common/utils';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

// TODO:
// [] Fix dropdown values
// [] Make backend call when user saves
// [] Look into debouncing user input

const EditStudentGroupModal = ({ siteId, studentGroupId, isOpen, setIsOpen }) => {
  const schoolYears = ['2021', '2022'];
  const schoolCycles = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];
  const meetingDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const [studentGroupInfo, setStudentGroupInfo] = useState({
    groupName: 'Default Group Name',
    masterTeacherId: 0,
    schoolYear: 'Default School Year',
    schoolCycle: 'Default School Cycle',
    meetingDay: 'Mondays',
    meetingTime: '3:30PM',
  });

  // Students already in group
  const [currentStudents, setCurrentStudents] = useState();
  const [currentStudentsLoaded, setCurrentStudentsLoaded] = useState(false);
  // Students in the site that are not in the group
  const [possibleStudents, setPossibleStudents] = useState();
  const [possibleStudentsLoaded, setPossibleStudentsLoaded] = useState(false);

  // const [error, setError] = useState(null);

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  const getStudentGroupData = async () => {
    console.log('line 59');
    try {
      const res = await TLPBackend.get(`/student-groups/${studentGroupId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const studentGroupData = res.data;
      setStudentGroupInfo({
        groupName: studentGroupData.name,
        masterTeacherId: studentGroupData.masterTeacherId,
        schoolYear: `${studentGroupData.year}-${studentGroupData.year + 1}`,
        schoolCycle: `Cycle ${studentGroupData.cycle}`,
        meetingDay: `${studentGroupData.meetingDay}s`,
        meetingTime: studentGroupData.meetingTime,
      });
      // Students already in group, stored as object
      const currStudentsObj = Object.assign(
        {},
        ...studentGroupData.students.map(student => ({ [student.studentId]: student })),
      );
      setCurrentStudents(currStudentsObj);
      // Set loaded to true so all students can be filtered
      setCurrentStudentsLoaded(true);
    } catch (err) {
      console.log('something went wrong');
      console.error(err);
      // setError(err);
    }
  };

  const getPossibleStudents = async () => {
    const siteStudents = await TLPBackend.get(`/students/site/${siteId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      const filteredStudents = siteStudents.data.filter(
        studentObj =>
          !Object.keys(currentStudents).some(
            s => currentStudents[s].studentId === studentObj.studentId,
          ),
      );
      // map student objects to objects w/ only id, first name, last name
      const possibleStudentsObj = Object.assign(
        {},
        ...filteredStudents.map(student => ({
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

  // TODO: Backend call
  // const editStudentGroup = () => {
  //   TLPBackend.put(`/student-groups/${studentGroupId}`, {
  //     year: schoolYear,
  //     cycle: schoolCycle,
  //     master_teacher_id: masterTeacherId,
  //     site_id: siteId,
  //     meeting_day: meetingDay,
  //     meeting_time: meetingTime,
  //   })
  //     .then(() => {
  //       closeModal();
  //     })
  //     .catch(() => {
  //       closeModal();
  //     });
  // };

  useEffect(async () => {
    await getStudentGroupData();
  }, []);

  useEffect(async () => {
    await getPossibleStudents();
  }, [currentStudentsLoaded]);

  // console.log(currentStudents);
  // console.log(possibleStudents);

  const StudentBadges = () => (
    <>
      {Object.keys(currentStudents).map(studentId => {
        const studentObj = currentStudents[studentId];
        return (
          <Badge bg="secondary" className={styles['student-badge']} id={studentId} key={studentId}>
            <BsX
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

  const StudentSelect = () => (
    <>
      {Object.keys(possibleStudents).map(studentId => {
        const studentObj = possibleStudents[studentId];
        return (
          <option
            id={studentId}
            key={studentId}
            value={studentId}
          >{`${studentObj.firstName} ${studentObj.lastName}`}</option>
        );
      })}
    </>
  );

  const ModalContent = () => (
    <>
      <div className={styles['edit-student-group-modal']}>
        <div className={styles['edit-student-group-modal-top-bar']}>
          <div className={styles['edit-student-group-modal-top-bar-title']}>Edit Student Group</div>
          <div className={styles['edit-student-group-modal-exit-button']}>
            <button
              type="button"
              className={styles['edit-student-group-exit-button']}
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        </div>
        <div className={styles['edit-student-group-modal-body']}>
          <div className={styles['edit-student-group-modal-field-desc']}>Group Name</div>
          <input
            className={styles['modal-text-input']}
            type="text"
            defaultValue={studentGroupInfo.groupName}
            onChange={event =>
              setStudentGroupInfo({
                ...studentGroupInfo,
                groupName: event.target.value,
              })
            }
          />
          <div className={styles['edit-student-group-modal-field-desc']}>School Cycle</div>
          <div className={styles['edit-student-group-school-cycle']}>
            <DropdownMenu
              choices={schoolYears}
              current={studentGroupInfo.schoolYear}
              setFn={val =>
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  schoolYear: `${val} - ${Number(val) + 1}`,
                })
              }
            />
            <DropdownMenu
              choices={schoolCycles}
              current={studentGroupInfo.schoolCycle}
              setFn={val => setStudentGroupInfo({ ...studentGroupInfo, schoolCycle: val })}
            />
          </div>
          <div className={styles['edit-student-group-modal-field-desc']}>Meeting Time</div>
          <div className={styles['edit-student-group-meeting']}>
            <DropdownMenu
              choices={meetingDays}
              current={studentGroupInfo.meetingDay}
              setFn={val => setStudentGroupInfo({ ...studentGroupInfo, meetingDay: val })}
            />
            <input
              className={styles['modal-text-input']}
              type="time"
              min="00:00"
              max="23:59"
              value={studentGroupInfo.meetingTime}
              onChange={event =>
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  meetingTime: event.target.value,
                })
              }
            />
          </div>
          <div className={styles['edit-student-group-modal-field-desc']}>Add/Remove Students</div>
          <div className={styles['edit-student-group-badges']}>
            {currentStudentsLoaded ? <StudentBadges /> : null}
          </div>
          <Form.Group>
            <Form.Select onChange={e => addToCurrentStudents(e.target.value)}>
              <option value={-1}>Select Students</option>
              {possibleStudentsLoaded ? <StudentSelect /> : null}
            </Form.Select>
          </Form.Group>
        </div>
        <div className={styles['edit-student-group-modal-bottom-bar']}>
          <button
            type="button"
            className={styles['edit-cancel-button']}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles['edit-save-button']}
            onClick={() => setIsOpen(false)}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );

  return isOpen ? <ModalContent /> : null;
};

EditStudentGroupModal.propTypes = {
  siteId: PropTypes.number.isRequired,
  studentGroupId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditStudentGroupModal;
