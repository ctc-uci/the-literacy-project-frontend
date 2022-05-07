import { React, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-bootstrap';
import { FaPlus, FaPencilAlt, FaPlusSquare, FaPenSquare } from 'react-icons/fa';
import '../../common/vars.css';
import EditMasterTeacherModal from '../EditMasterTeacherModal/EditMasterTeacherModal';
import EditAdminModal from '../EditAdminModal/EditAdminModal';
import StatusCell from '../StatusCell/StatusCell';
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModal';
import TeacherNotesModal from '../NotesModal/TeacherNotesModal';
import TeacherTableSiteCell from '../TeacherTableSiteCell/TeacherTableSiteCell';
import { SECTIONS } from '../../common/config';

const { ADMIN, TEACHER, STUDENT } = SECTIONS;
const RESET = 'Reset Password'; // used to open reset password and edit note modal modal
const NOTES = 'Notes';

const TableRow = ({ uniqueKey, data, colIsBadge, sectionTitle, statusCol }) => {
  const [modalIsOpen, setModalOpen] = useState('');

  // used to for master teacher note
  const [noteModalText, setNoteModalText] = useState('');

  const userName = data[0];
  const addBadgeStyles = {
    cursor: 'pointer',
    marginLeft: '0.5em',
    backgroundColor: '#17A2B8',
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

  const setNotes = note => {
    setNoteModalText(note);
    setModalOpen(NOTES);
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
      return item !== '' ? (
        <FaPenSquare cursor="pointer" size="2em" onClick={() => setNotes(item)} />
      ) : (
        <FaPlusSquare cursor="pointer" size="2em" onClick={() => setModalOpen(NOTES)} />
      );
    }
    return item;
  };

  // for teachers, display names of all sites they are in with the option to remove that site + add site button
  const displayBadgeCell = (item, ind) => {
    if (sectionTitle === TEACHER) {
      return (
        <td key={ind}>
          <TeacherTableSiteCell teacherId={uniqueKey} item={item} />
          <Badge style={addBadgeStyles} onClick={() => setModalOpen(SECTIONS.TEACHER)}>
            Add Site <FaPlus cursor="pointer" />
          </Badge>
        </td>
      );
    }
    return null;
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
            isOpen={modalIsOpen === RESET}
            setIsOpen={setModalOpen}
          />
          <TeacherNotesModal
            isOpen={modalIsOpen === NOTES}
            setIsOpen={setModalOpen}
            teacherId={uniqueKey}
            teacherName={userName}
            notes={noteModalText}
            setNote={setNoteModalText}
            data={data}
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
};

TableRow.propTypes = {
  uniqueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.any),
  colIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
  statusCol: PropTypes.number,
};

export default TableRow;
