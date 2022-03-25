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
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
    {
      headerTitle: 'Notes',
      headerPopover: '',
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

  const tbodyData = [];
  masterTeacherList.forEach(mtObj => {
    const { firstName, lastName } = mtObj;
    tbodyData.push({
      id: mtObj.userId,
      items: [`${firstName} ${lastName}`, mtObj.email, mtObj.sites, mtObj.active, 'notes'],
    });
  });
  return (
    <div className="master-teacher-container">
      <ManagementDataSection
        sectionTitle="Master Teachers"
        theadData={theadData}
        tbodyData={tbodyData}
        tbodyColIsBadge={[2]}
        statusCol={3}
      />
    </div>
  );
};

export default MasterTeacherView;
