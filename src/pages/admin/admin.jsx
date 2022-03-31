import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import { TLPBackend } from '../../common/utils';

const AdminView = () => {
  const [adminList, setAdminList] = useState([]);
  const [error, setError] = useState(null);
  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Email',
      headerPopover: '',
    },
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
  ];

  useEffect(async () => {
    const res = await TLPBackend.get(`/admins`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setAdminList(res.data);
    } else {
      setAdminList([]);
      setError(error);
    }
  }, []);

  const tbodyData = [];
  adminList.forEach(mtObj => {
    const { firstName } = mtObj;
    const { lastName } = mtObj;
    tbodyData.push({
      id: mtObj.userId,
      items: [`${firstName} ${lastName}`, mtObj.email, mtObj.active],
    });
  });

  return (
    <div className={styles['admin-container']}>
      <ManagementDataSection
        sectionTitle="Admin"
        theadData={theadData}
        tbodyData={tbodyData}
        statusCol={2}
      />
    </div>
  );
};

export default AdminView;
