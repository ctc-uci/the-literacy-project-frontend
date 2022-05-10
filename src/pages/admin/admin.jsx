import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import CreateAdminModal from '../../components/CreateAdminModal/CreateAdminModal';
import styles from './admin.module.css';
import Table from '../../components/Table/Table';
import { TLPBackend } from '../../common/utils';
import { SECTIONS } from '../../common/config';

const AdminView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [tbodyData, setBodyData] = useState([]);
  const [sortBy, setSortBy] = useState('A-Z');

  const createAdmin = () => {
    setModalOpen(true);
  };

  const updateSortBy = option => {
    setSortBy(option);
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
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.</p>",
    },
  ];

  // get data to show in the table
  const parseTableData = data => {
    const allAdmins = [];
    data.forEach(admObj => {
      const { firstName, lastName, email, userId, inviteId } = admObj;
      const id = userId || inviteId;
      allAdmins.push({
        id,
        items: [`${firstName} ${lastName}`, { email }, admObj],
        sortBy: `${lastName} ${firstName}`,
      });
    });
    setBodyData(allAdmins);
  };

  const fetchData = async () => {
    const adminData = [];

    // fetching and filtering all admin invites
    const pending = await TLPBackend.get(`/tlp-users/invite`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (pending.status === 200) {
      adminData.push(...pending.data);
    }

    // fetching all admin accounts
    const admins = await TLPBackend.get(`/admins`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (admins.status === 200) {
      adminData.push(...admins.data);
    }
    parseTableData(adminData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles['admin-container']}>
      <div className={styles['table-view']}>
        <div className={styles['table-header']}>
          <h3>Admin</h3>
          <Button className={styles['export-button']} variant="primary">
            Export to CSV
          </Button>
        </div>
        <div className={styles['table-buttons']}>
          <Button className={styles['create-button']} variant="warning" onClick={createAdmin}>
            Create New Admin Account <FaPlus cursor="pointer" />
          </Button>
          <InputGroup>
            <FormControl
              placeholder="Search Admin"
              aria-label="Search Admin"
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
          sectionTitle={SECTIONS.ADMIN}
          theadData={theadData}
          tbodyData={tbodyData.sort(compareNames)}
          statusCol={2}
          tbodyColIsBadge={[]}
        />
        <CreateAdminModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
      </div>
    </div>
  );
};

export default AdminView;
