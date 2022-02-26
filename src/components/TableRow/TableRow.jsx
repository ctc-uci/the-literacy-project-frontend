import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaPencilAlt } from 'react-icons/fa';
import EditMasterTeacherModal from '../EditMasterTeacherModal/EditMasterTeacherModal';

const TableRow = ({ data, colIsBadge, sectionTitle }) => {
  const [modalIsOpen, setModalOpen] = useState('');

  const addBadgeStyles = {
    cursor: 'pointer',
    marginLeft: '0.5em',
  };

  return (
    <>
      <tr>
        {data.map((item, ind) => {
          if (ind === 0) {
            return (
              <td key={item}>
                <Button
                  variant="link"
                  onClick={() => setModalOpen(sectionTitle)}
                  style={{ color: 'black' }}
                >
                  {item}
                </Button>
                <FaPencilAlt cursor="pointer" onClick={() => setModalOpen(sectionTitle)} />
              </td>
            );
          }
          if (colIsBadge.includes(ind)) {
            return (
              <td key={item}>
                <Badge bg="dark" style={{ cursor: 'pointer' }}>
                  {item} <FaTrashAlt color="red" cursor="pointer" />
                </Badge>
                <Badge bg="primary" style={addBadgeStyles}>
                  Add Site <FaPlus cursor="pointer" />
                </Badge>
              </td>
            );
          }
          return <td key={item}>{item}</td>;
        })}
      </tr>
      <EditMasterTeacherModal
        isOpen={
          modalIsOpen === 'Master Teachers'
        } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
        setIsOpen={setModalOpen}
      />
    </>
  );
};

TableRow.defaultProps = {
  data: [],
  colIsBadge: [],
  sectionTitle: '',
};

TableRow.propTypes = {
  data: PropTypes.arrayOf(),
  colIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
};

export default TableRow;
