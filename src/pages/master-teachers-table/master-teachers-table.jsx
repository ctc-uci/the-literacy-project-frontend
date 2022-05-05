import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus, FaFilter, FaPlusSquare, FaPenSquare } from 'react-icons/fa';
import Table from '../../components/Table/Table';
import CreateMasterTeacherModal from '../../components/CreateMasterTeacherModal/CreateMasterTeacherModal';
import { TLPBackend } from '../../common/utils';
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
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
    {
      headerTitle: 'Reset Password',
      headerPopover: '',
    },
    {
      headerTitle: 'Notes',
      headerPopover: '',
    },
  ];

  const contactInfo = (email, phoneNumber) => {
    return (
      <div>
        <div>{email}</div>
        <div>{phoneNumber}</div>
      </div>
    );
  };

  const resetPasswordBtn = () => {
    return <Button className={styles['reset-button']}>Reset</Button>;
  };

  const noteIcon = hasNotes => {
    return (
      <div className={styles['notes-button']}>
        {hasNotes ? (
          <FaPenSquare cursor="pointer" size="2em" />
        ) : (
          <FaPlusSquare cursor="pointer" size="2em" />
        )}
      </div>
    );
  };

  // get data to show in the table
  const parseTableData = data => {
    const allTeachers = [];

    data.forEach(teacherObj => {
      const { firstName, lastName, email, phoneNumber, sites, notes } = teacherObj;
      const userId = teacherObj.userId ? teacherObj.userId : teacherObj.inviteId;
      allTeachers.push({
        id: userId,
        items: [
          `${firstName} ${lastName}`,
          contactInfo(email, phoneNumber),
          sites || [],
          teacherObj, // used to show active status and resend invite if needed
          resetPasswordBtn(),
          noteIcon(notes?.length > 0 || false),
        ],
      });
    });
    setBodyData(allTeachers);
  };

  const fetchData = async () => {
    const teacherData = [];

    // fetching all admin accounts
    const admins = await TLPBackend.get(`/teachers`, {
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
          <Button className={styles['export-button']} variant="primary">
            Export to CSV
          </Button>
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
          <Button className={styles['filter-button']} variant="primary">
            Filter By <FaFilter cursor="pointer" />
          </Button>
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
          sectionTitle="Master Teachers"
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
