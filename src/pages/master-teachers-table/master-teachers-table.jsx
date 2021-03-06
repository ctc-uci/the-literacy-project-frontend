import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Table from '../../components/Table/Table';
import CreateMasterTeacherModal from '../../components/CreateMasterTeacherModal/CreateMasterTeacherModal';
import { TLPBackend } from '../../common/utils';
import { SECTIONS } from '../../common/config';
import CSVButton from '../../components/CSVButton/CSVButton';
import styles from './master-teachers-table.module.css';

const MasterTeacherTableView = ({ setAlertState }) => {
  const [createModalIsOpen, setCreateModalOpen] = useState(false);
  const [tbodyData, setBodyData] = useState([]);
  const [sortBy, setSortBy] = useState('A-Z');
  const [searchText, setSearchText] = useState('');

  const createTeacher = () => {
    setCreateModalOpen(true);
  };

  const updateSortBy = option => {
    setSortBy(option);
  };

  const inputHandler = e => {
    setSearchText(e.target.value.toLowerCase());
  };

  // searches through data for matching site name to query
  const search = data => {
    return data.filter(row => {
      const name = row.items[0].toLowerCase(); // items[1] is site name
      return name.includes(searchText);
    });
  };

  // Sorting function for name using the sort by value in the body data
  const compareNames = (user1, user2) => {
    const u1 = user1.sortBy.toLowerCase();
    const u2 = user2.sortBy.toLowerCase();

    switch (sortBy) {
      case 'A-Z':
        return u1 < u2 ? -1 : 1;
      case 'Z-A':
        return u1 < u2 ? 1 : -1;
      default:
        return u1 < u2 ? -1 : 1;
    }
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

  // get data to show in the table
  const parseTableData = data => {
    const allTeachers = [];

    data.forEach(teacherObj => {
      const { firstName, lastName, email, phoneNumber, sites, notes, userId, inviteId } =
        teacherObj;
      const id = userId || inviteId;
      const name = `${lastName}, ${firstName}`;
      allTeachers.push({
        id,
        items: [
          name,
          { email, phoneNumber },
          sites || [],
          teacherObj, // used to show active status and resend invite if needed
          null, // empty placeholder for reset password to make sure there is something for each column
          notes || '',
        ],
        sortBy: name,
      });
    });
    setBodyData(allTeachers);
  };

  const fetchData = async () => {
    const teacherData = [];

    // fetching all teacher accounts (created and invited)
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
          <h3>Master Teacher</h3>
          <CSVButton type="mt" />
        </div>
        <div className={styles['table-buttons']}>
          <Button className={styles['create-button']} variant="warning" onClick={createTeacher}>
            Create New Teacher Account <FaPlus cursor="pointer" />
          </Button>
          <InputGroup input={searchText} onChange={inputHandler}>
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
          sectionTitle={SECTIONS.TEACHER}
          theadData={theadData}
          tbodyData={search(tbodyData).sort(compareNames)}
          statusCol={3}
          tbodyColIsBadge={[2]}
          setAlertState={setAlertState}
        />
        <CreateMasterTeacherModal isOpen={createModalIsOpen} setIsOpen={setCreateModalOpen} />
      </div>
    </div>
  );
};

MasterTeacherTableView.defaultProps = {
  setAlertState: null,
};

MasterTeacherTableView.propTypes = {
  setAlertState: PropTypes.func,
};

export default MasterTeacherTableView;
