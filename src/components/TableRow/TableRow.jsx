import { React, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Form } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaPencilAlt } from 'react-icons/fa';
import '../../common/vars.css';
import EditMasterTeacherModal from '../EditMasterTeacherModal/EditMasterTeacherModal';
import EditAdminModal from '../EditAdminModal/EditAdminModal';

const TableRow = ({ uniqueKey, data, colIsBadge, sectionTitle, statusCol }) => {
  const [modalIsOpen, setModalOpen] = useState('');

  const addBadgeStyles = {
    cursor: 'pointer',
    marginLeft: '0.5em',
  };

  const displayPencilAndLink = item => {
    if (sectionTitle === 'Admin' || sectionTitle === 'Master Teachers')
      return (
        <>
          <Button
            variant="link"
            onClick={() => setModalOpen(sectionTitle)}
            style={{ color: 'black' }}
          >
            {item}
          </Button>
          <FaPencilAlt cursor="pointer" onClick={() => setModalOpen(sectionTitle)} />
        </>
      );
    return item;
  };

  const displayAsButton = item => {
    if (sectionTitle === 'Students')
      return (
        <Button
          variant="primary"
          style={{ color: 'var(--text-color-white)' }}
          onClick={() => setModalOpen(sectionTitle)}
        >
          {item}
        </Button>
      );
    return item;
  };

  const styleStatus = val => {
    if (val === 'active' || val === 'inactive') {
      return (
        <Form.Group className="mb-3">
          <Form.Select style={{ width: '110px' }}>
            <option value={val}>{val === 'active' ? 'Active' : 'Inactive'}</option>
            <option>{val === 'active' ? 'Inactive' : 'Active'}</option>
          </Form.Select>
        </Form.Group>
      );
    }
    return 'Account Pending';
  };

  /* eslint-disable react/no-array-index-key */
  return (
    <>
      <tr>
        {data.map((item, ind) => {
          if (ind === 0) {
            return <td key={ind}>{displayPencilAndLink(item)}</td>;
          }
          if (ind === data.length - 1) {
            return <td key={ind}>{displayAsButton(item)}</td>;
          }
          if (colIsBadge.includes(ind)) {
            return (
              <td key={ind}>
                {item !== null && (
                  <Badge bg="dark" style={{ cursor: 'pointer' }}>
                    {item} <FaTrashAlt color="red" cursor="pointer" />
                  </Badge>
                )}
                <Badge bg="primary" style={addBadgeStyles}>
                  Add Site <FaPlus cursor="pointer" />
                </Badge>
              </td>
            );
          }
          if (statusCol === ind) {
            return (
              <td key={ind} style={{ color: '#17A2B8' }}>
                {styleStatus(item)}
              </td>
            );
          }
          return <td key={ind}>{item}</td>;
        })}
      </tr>
      <EditMasterTeacherModal
        isOpen={
          modalIsOpen === 'Master Teachers'
        } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
        setIsOpen={setModalOpen}
        teacherId={uniqueKey}
      />
      <EditAdminModal
        isOpen={modalIsOpen === 'Admin'}
        setIsOpen={setModalOpen}
        adminId={uniqueKey}
      />
    </>
  );
};
/* eslint-enable react/no-array-index-key */

TableRow.defaultProps = {
  uniqueKey: null,
  data: [],
  colIsBadge: [],
  sectionTitle: '',
  statusCol: -1,
};

TableRow.propTypes = {
  uniqueKey: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.node),
  colIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
  statusCol: PropTypes.number,
};

export default TableRow;
