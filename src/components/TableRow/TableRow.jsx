import { React, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import '../../common/vars.css';
import EditMasterTeacherModal from '../EditMasterTeacherModal/EditMasterTeacherModal';
import EditAdminModal from '../EditAdminModal/EditAdminModal';
import StatusCell from '../StatusCell/StatusCell';
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModal';
import TeacherNotesModal from '../NotesModal/TeacherNotesModal';
import { SECTIONS } from '../../common/config';
import AddNoteIcon from '../../assets/icons/AddNote.svg';
import EditNoteIcon from '../../assets/icons/EditNote.svg';

const { ADMIN, TEACHER, STUDENT } = SECTIONS;
const RESET = 'Reset Password'; // used to open reset password and edit note modal modal
const NOTES = 'Notes';

const TableRow = ({ uniqueKey, data, colIsBadge, sectionTitle, statusCol, setAlertState }) => {
  const [modalIsOpen, setModalOpen] = useState('');

  const currEmail = data[1]?.email; // the original email to check against if changing
  const [email, setEmail] = useState(currEmail);
  // used to for master teacher note
  const [notes, setNoteModalText] = useState(sectionTitle === TEACHER ? data[5] : '');

  const userName = data[0];
  const addBadgeStyles = {
    cursor: 'pointer',
    marginLeft: '0.5em',
    backgroundColor: '#17A2B8',
  };
  const noteIconStyles = {
    backgroundColor: 'transparent',
    border: 'none',
  };

  const displayPencilAndLink = item => {
    if (sectionTitle === ADMIN || sectionTitle === TEACHER)
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
    if (sectionTitle === STUDENT)
      return (
        <Button
          variant="primary"
          style={{ color: 'var(--text-color-white)' }}
          onClick={() => setModalOpen(sectionTitle)}
        >
          {item}
        </Button>
      );
    if (sectionTitle === TEACHER) {
      return (
        <Button style={noteIconStyles} onClick={() => setModalOpen(NOTES)}>
          {notes !== '' ? (
            <img alt="edit note" src={EditNoteIcon} />
          ) : (
            <img alt="add note" src={AddNoteIcon} />
          )}
        </Button>
      );
    }
    return item;
  };

  const displayBadgeCell = (item, ind) => {
    // for teachers, display names of all sites they are in with the option to remove that site + add site button
    if (sectionTitle === TEACHER) {
      return (
        <td key={ind}>
          {item.map(site => (
            <Badge key={site.siteId} bg="dark" style={{ marginLeft: '0.5em' }}>
              {site.siteName}
            </Badge>
          ))}
          <Badge style={addBadgeStyles} onClick={() => setModalOpen(SECTIONS.TEACHER)}>
            Edit Sites <FaPencilAlt style={{ marginLeft: '5px' }} />
          </Badge>
        </td>
      );
    }
    return null;
  };

  /* eslint-disable react/no-array-index-key */
  return (
    <>
      <tr style={{ height: '120px' }}>
        {data.map((item, ind) => {
          if (ind === 0) {
            return <td key={ind}>{displayPencilAndLink(item)}</td>;
          }
          if (ind === 1 && (sectionTitle === ADMIN || sectionTitle === TEACHER)) {
            return (
              <td key={ind}>
                <div>{email}</div>
                {item.phoneNumber ? <div>{item.phoneNumber}</div> : null}
              </td>
            );
          }
          if (statusCol === ind) {
            return (
              <td key={item}>
                <StatusCell data={item} setEmail={setEmail} setAlertState={setAlertState} />
              </td>
            );
          }
          if (ind === data.length - 1) {
            return (
              <td key={ind} style={{ textAlign: 'center' }}>
                {displayAsButton(item)}
              </td>
            );
          }
          // reset password button
          if (ind === 4 && sectionTitle === TEACHER) {
            return (
              <td key={ind}>
                <Button
                  style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}
                  onClick={() => setModalOpen('Reset Password')}
                >
                  Reset
                </Button>
              </td>
            );
          }
          // badge column for displaying sites
          // item here should be an object with site id and site name for teacher section
          if (colIsBadge.includes(ind)) {
            return displayBadgeCell(item, ind);
          }
          return <td key={ind}>{item}</td>;
        })}
      </tr>
      {sectionTitle === TEACHER && (
        <>
          <EditMasterTeacherModal
            isOpen={
              modalIsOpen === TEACHER
            } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
            setIsOpen={setModalOpen}
            teacherId={uniqueKey}
          />
          <ResetPasswordModal
            userId={uniqueKey}
            userName={userName}
            isOpen={modalIsOpen === RESET}
            setIsOpen={setModalOpen}
            setAlertState={setAlertState}
          />
          <TeacherNotesModal
            isOpen={modalIsOpen === NOTES}
            setIsOpen={setModalOpen}
            teacherId={uniqueKey}
            teacherName={userName}
            notes={notes}
            setNotes={setNoteModalText}
            setAlertState={setAlertState}
          />
        </>
      )}
      {sectionTitle === ADMIN && (
        <EditAdminModal
          isOpen={modalIsOpen === ADMIN}
          setIsOpen={setModalOpen}
          adminId={uniqueKey}
        />
      )}
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
  setAlertState: null,
};

TableRow.propTypes = {
  uniqueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.any),
  colIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
  statusCol: PropTypes.number,
  setAlertState: PropTypes.func,
};

export default TableRow;
