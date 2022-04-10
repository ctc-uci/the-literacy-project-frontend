import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { BsPencil, BsBackspace } from 'react-icons/bs';
import { Table, Button, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { MDBContainer } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './student.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { TLPBackend } from '../../common/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentView = () => {
  const { studentId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editStudentData, setEditStudentData] = useState({
    studentGrade: null,
    studentGroup: null,
    studentEthnicity: null,
    studentHomeTeacher: null,
  });
  // const [editOptions, setEditOptions] = useState({});
  const [student, setStudent] = useState({
    preTestA: [0],
    postTestA: [],
    preTestR: [],
    postTestR: [],
  });
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // score = 5.5

  const data = {
    labels: ['Pre', 'Post'],
    datasets: [
      {
        id: 1,
        label: 'Attitudinal',
        backgroundColor: 'rgb(255, 211, 80)',
        borderColor: 'rgb(255, 211, 80)',
        data: [70, 80], // [pre, post]
      },
      {
        id: 2,
        label: 'Academic',
        backgroundColor: 'rgb(75, 161, 182)',
        borderColor: 'rgb(75, 161, 182)',
        data: [65, 59], // [pre, post]
      },
    ],

    // barChartOptions: {
    //   responsive: true,
    // },
  };

  const dummyGradeData = [
    { name: '1st Grade', id: 1 },
    { name: '2nd Grade', id: 2 },
    { name: '3rd Grade', id: 3 },
    { name: '4th Grade', id: 4 },
    { name: '5th Grade', id: 5 },
    { name: '6th Grade', id: 6 },
    { name: '7th Grade', id: 7 },
    { name: '8th Grade', id: 8 },
  ];

  const dummyEthnicity = ['white', 'black', 'asian', 'latinx', 'american indian or alaska native'];
  const dummyStudentGroup = ['Group A', 'Group B', 'Group C', 'Group D'];

  const setStudentEditData = () => {
    const tempStudentData = {};
    tempStudentData.studentGrade = '7th Grade';
    tempStudentData.studentGroup = `Group ${student.studentGroupId}`;
    tempStudentData.studentEthnicity = student.ethnicity;
    tempStudentData.studentHomeTeacher = 'Sydney Chiang';
    setEditStudentData(tempStudentData);
  };

  // student.pre.reduce((total, amount) => total + amount, 0) / student.pre.length

  // logic relating to calculating pre/post
  // const specific = arr.filter(site => site.name === specific_site) //this returns the specific site from the sites
  // pre = specific.pre.reduce((total, amount)=> total+amount, 0)/array.length
  // post = specific.post.reduce((total, amount)=> total+amount, 0)/array.length

  // Hooks
  // 1) - student info from textbox on web input "on submit we compare"
  //    - student info from database
  //    goal with this is to use dependencies so this component doesn't rerender all the time

  // 2) goal collect the student {attitudinal & academic data (avg --> calculate ourselves)}
  //    site scores vs all other sites scores (avg?)
  //    This does not necessarily need to be a hook?

  /*
    data : {
      student: {
        attitudinal: {
          pre
          post
        }
        academic: {
          pre
          post
        }
      },
      site_data: {
        site_nme: {// associated with
          pre
          post
        },
        tlp_sites: {
          pre
          post
        }
      }
    }
  */

  useEffect(async () => {
    const res = await TLPBackend.get(`/students/${studentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      // setStudent(res.data); below is for testing
      setStudent({
        ...res.data,
        pre: dummy,
        post: dummy,
      });
    }
    console.log('student', student);
  }, [studentId]);

  return (
    <>
      <NavigationBar />
      <div className={styles['student-view']}>
        <section className={styles['student-return-name-section']}>
          <h2>
            <a href="/">
              <BsBackspace />
              Return to Irvine Site
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
            <Button
              variant="warning"
              onClick={() => {
                setStudentEditData();
                setEditMode(!editMode);
              }}
            >
              Edit Student
              <BsPencil />
            </Button>{' '}
          </div>
          <div className={styles['student-information-section__student-info-table-container']}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Site</th>
                  <th>Student Group</th>
                  <th>Ethnicity</th>
                  <th>Home Teacher</th>
                </tr>
              </thead>
              <tbody>
                {!editMode ? (
                  <tr>
                    <td>7th Grade</td>
                    <td>Irvine Site</td>
                    <td>Group {student.studentGroupId}</td>
                    <td>{student.ethnicity}</td>
                    <td>Sydney Chiang</td>
                  </tr>
                ) : (
                  <tr>
                    <td>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editStudentData.studentGrade}
                      >
                        {dummyGradeData.map(grade => {
                          return (
                            <Dropdown.Item
                              key={grade.name}
                              onClick={() => {
                                const tempStudentData = { ...editStudentData };
                                tempStudentData.studentGrade = grade.name;
                                setEditStudentData(tempStudentData);
                              }}
                            >
                              {grade.name}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </td>
                    <td>Irvine Site</td>
                    <td>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editStudentData.studentGroup}
                      >
                        {dummyStudentGroup.map(group => {
                          return (
                            <Dropdown.Item
                              key={group}
                              onClick={() => {
                                const tempStudentData = { ...editStudentData };
                                tempStudentData.studentGrade = group;
                                setEditStudentData(tempStudentData);
                              }}
                            >
                              {group}
                            </Dropdown.Item>
                          );
                        })}
                      </DropdownButton>
                    </td>
                    <td>
                      <DropdownButton
                        variant="outline-secondary"
                        title={editStudentData.studentEthnicity}
                      >
                        {dummyEthnicity.map(ethnicity => {
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
                      </DropdownButton>
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={editStudentData.studentHomeTeacher}
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
              <h6>
                Average Scores for {student.firstName} {student.lastName}
              </h6>
              <MDBContainer>
                <Bar data={data} options={data.barChartOptions} />
              </MDBContainer>
            </div>
            <div className={styles['data-information-section__data-graph']}>
              <p>Year: 2021 - 2022</p>
              <h6>Irvine Site Average Scores vs Other TLP Sites</h6>
              <MDBContainer>
                <Bar data={data} options={data.barChartOptions} />
              </MDBContainer>
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
                src: 'links-card__assignment-score-card',
                link: '/student/1/attitude-assignment-score',
              },
              {
                id: 2,
                title: 'Assessment Score Card',
                src: 'links-card__reading-attitude-survey',
                link: '/',
              },
              {
                id: 3,
                title: 'Go to Student Group',
                src: 'links-card__student-group',
                link: '/',
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
    </>
  );
};

export default StudentView;
