import React, { useState, useEffect } from 'react';
import './master-teachers.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import { TLPBackend } from '../../common/utils';

const MasterTeacherView = () => {
  const [masterTeacherList, setMasterTeacherList] = useState([]);
  const [error, setError] = useState(null);
  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Contact Information',
      headerPopover: '',
    },
    {
      headerTitle: 'Sites',
      headerPopover: '',
    },
    {
      headerTitle: 'Area',
      headerPopover: '',
    },
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
  ];

  useEffect(async () => {
    const res = await TLPBackend.get(`/teachers`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setMasterTeacherList(res.data);
    } else {
      setMasterTeacherList([]);
      setError(error);
    }
  }, []);

  const arr = [];
  masterTeacherList.forEach(mtObj => {
    const FIRSTNAME = mtObj.firstName;
    const LASTNAME = mtObj.lastName;
    arr.push({
      id: mtObj.userId,
      items: [`${FIRSTNAME} ${LASTNAME}`, mtObj.email, mtObj.sites, 'Test Area', mtObj.active],
    });
  });
  const tbodyData = arr;

  return (
    <div className="master-teacher-container">
      <ManagementDataSection
        sectionTitle="Master Teachers"
        theadData={theadData}
        tbodyData={tbodyData}
        tbodyColIsBadge={[2]}
      />
    </div>
  );
};

export default MasterTeacherView;
