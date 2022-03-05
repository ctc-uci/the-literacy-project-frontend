import { React, useState } from 'react';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import ManagementDataSection from '../ManagementDataSection/ManagementDataSection';

const SitesTable = () => {
  const theadData = [
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
    {
      headerTitle: 'Site Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Master Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Additional Info',
      headerPopover: '',
    },
  ];

  // const [sites, setSites] = useState([]);
  // dummy data for now
  const sites = [
    {
      siteName: 'Lakeside Middle School',
      masterTeachers: [],
      status: 'Active',
    },
    {
      siteName: 'Irvine Elementary School',
      masterTeachers: ['Harry Potter', 'Hermione Granger'],
      status: 'Sent',
    },
  ];

  let i = 1;
  const statusChoices = ['Active', 'Inactive', 'Sent'];
  const tbodyData = sites.map(s => {
    const [currStatus, setCurrStatus] = useState(s.status);
    const statusDropdown = (
      <DropdownMenu choices={statusChoices} current={currStatus} setFn={setCurrStatus} />
    );
    const additionalInfo = (
      <button type="button" className="btn btn-primary">
        Additional Info
      </button>
    );
    let teachers;
    if (s.masterTeachers.length === 0) {
      teachers = 'No Teacher Assigned';
    } else {
      teachers = s.masterTeachers.join(' ');
    }

    i += 1;
    return {
      id: i,
      items: [statusDropdown, s.siteName, teachers, additionalInfo],
    };
  });

  return <ManagementDataSection theadData={theadData} tbodyData={tbodyData} />;
};

export default SitesTable;
