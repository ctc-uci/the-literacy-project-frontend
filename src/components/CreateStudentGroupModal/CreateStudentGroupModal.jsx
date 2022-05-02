import { React, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { PropTypes } from 'prop-types';
import { Badge } from 'react-bootstrap';
import { BsXLg } from 'react-icons/bs';
// import { useForm } from 'react-hook-form';
import Select, { components } from 'react-select';

import styles from './CreateStudentGroupModal.module.css';
import { TLPBackend } from '../../common/utils';

import StudentGroupDropdown from '../EditStudentGroupModal/StudentGroupDropdown';

// TODO:
// [] Make sure values for categories are not default

const CreateStudentGroupModal = ({ siteId, isOpen, teacherId, setIsOpen }) => {
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

  // Students in group
  const [currentStudents, setCurrentStudents] = useState([]);
  // const [currentStudentsLoaded, setCurrentStudentsLoaded] = useState(false);
  // Students in the system that are not in the group
  const [possibleStudents, setPossibleStudents] = useState();
  const [possibleStudentsLoaded, setPossibleStudentsLoaded] = useState(false);

  // const [error, setError] = useState(null);

  const closeModal = () => setIsOpen(false);

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

    closeModal();
  };

  useEffect(async () => {
    await getPossibleStudents();
    // }, [currentStudentsLoaded]);
  }, []);

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
  const updateName = name => {
    // console.log(studentGroupInfo);
    setStudentGroupInfo({
      ...studentGroupInfo,
      groupName: name?.target?.value,
    });
    setValidName(true);
  };

  const debouncedUpdateName = debounce(updateName, 800);

  const selectDropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <BsXLg />
        {/* <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} /> */}
      </components.DropdownIndicator>
    );
  };

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
    container: (provided, state) => ({
      ...provided,
      margin: state.isSelected ? 'red' : 'blue',
    }),
  };

  const ModalContent = () => (
    <>
      <div className={styles['create-student-group-modal']}>
        <div className={styles['create-student-group-modal-top-bar']}>
          <div className={styles['create-student-group-modal-top-bar-title']}>
            Create Student Group
          </div>
        </div>
        <div className={styles['create-student-group-modal-body']}>
          <div className={styles['create-student-group-modal-field-desc']}>Group Name</div>
          <input
            className={validName ? styles['modal-text-input'] : styles['modal-text-input-error']}
            type="text"
            defaultValue={studentGroupInfo.groupName}
            onChange={debouncedUpdateName}
            placeholder="Group"
            // event =>
            // setStudentGroupInfo({
            //   ...studentGroupInfo,
            //   groupName: event.target.value,
            // })
            // }
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
            {/* {currentStudentsLoaded ? <StudentBadges /> : null} */}
            <StudentBadges />
          </div>
          {possibleStudentsLoaded ? (
            <Select
              options={Object.keys(possibleStudents).map(studentId => ({
                value: studentId,
                label: `${possibleStudents[studentId].firstName} ${possibleStudents[studentId].lastName}`,
              }))}
              onChange={opt => addToCurrentStudents(opt.value)}
              placeholder="Select Students"
              components={{ selectDropdownIndicator }}
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
        <div className={styles['create-student-group-modal-bottom-bar']}>
          <button
            type="button"
            className={styles['create-student-group-cancel-button']}
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles['create-student-group-save-button']}
            // onClick={() => setIsOpen(false)}
            onClick={() => createStudentGroup()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );

  return isOpen ? <ModalContent /> : null;
};

CreateStudentGroupModal.propTypes = {
  siteId: PropTypes.number.isRequired,
  teacherId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateStudentGroupModal;
