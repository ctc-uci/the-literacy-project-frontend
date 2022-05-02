import { React, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { PropTypes } from 'prop-types';
import { Badge } from 'react-bootstrap';
import { BsXLg } from 'react-icons/bs';
import Select from 'react-select';

import styles from './EditStudentGroupModal.module.css';
import { TLPBackend } from '../../common/utils';

import StudentGroupDropdown from './StudentGroupDropdown';

// TODO:
// [] Make selection dropdown resize accordingly

const EditStudentGroupModal = ({ siteId, studentGroupId, isOpen, setIsOpen }) => {
  const schoolYears = ['2021-2022', '2022-2023', '2023-2024'];
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

  const [originalStudents, setOriginalStudents] = useState([]); // Students that were originally in the group
  const removedStudents = []; // Students removed from original group
  const addedStudents = []; // Students added to group that weren't in original group

  // const [error, setError] = useState(null);

  const closeModal = () => setIsOpen(false);

  const getStudentGroupData = async () => {
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
      // Students originally in group (initially same as current), stored as object
      const origStudentsObj = Object.assign(
        {},
        ...studentGroupData.students.map(student => ({ [student.studentId]: student })),
      );
      setCurrentStudents(currStudentsObj);
      setOriginalStudents(origStudentsObj);
      // Set loaded to true so all students can be filtered
      setCurrentStudentsLoaded(true);
    } catch (err) {
      // console.error(err);
      // setError(err);
    }
  };

  const getPossibleStudents = async () => {
    // const siteStudents = await TLPBackend.get(`/students/site/${siteId}`, {
    const systemStudents = await TLPBackend.get(`/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      const filteredStudents = systemStudents.data.filter(
        // Possible students includes students who are not currently assigned to the group
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
    // Remove student from currentStudents
    const newCurrentStudents = currentStudents;
    delete newCurrentStudents[studentId];
    setCurrentStudents(newCurrentStudents);
  };

  const findMovedStudents = () => {
    // Find students that were removed from the group
    Object.getOwnPropertyNames(originalStudents).forEach(id => {
      if (!Object.hasOwnProperty.call(currentStudents, Number(id))) {
        removedStudents.push(originalStudents[id].studentId);
        // removedStudentsObj[id] = originalStudents[id];
      }
    });

    // Find students that were added to the group
    Object.getOwnPropertyNames(currentStudents).forEach(id => {
      if (!Object.hasOwnProperty.call(originalStudents, Number(id))) {
        addedStudents.push(currentStudents[id].studentId);
        // addedStudentsObj[id] = currentStudents[id];
      }
    });
  };

  const editStudentGroupData = () => {
    TLPBackend.put(`/student-groups/${studentGroupId}`, {
      name: studentGroupInfo.groupName,
      year: Number(studentGroupInfo.schoolYear.slice(0, 4)),
      cycle: studentGroupInfo.schoolCycle.slice(6),
      masterTeacherId: studentGroupInfo.masterTeacherId,
      siteId,
      meetingDay: studentGroupInfo.meetingDay.slice(0, -1),
      meetingTime: studentGroupInfo.meetingTime,
    })
      .then(() => {
        closeModal();
      })
      .catch(() => {
        closeModal();
      });
  };

  const editStudentGroupStudents = () => {
    TLPBackend.put(`/students/update-bulk`, {
      studentIds: addedStudents,
      studentGroupId,
    })
      .then(() => {
        closeModal();
      })
      .catch(() => {
        closeModal();
      });

    TLPBackend.put(`/students/update-bulk`, {
      studentIds: removedStudents,
      studentGroupId: null,
    })
      .then(() => {
        closeModal();
      })
      .catch(() => {
        closeModal();
      });
  };

  const update = () => {
    findMovedStudents();
    editStudentGroupData();
    editStudentGroupStudents();
  };

  useEffect(async () => {
    await getStudentGroupData();
  }, []);

  useEffect(async () => {
    await getPossibleStudents();
  }, [currentStudentsLoaded]);

  // console.log(currentStudents);
  // console.log(possibleStudents);

  const updateName = name => {
    // console.log(studentGroupInfo);
    setStudentGroupInfo({
      ...studentGroupInfo,
      groupName: name?.target?.value,
    });
  };

  const debouncedUpdateName = debounce(updateName, 800);

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

  // const dummyStudents = [{value: 20, label: "Winnie the Pooh"}];
  // const studentOptions = () => {
  // Object.keys(possibleStudents).map(studentId => ({
  //   value: studentId,
  //   label: `${possibleStudents[studentId].firstName} ${possibleStudents[studentId].lastName}`,
  // }));
  // {
  // const studentObj = possibleStudents[studentId];
  // console.log({ value: studentId, label: `${studentObj.firstName} ${studentObj.lastName}` });
  // return ({
  //   value: studentId,
  //   label: `${studentObj.firstName} ${studentObj.lastName}`,
  // });
  // return (
  // <option
  //   id={studentId}
  //   key={studentId}
  //   value={studentId}
  // >{`${studentObj.firstName} ${studentObj.lastName}`}</option>
  // );
  // });
  // console.log(currentStudents);

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
      color: state.isSelected ? 'white' : 'white',
    }),
    container: (provided, state) => ({
      ...provided,
      margin: state.isSelected ? 'red' : 'blue',
    }),
    menuList: provided => ({
      ...provided,
      height: 160,
    }),
  };

  const ModalContent = () => (
    <>
      <div className={styles['edit-student-group-modal']}>
        <div className={styles['edit-student-group-modal-top-bar']}>
          <div className={styles['edit-student-group-modal-top-bar-title']}>Edit Student Group</div>
          {/* <div className={styles['edit-student-group-modal-exit-button']}>
            <button
              type="button"
              className={styles['edit-student-group-exit-button']}
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div> */}
        </div>
        <div className={styles['edit-student-group-modal-body']}>
          <div className={styles['edit-student-group-modal-field-desc']}>Group Name</div>
          <input
            className={styles['modal-text-input']}
            type="text"
            defaultValue={studentGroupInfo.groupName}
            onChange={debouncedUpdateName}
            // event =>
            // setStudentGroupInfo({
            //   ...studentGroupInfo,
            //   groupName: event.target.value,
            // })
            // }
          />
          <div className={styles['edit-student-group-modal-field-desc']}>School Cycle</div>
          <div className={styles['edit-student-group-school-cycle']}>
            <StudentGroupDropdown
              choices={schoolYears}
              current={studentGroupInfo.schoolYear}
              setFn={eventKey =>
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  schoolYear: eventKey,
                })
              }
            />
            <StudentGroupDropdown
              choices={schoolCycles}
              current={studentGroupInfo.schoolCycle}
              setFn={eventKey =>
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  schoolCycle: eventKey,
                })
              }
            />
          </div>
          <div className={styles['edit-student-group-modal-field-desc']}>Meeting Time</div>
          <div className={styles['edit-student-group-meeting']}>
            <StudentGroupDropdown
              choices={meetingDays}
              current={studentGroupInfo.meetingDay}
              setFn={eventKey =>
                setStudentGroupInfo({
                  ...studentGroupInfo,
                  meetingDay: eventKey,
                })
              }
            />
            <input
              className={styles['time-input']}
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
          {possibleStudentsLoaded ? (
            <Select
              options={Object.keys(possibleStudents).map(studentId => ({
                value: studentId,
                label: `${possibleStudents[studentId].firstName} ${possibleStudents[studentId].lastName}`,
              }))}
              onChange={opt => addToCurrentStudents(opt.value)}
              placeholder="Select Students"
              styles={selectStyles}
              className={styles['students-select']}
            />
          ) : null}
          {/* <Form.Group>
            <Form.Select onChange={e => addToCurrentStudents(e.target.value)}>
              <option value={-1}>Select Students</option>
              {possibleStudentsLoaded ? <StudentSelect /> : null}
            </Form.Select>
          </Form.Group> */}
        </div>
        <div className={styles['edit-student-group-modal-bottom-bar']}>
          <button
            type="button"
            className={styles['edit-student-group-cancel-button']}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles['edit-student-group-save-button']}
            // onClick={() => setIsOpen(false)}
            onClick={() => update()}
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
