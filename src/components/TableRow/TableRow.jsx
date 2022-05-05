import { React, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaPencilAlt } from 'react-icons/fa';
import '../../common/vars.css';
import EditMasterTeacherModal from '../EditMasterTeacherModal/EditMasterTeacherModal';
import EditAdminModal from '../EditAdminModal/EditAdminModal';
import StatusCell from '../StatusCell/StatusCell';
import { TLPBackend } from '../../common/utils';

const TableRow = ({ uniqueKey, data, colIsBadge, sectionTitle, statusCol }) => {
  const [modalIsOpen, setModalOpen] = useState('');

  const addBadgeStyles = {
    cursor: 'pointer',
    marginLeft: '0.5em',
    backgroundColor: '#17A2B8',
  };

  const displayPencilAndLink = item => {
    if (sectionTitle === 'Admin' || sectionTitle === 'Master Teachers')
      return (
        <>
          <FaPencilAlt cursor="pointer" onClick={() => setModalOpen(sectionTitle)} />
          <Button
            variant="link"
            onClick={() => setModalOpen(sectionTitle)}
            style={{ color: 'black' }}
          >
            {item}
          </Button>
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

  // remove a site from the teacher site relation
  const deleteSite = async (siteId, siteList, index) => {
    console.log(uniqueKey, siteId);
    await TLPBackend.delete(`teachers/remove-site/${uniqueKey}`, { siteId });
    siteList.splice(index, 1);
    console.log(siteList);
  };

  /* eslint-disable react/no-array-index-key */
  return (
    <>
      <tr>
        {data.map((item, ind) => {
          if (ind === 0) {
            return <td key={ind}>{displayPencilAndLink(item)}</td>;
          }
          if (statusCol === ind) {
            return (
              <td key={item}>
                <StatusCell data={item} />
              </td>
            );
          }
          if (ind === data.length - 1) {
            return <td key={ind}>{displayAsButton(item)}</td>;
          }
          // badge column for displaying sites
          // item here should be an object with site id and site name
          if (colIsBadge.includes(ind)) {
            return (
              <td key={ind}>
                {item.map(i => (
                  <Badge
                    key={i.siteId}
                    bg="dark"
                    style={{ cursor: 'pointer', marginLeft: '0.5em' }}
                    onClick={() => deleteSite(i.siteId, item, i)}
                  >
                    {i.siteName}
                    <FaTrashAlt color="red" cursor="pointer" />
                  </Badge>
                ))}
                <Badge style={addBadgeStyles} onClick={() => setModalOpen('Master Teachers')}>
                  Add Site <FaPlus cursor="pointer" />
                </Badge>
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
  uniqueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.any),
  colIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
  statusCol: PropTypes.number,
};

export default TableRow;
