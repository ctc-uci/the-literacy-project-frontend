import './students.css';
import React, { useState, useEffect } from 'react';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import { TLPBackend } from '../../common/utils';

const StudentView = () => {
  const [studentLst, setStudentLst] = useState([]);
  const [error, setError] = useState(null);
  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Site',
      headerPopover: '',
    },
    {
      headerTitle: 'Ethnicity',
      headerPopover: '',
    },
    {
      headerTitle: 'Area',
      headerPopover: '',
    },
    {
      headerTitle: 'School Year/Cycle',
      headerPopover: '',
    },
    {
      headerTitle: 'View Profile',
      headerPopover: '',
    },
  ];

  useEffect(async () => {
    const res = await TLPBackend.get(`/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setStudentLst(res.data);
    } else {
      setStudentLst([]);
      setError(error);
    }
  }, []);

  const arr = [];
  // fill in the array with values (array of dictionaries)

  for (let i = 0; i < studentLst.length; i += 1) {
    const newDict = { id: i, items: [] };
    const lst = [];
    // currently test values but connection is established
    const first = studentLst[i].firstName.concat(' ');
    const last = studentLst[i].lastName;
    lst.push(first.concat(last));
    lst.push(studentLst[i].contactId);
    lst.push('Will implement ethnicity');
    lst.push(studentLst[i].studentGroupId);
    lst.push(studentLst[i].pretestR);
    lst.push('insert link to profile');
    newDict.items = lst;
    arr.push(newDict);
  }

  const tbodyData = arr;

  return (
    <div className="student-container">
      <ManagementDataSection sectionTitle="Students" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default StudentView;
