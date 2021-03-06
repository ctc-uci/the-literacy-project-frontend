import React, { useState, useEffect } from 'react';
import { BsPencil, BsBackspace, BsCheck2All } from 'react-icons/bs';
import { Table, Button, DropdownButton, Dropdown, Form, Alert, CloseButton } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import Graph from '../../components/Graph/Graph';
import styles from './student.module.css';
import { TLPBackend, capitalize, calculateSingleStudentScores } from '../../common/utils';
import WarningModal from '../../components/WarningModal/WarningModal';

const StudentView = () => {
  const { studentId } = useParams();
  const [editOptions, setEditOptions] = useState({
    gradeOptions: {},
    ethnicityOptions: [],
    studentGroups: [],
  });
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [isAlertSuccess, setIsAlertSuccess] = useState(true);
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editStudentData, setEditStudentData] = useState({
    studentGrade: null,
    studentGroup: null,
    studentEthnicity: null,
    studentGender: null,
    studentHomeTeacher: null,
  });
  // const [editOptions, setEditOptions] = useState({});
  const [student, setStudent] = useState({
    grade: null,
    siteName: null,
    name: null,
    ethnicity: [],
    homeTeacher: null,
    pretestA: [],
    posttestA: [],
    pretestR: [],
    posttestR: [],
  });
  // const [siteData, setSiteData] = useState({
  //   pre: 0,
  //   post: 0,
  // });
  // const [otherSiteData, setOtherSiteData] = useState({
  //   pre: 0,
  //   post: 0,
  // });

  const setStudentEditData = () => {
    const tempStudentData = {};
    tempStudentData.studentGrade = student.grade;
    tempStudentData.studentGroup = {
      name: student.studentGroupName,
      groupId: student.studentGroupId,
    };
    tempStudentData.studentEthnicity = student.ethnicity.map(item => {
      if (item === 'american indian or alaska native') {
        return { value: item, label: 'American Indian or Alaska Native' };
      }
      return { value: item, label: item.charAt(0).toUpperCase() + item.slice(1) };
    });
    tempStudentData.studentGender = capitalize(student.gender);
    tempStudentData.studentHomeTeacher = student.homeTeacher;
    setEditStudentData(tempStudentData);
  };

  const submitStudentEditChanges = () => {
    const editedData = {
      firstName: student.firstName,
      lastName: student.lastName,
      gender: editStudentData.studentGender.toLowerCase(),
      grade: editStudentData.studentGrade,
      homeTeacher: editStudentData.studentHomeTeacher,
      studentGroupId: editStudentData.studentGroup.groupId,
      ethnicity: editStudentData.studentEthnicity.map(item => {
        return item.value;
      }),
    };

    TLPBackend.put(`/students/${studentId}`, editedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setAlertText('Edits Successfully Saved');
        setShowEditAlert(true);
        setIsAlertSuccess(true);
        setStudent(res.data);
      })
      .catch(() => {
        setAlertText(`[ERROR] unable to update student information`);
        setShowEditAlert(true);
        setIsAlertSuccess(false);
      });
  };

  const deleteStudent = () => {
    TLPBackend.delete(`/students/${student.studentId}`);
    window.location.replace('/');
  };

  // const calculateTotalPrePostData = resStudentsData => {
  //   // Calculates the total student Pre / Post Data from post the Attitudinal and Academic lists of scores
  //   const tempSiteData = {
  //     pre: 0,
  //     post: 0,
  //   };

  //   ['pretestA', 'posttestA', 'pretestR', 'posttestR'].forEach(siteDataKey => {
  //     const totalData =
  //       resStudentsData.data
  //         .map(studentData => {
  //           if (studentData[siteDataKey]) {
  //             return (
  //               studentData[siteDataKey].reduce((total, amount) => total + amount, 0) /
  //               studentData[siteDataKey].length
  //             );
  //           }
  //           return 0;
  //         })
  //         .reduce((total, amount) => total + amount, 0) / resStudentsData.data.length;
  //     if (siteDataKey.includes('pre')) {
  //       tempSiteData.pre += totalData;
  //     } else {
  //       tempSiteData.post += totalData;
  //     }
  //   });

  //   tempSiteData.pre = Math.round((tempSiteData.pre / 2) * 100) / 100;
  //   tempSiteData.post = Math.round((tempSiteData.post / 2) * 100) / 100;

  //   return tempSiteData;
  // };

  // logic relating to calculating pre/post
  // const specific = arr.filter(site => site.name === specific_site) //this returns the specific site from the sites
  // pre = specific.pre.reduce((total, amount)=> total+amount, 0)/array.length
  // post = specific.post.reduce((total, amount)=> total+amount, 0)/array.length

  useEffect(async () => {
    const res = await TLPBackend.get(`/students/${studentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setStudent(res.data);
      await TLPBackend.get(`/student-groups/site/${res.data.siteId}`)
        .then(resOptions => {
          setEditOptions({
            gradeOptions: {
              1: '1st Grade',
              2: '2nd Grade',
              3: '3rd Grade',
              4: '4th Grade',
              5: '5th Grade',
              6: '6th Grade',
            },
            ethnicityOptions: [
              { value: 'white', label: 'White' },
              { value: 'black', label: 'Black' },
              { value: 'asian', label: 'Asian' },
              { value: 'latinx', label: 'Latinx' },
              {
                value: 'american indian or alaska native',
                label: 'American Indian or Alaska Native',
              },
              { value: 'non-specified', label: 'Non-specified' },
            ],
            genderOptions: ['male', 'female', 'non-specified'],
            studentGroups: resOptions.data.filter(item => {
              return item.cycle === res.data.cycle && item.year === res.data.year;
            }),
          });
        })
        .catch(() => {
          // console.log('ERROR: Cannot load editing options.');
        });
      // TLPBackend.get(`/students/site/${res.data.siteId}`)
      //   .then(resStudentsData => {
      //     setSiteData(calculateTotalPrePostData(resStudentsData));
      //   })
      //   .catch(() => {
      //     // console.log('ERROR: Cannot load all students from site.');
      //   });
      // TLPBackend.get(`/students/other-sites/${res.data.siteId}`)
      //   .then(resStudentsData => {
      //     setOtherSiteData(calculateTotalPrePostData(resStudentsData));
      //   })
      //   .catch(() => {
      //     // console.log('ERROR: Cannot load all students from other sites.');
      //   });
    }
  }, [studentId]);

  return (
    <>
      <div className={styles['student-view']}>
        <section className={styles['student-return-name-section']}>
          <h2>
            <Link to="/" state={{ siteName: student.siteName }}>
              <BsBackspace /> Return to {`${student.siteName}`}
            </Link>
          </h2>
          <h1>
            {student.lastName}, {student.firstName}
          </h1>
        </section>
        <section className={styles['student-information-section']}>
          <hr />
          <div className={styles['student-information-section__title-button-wrapper']}>
            <div className={styles['student-information-section__title-and-delete']}>
              <h2>Student Information</h2>
              {editMode ? (
                <div>
                  <Button
                    className={styles['delete-button']}
                    variant="danger"
                    onClick={() => setWarningModalIsOpen(true)}
                  >
                    Delete Student
                  </Button>
                  <WarningModal
                    isOpen={warningModalIsOpen}
                    setIsOpen={setWarningModalIsOpen}
                    name={`${student.firstName} ${student.lastName}`}
                    body="student"
                    deleteFunc={deleteStudent}
                  />
                </div>
              ) : null}
            </div>
            {!editMode ? (
              <Button
                variant="warning"
                onClick={() => {
                  setStudentEditData();
                  setEditMode(!editMode);
                }}
              >
                <span style={{ color: 'black' }}>
                  Edit Student <BsPencil />
                </span>
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={() => {
                  // Save edits
                  submitStudentEditChanges();
                  setEditMode(!editMode);
                }}
              >
                <span style={{ color: 'white' }}>
                  <BsCheck2All /> Save Changes
                </span>
              </Button>
            )}
          </div>
          <div className={styles['student-information-section__student-info-table-container']}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Site</th>
                  <th>Student Group</th>
                  <th>Ethnicity</th>
                  <th>Gender</th>
                  <th>Home Teacher</th>
                </tr>
              </thead>
              <tbody>
                {!editMode ? (
                  <tr>
                    <td>{student.grade ? editOptions.gradeOptions[student.grade] : '-'}</td>
                    <td>{student.siteName ? student.siteName : '-'}</td>
                    <td>{student.studentGroupName ? student.studentGroupName : '-'}</td>
                    <td>
                      {student.ethnicity.length > 0
                        ? student.ethnicity
                            .map(item => {
                              if (item === 'american indian or alaska native') {
                                return 'American Indian or Alaska Native';
                              }
                              return item.charAt(0).toUpperCase() + item.slice(1);
                            })
                            .join(', ')
                        : '-'}
                    </td>
                    <td>{student.gender ? capitalize(student.gender) : '-'}</td>
                    <td>{student.homeTeacher ? student.homeTeacher : '-'}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>
                      <DropdownButton
                        variant="outline-secondary"
                        title={
                          editOptions.gradeOptions[editStudentData.studentGrade]
                            ? editOptions.gradeOptions[editStudentData.studentGrade]
                            : ''
                        }
                      >
                        {Object.keys(editOptions.gradeOptions).map(grade => {
                          return (
                            <Dropdown.Item
                              key={grade}
                              onClick={() => {
                                const tempStudentData = { ...editStudentData };
                                tempStudentData.studentGrade = parseInt(grade, 10);
                                setEditStudentData(tempStudentData);
                              }}
                            >
                              {editOptions.gradeOptions[grade]}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </td>
                    <td>{student.siteName}</td>
                    <td>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editStudentData.studentGroup.name}
                      >
                        {editOptions.studentGroups.map(group => {
                          return (
                            <Dropdown.Item
                              key={group.groupId}
                              onClick={() => {
                                const tempStudentData = { ...editStudentData };
                                tempStudentData.studentGroup = group;
                                setEditStudentData(tempStudentData);
                              }}
                            >
                              {group.name}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </td>
                    <td>
                      <Select
                        options={editOptions.ethnicityOptions}
                        isMulti
                        value={editStudentData.studentEthnicity}
                        onChange={value => {
                          const tempStudentData = { ...editStudentData };
                          tempStudentData.studentEthnicity = value;
                          setEditStudentData(tempStudentData);
                        }}
                      />
                    </td>
                    <td>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editStudentData.studentGender}
                      >
                        {editOptions.genderOptions.map(gender => {
                          return (
                            <Dropdown.Item
                              key={gender}
                              onClick={() => {
                                const tempStudentData = { ...editStudentData };
                                tempStudentData.studentGender = gender;
                                setEditStudentData(tempStudentData);
                              }}
                            >
                              {capitalize(gender)}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={
                          editStudentData.studentHomeTeacher
                            ? editStudentData.studentHomeTeacher
                            : ''
                        }
                        placeholder="Sydney Chiang"
                        onChange={event => {
                          const tempStudentData = { ...editStudentData };
                          tempStudentData.studentHomeTeacher = event.target.value;
                          setEditStudentData(tempStudentData);
                        }}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>
        <section className={styles['data-information-section']}>
          <hr />
          <h2>Data</h2>
          <div className={styles['data-information-section__data-graphs-container']}>
            <div className={styles['data-information-section__data-graph']}>
              <p />
              <Graph
                title={`Average Scores for ${student.firstName} ${student.lastName}`}
                xLabels={['Attitudinal', 'Academic']}
                preData={[
                  calculateSingleStudentScores(student).preAttitude,
                  calculateSingleStudentScores(student).preAssessment,
                ]}
                postData={[
                  calculateSingleStudentScores(student).postAttitude,
                  calculateSingleStudentScores(student).postAssessment,
                ]}
              />
            </div>
            {/* <div className={styles['data-information-section__data-graph']}>
              <p>
                Year: {student.year} - {student.year + 1}
              </p>
              <Graph
                title={`${student.siteName} Average Scores vs Other TLP Sites`}
                xLabels={[student.siteName, 'Other TLP']}
                preData={[siteData.pre, otherSiteData.pre]}
                postData={[siteData.post, otherSiteData.post]}
              />
            </div> */}
          </div>
        </section>
        <section className={styles['links-section']}>
          <hr />
          <h2>Links</h2>
          <div className={styles['links-section__link-cards-container']}>
            {[
              {
                id: 1,
                title: 'Reading Attitude Survey',
                src: 'links-card__reading-attitude-survey',
                link: `/student/${studentId}/attitude-survey/`,
              },
              {
                id: 2,
                title: 'Assessment Score Card',
                src: 'links-card__assessment-score-card',
                link: `/student/${studentId}/assessment-card/`,
              },
              {
                id: 3,
                title: 'Go to Student Group',
                src: 'links-card__student-group',
                link: `/student-groups/${student.studentGroupId}`,
              },
            ].map(linkObject => {
              return (
                <Link
                  to={linkObject.link}
                  key={linkObject.id}
                  className={`${styles['links-card-container']} ${
                    styles[`links-card-container__${linkObject.id}`]
                  }`}
                >
                  <div className={`${styles[linkObject.src]} ${styles['links-card__overlay']}`} />
                  <div className={styles['links-card__title']}>
                    <strong>{linkObject.title}</strong>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
      {showEditAlert ? (
        <div className="center-block">
          <Alert variant={isAlertSuccess ? 'primary' : 'danger'} className="alert-custom">
            {alertText}
            <CloseButton className="alert-close-btn" onClick={() => setShowEditAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

export default StudentView;
