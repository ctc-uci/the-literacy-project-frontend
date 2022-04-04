import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { BsPencil } from 'react-icons/bs';
import { Table, Button } from 'react-bootstrap';
import styles from './student.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const StudentView = () => {
  const { studentId } = useParams();

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

  // /students/{studentId}
  useEffect(() => {}, [studentId]);
  return (
    <div id={styles['student-view']}>
      <NavigationBar />
      <section className={styles['student-information-section']}>
        <hr />
        <div className={styles['student-information-section__title-button-wrapper']}>
          <h2>Student Information</h2>
          <Button variant="warning">
            Edit Student
            <BsPencil />
          </Button>{' '}
        </div>
        <div className={styles['student-information-section__student-info-table-container']}>
          <Table>
            <thead>
              <tr>
                <th>Grade</th>
                <th>Site</th>
                <th>Student Group</th>
                <th>Ethnicity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{}</th>
                <th>{}</th>
                <th>{}</th>
                <th>{}</th>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
      <section className={styles['data-information-section']}>
        <hr />
        <h2>Data</h2>
        <div className={styles['data-information-section__data-graphs-container']}>
          {/* Add data graphs here */}
        </div>
      </section>
      <section className={styles['links-section']}>
        <hr />
        <h2>Links</h2>
        <div className={styles['links-section__link-cards-container']}>
          {/* Add data link cards here */}
        </div>
      </section>
    </div>
  );
};

export default StudentView;
