import React, { useState, useEffect } from 'react';
import { BsPencil, BsBackspace, BsCheck2All } from 'react-icons/bs';
import { Table, Button, DropdownButton, Dropdown, Form, Alert, CloseButton } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Graph from '../../components/Graph/Graph';
import Footer from '../../components/Footer/Footer';
import styles from './student.module.css';
import { TLPBackend } from '../../common/utils';

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
  const [siteData, setSiteData] = useState({
    pre: 0,
    post: 0,
  });
  const [otherSiteData, setOtherSiteData] = useState({
    pre: 0,
    post: 0,
  });

  const setStudentEditData = () => {
    const tempStudentData = {};
    tempStudentData.studentGrade = student.grade;
    tempStudentData.studentGroup = {
      name: student.studentGroupName,
      groupId: student.studentGroupId,
    };
    tempStudentData.studentEthnicity = student.ethnicity;
    tempStudentData.studentGender = student.gender;
    tempStudentData.studentHomeTeacher = student.homeTeacher;
    setEditStudentData(tempStudentData);
  };

  const submitStudentEditChanges = () => {
    const editedData = {
      firstName: student.firstName,
      lastName: student.lastName,
      gender: editStudentData.studentGender,
      grade: editStudentData.studentGrade,
      homeTeacher: editStudentData.studentHomeTeacher,
      studentGroupId: editStudentData.studentGroup.groupId,
      ethnicity: editStudentData.studentEthnicity,
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

  const calculateTotalPrePostData = resStudentsData => {
    // Calculates the total student Pre / Post Data from post the Attitudinal and Academic lists of scores
    const tempSiteData = {
      pre: 0,
      post: 0,
    };

    ['pretestA', 'posttestA', 'pretestR', 'posttestR'].forEach(siteDataKey => {
      const totalData =
        resStudentsData.data
          .map(studentData => {
            if (studentData[siteDataKey]) {
              return (
                studentData[siteDataKey].reduce((total, amount) => total + amount, 0) /
                studentData[siteDataKey].length
              );
            }
            return 0;
          })
          .reduce((total, amount) => total + amount, 0) / resStudentsData.data.length;
      if (siteDataKey.includes('pre')) {
        tempSiteData.pre += totalData;
      } else {
        tempSiteData.post += totalData;
      }
    });

    tempSiteData.pre = Math.round((tempSiteData.pre / 2) * 100) / 100;
    tempSiteData.post = Math.round((tempSiteData.post / 2) * 100) / 100;

    return tempSiteData;
  };

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
              'white',
              'black',
              'asian',
              'latinx',
              'american indian or alaska native',
              'non-specified',
            ],
            genderOptions: ['male', 'female', 'non-specified'],
            studentGroups: [...resOptions.data],
          });
        })
        .catch(() => {
          // console.log('ERROR: Cannot load editing options.');
        });
      TLPBackend.get(`/students/site/${res.data.siteId}`)
        .then(resStudentsData => {
          setSiteData(calculateTotalPrePostData(resStudentsData));
        })
        .catch(() => {
          // console.log('ERROR: Cannot load all students from site.');
        });
      TLPBackend.get(`/students/other-sites/${res.data.siteId}`)
        .then(resStudentsData => {
          setOtherSiteData(calculateTotalPrePostData(resStudentsData));
        })
        .catch(() => {
          // console.log('ERROR: Cannot load all students from other sites.');
        });
    }
  }, [studentId]);

  return (
    <>
      <div className={styles['student-view']}>
        <section className={styles['student-return-name-section']}>
          <h2>
            <a href="/">
              <BsBackspace /> Return to {`${student.siteName}`}
            </a>
          </h2>
          <h1>
            {student.lastName}, {student.firstName}
          </h1>
        </section>
        <section className={styles['student-information-section']}>
          <hr />
          <div className={styles['student-information-section__title-button-wrapper']}>
            <h2>Student Information</h2>
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
                    <td>{student.ethnicity !== [] ? student.ethnicity.join(', ') : '-'}</td>
                    <td>{student.gender ? student.gender : '-'}</td>
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
                      {/* <DropdownButton
                        variant="outline-secondary"
                        title={editStudentData.studentEthnicity}
                        multiple
                      >
                        {editOptions.ethnicityOptions.map(ethnicity => {
                          return (
                            <Dropdown.Item
                              key={ethnicity}
                              onClick={() => {
                                const tempStudentData = { ...editStudentData };
                                tempStudentData.studentEthnicity = ethnicity;
                                setEditStudentData(tempStudentData);
                              }}
                            >
                              {ethnicity}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton> */}
                      <Form.Control
                        as="select"
                        value={editStudentData.studentEthnicity}
                        multiple
                        onChange={e => {
                          const tempStudentData = { ...editStudentData };
                          tempStudentData.studentEthnicity = [].slice
                            .call(e.target.selectedOptions)
                            .map(item => item.value);
                          setEditStudentData(tempStudentData);
                        }}
                      >
                        {editOptions.ethnicityOptions.map(ethnicity => {
                          return <option key={ethnicity}>{ethnicity}</option>;
                        })}
                      </Form.Control>
                      {/* <Multiselect
                        onChange={console.log('dafsdf')}
                        data={editStudentData.ethnicityOptions}
                        multiple
                      /> */}
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
                              {gender}
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
                  student.pretestA
                    ? Math.round(
                        (student.pretestA.reduce((total, amount) => total + amount, 0) /
                          student.pretestA.length) *
                          100,
                      ) / 100
                    : 0,
                  student.pretestR
                    ? Math.round(
                        student.pretestR.reduce((total, amount) => total + amount, 0) /
                          student.pretestR.length,
                      )
                    : 0,
                ]}
                postData={[
                  student.posttestA
                    ? Math.round(
                        (student.posttestA.reduce((total, amount) => total + amount, 0) /
                          student.posttestA.length) *
                          100,
                      ) / 100
                    : 0,
                  student.posttestR
                    ? Math.round(
                        (student.posttestR.reduce((total, amount) => total + amount, 0) /
                          student.posttestR.length) *
                          100,
                      ) / 100
                    : 0,
                ]}
              />
            </div>
            <div className={styles['data-information-section__data-graph']}>
              <p>Year: 2021 - 2022</p>
              <Graph
                title="Irvine Site Average Scores vs Other TLP Sites"
                xLabels={[student.siteName, 'Other TLP']}
                preData={[siteData.pre, otherSiteData.pre]}
                postData={[siteData.post, otherSiteData.post]}
              />
            </div>
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
      <Footer />
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
