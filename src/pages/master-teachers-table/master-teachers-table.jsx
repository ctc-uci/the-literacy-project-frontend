import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import Table from '../../components/Table/Table';
import CreateMasterTeacherModal from '../../components/CreateMasterTeacherModal/CreateMasterTeacherModal';
import CSVButton from '../../components/CSVButton/CSVButton';
import { TLPBackend } from '../../common/utils';
import { AUTH_ROLES } from '../../common/config';
import styles from './master-teachers-table.module.css';

const MasterTeacherTableView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [tbodyData, setBodyData] = useState([]);
  const [sortBy, setSortBy] = useState('A-Z');

  const createTeacher = () => {
    setModalOpen(true);
  };

  const updateSortBy = option => {
    setSortBy(option);
  };
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

  // get data to show in the table
  const parseTableData = data => {
    const allTeachers = [];
    data.forEach(admObj => {
      const { firstName, lastName, email } = admObj;
      const userId = admObj.userId ? admObj.userId : admObj.inviteId;
      const active = admObj.active ? admObj.active : 'pending';
      allTeachers.push({
        id: userId,
        items: [`${firstName} ${lastName}`, email, active],
      });
    });
    setBodyData(allTeachers);
  };

  const fetchData = async () => {
    const teacherData = [];

    // fetching and filtering all admin invites
    const pending = await TLPBackend.get(`/tlp-users/invite`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (pending.status === 200) {
      const { data } = pending;

      data.forEach(user => {
        if (user.position === AUTH_ROLES.ADMIN_ROLE) {
          teacherData.push(user);
        }
      });
    }

    // fetching all admin accounts
    const admins = await TLPBackend.get(`/admins`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (admins.status === 200) {
      teacherData.push(...admins.data);
    }
    parseTableData(teacherData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles['master-teacher-container']}>
      <div className={styles['table-view']}>
        <div className={styles['table-header']}>
          <h3>MasterTeacher</h3>
          <CSVButton />
        </div>
        <div className={styles['table-buttons']}>
          <Button className={styles['create-button']} variant="warning" onClick={createTeacher}>
            Create New Teacher Account <FaPlus cursor="pointer" />
          </Button>
          <InputGroup>
            <FormControl
              placeholder="Search Teachers"
              aria-label="Search Teachers"
              aria-describedby="search-icon"
            />
          </InputGroup>
          <DropdownButton
            className={styles['dropdown-button']}
            id="dropdown-basic-button"
            title={`Sort By ${sortBy}`}
          >
            <Dropdown.Item onClick={() => updateSortBy('A-Z')}>A-Z</Dropdown.Item>
            <Dropdown.Item onClick={() => updateSortBy('Z-A')}>Z-A</Dropdown.Item>
          </DropdownButton>
        </div>
        <Table
          sectionTitle="Master Teacher"
          theadData={theadData}
          tbodyData={tbodyData}
          statusCol={3}
          tbodyColIsBadge={[2]}
        />
        <CreateMasterTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
      </div>
    </div>
  );
};

export default MasterTeacherTableView;
