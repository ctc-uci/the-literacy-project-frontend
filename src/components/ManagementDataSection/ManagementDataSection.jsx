import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus, FaFilter } from 'react-icons/fa';
import '../../custom.scss';
import '../../common/vars.css';
import styles from './ManagementDataSection.module.css';
import Table from '../Table/Table';
import InformationPopover from '../Popover/InformationPopover';
import CreateMasterTeacherModal from '../CreateMasterTeacherModal/CreateMasterTeacherModal';
import CreateAdminModal from '../CreateAdminModal/CreateAdminModal';

const ManagementDataSection = ({
  sectionTitle,
  theadData,
  tbodyData,
  hasHeader,
  headerText,
  tbodyColIsBadge,
  statusCol,
}) => {
  let popover;
  if (hasHeader) {
    popover = <InformationPopover bodyText={headerText} />;
  } else {
    popover = null;
  }
  const [modalIsOpen, setModalOpen] = useState('');
  const [sortBy, setSortBy] = useState('A-Z');
  const [searchText, setSearchText] = useState('');

  const sorts = ['A-Z', 'Z-A'];

  const clickManager = () => {
    setModalOpen(sectionTitle);
  };
  const inputHandler = e => {
    setSearchText(e.target.value.toLowerCase());
  };

  const displaySectionTitle = () => {
    if (sectionTitle !== 'Students') {
      return (
        <>
          <h1 className={styles['inner-ctrl']} style={{ height: 'calc(1.375rem + 1.5vw)' }}>
            {sectionTitle}
            {popover}
          </h1>
          <Button className={styles['export-button']} variant="primary">
            Export to CSV
          </Button>
        </>
      );
    }
    return null;
  };

  const displayCreateButton = () => {
    if (sectionTitle !== 'Students') {
      return (
        <Button variant="warning" onClick={clickManager}>
          Create New {sectionTitle} <FaPlus cursor="pointer" />
        </Button>
      );
    }
    return null;
  };

  const displayExportButtonRight = () => {
    if (sectionTitle === 'Students') {
      return (
        <Button className={styles['export-button']} variant="primary">
          Export to CSV
        </Button>
      );
    }
    return null;
  };

  const displayFilterButton = () => {
    if (sectionTitle !== 'Admin') {
      return (
        <Button className={styles['filter-button']} variant="primary">
          Filter By <FaFilter cursor="pointer" />
        </Button>
      );
    }
    return null;
  };

  // Compares two fields alphabetically
  const compareNames = (field1, field2) => {
    const f1 = field1.items[0].toLowerCase(); // items[0] gives the Name
    const f2 = field2.items[0].toLowerCase();

    switch (sortBy) {
      case 'A-Z':
        return f1 < f2 ? -1 : 1;
      case 'Z-A':
        return f1 < f2 ? 1 : -1;
      default:
        return f1 < f2 ? -1 : 1;
    }
  };

  const displaySortByButton = () => {
    return (
      <DropdownButton
        className={styles['dropdown-button']}
        id="dropdown-basic-button"
        title={`Sort By: ${sortBy}`}
      >
        {sorts.map(sort => (
          <Dropdown.Item
            onClick={() => {
              setSortBy(sort);
            }}
            key={sort}
          >
            {sort}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };

  const search = data => {
    return data.filter(row => {
      const name = row.items[0].toLowerCase();
      return name.includes(searchText);
    });
  };

  const displayData = data => {
    return search(data).sort(compareNames);
  };

  return (
    <div>
      {displaySectionTitle()}
      <div className={styles['ctrl-group']}>
        <div className={styles['inner-ctrl']}>{displayCreateButton()}</div>
        <div className={styles['inner-ctrl']}>
          <div className={styles.search}>
            <InputGroup input={searchText} onChange={inputHandler}>
              <FormControl
                className={styles['search-bar']}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-icon"
              />
            </InputGroup>
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <div className={styles['inner-ctrl']}>{displayExportButtonRight()}</div>
          <div className={styles['inner-ctrl']}>{displayFilterButton()}</div>
          <div className={styles['inner-ctrl']}>{displaySortByButton()}</div>
        </div>
      </div>
      <Table
        theadData={theadData}
        tbodyData={displayData(tbodyData)}
        tbodyColIsBadge={tbodyColIsBadge}
        sectionTitle={sectionTitle}
        statusCol={statusCol}
      />
      <CreateMasterTeacherModal
        isOpen={
          modalIsOpen === 'Master Teachers'
        } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
        setIsOpen={setModalOpen}
      />
      <CreateAdminModal
        isOpen={
          modalIsOpen === 'Admin'
        } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
        setIsOpen={setModalOpen}
      />
    </div>
  );
};

ManagementDataSection.defaultProps = {
  sectionTitle: '',
  theadData: [],
  tbodyData: [],
  hasHeader: false,
  headerText: '',
  tbodyColIsBadge: [],
  statusCol: -1,
};

ManagementDataSection.propTypes = {
  sectionTitle: PropTypes.string,
  theadData: PropTypes.arrayOf(PropTypes.object),
  tbodyData: PropTypes.arrayOf(PropTypes.object),
  hasHeader: PropTypes.bool,
  headerText: PropTypes.string,
  tbodyColIsBadge: PropTypes.arrayOf(PropTypes.number),
  statusCol: PropTypes.number,
};

export default ManagementDataSection;
