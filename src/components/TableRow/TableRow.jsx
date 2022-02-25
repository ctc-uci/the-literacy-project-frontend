import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import EditMasterTeacherModal from '../EditMasterTeacherModal/EditMasterTeacherModal';

const TableRow = ({ data, colIsBadge }) => {
  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <>
      <tr>
        {data.map((item, ind) => {
          if (colIsBadge.includes(ind)) {
            return (
              <td key={item}>
                <Badge bg="dark" style={{ cursor: 'pointer' }} onClick={() => setModalOpen(true)}>
                  {item} <FaTrashAlt color="red" cursor="pointer" />
                </Badge>
              </td>
            );
          }
          return <td key={item}>{item}</td>;
        })}
      </tr>
      <EditMasterTeacherModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
    </>
  );
};

TableRow.defaultProps = {
  data: [],
  colIsBadge: [],
};

TableRow.propTypes = {
  data: PropTypes.arrayOf(),
  colIsBadge: PropTypes.arrayOf(PropTypes.number),
};

export default TableRow;
