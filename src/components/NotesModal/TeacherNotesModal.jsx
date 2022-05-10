import { React } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './NotesModal.module.css';
import { TLPBackend } from '../../common/utils';

const TeacherNotesModal = ({ isOpen, setIsOpen, teacherId, teacherName, notes, setNotes }) => {
  const handleNoteChange = e => {
    setNotes(e.target.value);
  };

  // sends a PUT request to update teacher's notes and close modal
  // also update the data in the frontend
  const updateNote = async () => {
    await TLPBackend.put(`/teachers/update-notes/${teacherId}`, { notes });
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title className={styles.title}>{teacherName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <label className={styles.label} htmlFor="text">
            Notes
            <textarea
              type="text"
              value={notes}
              className="form-control"
              onChange={handleNoteChange}
              placeholder={notes === '' ? 'Enter some notes for the teacher here' : ''}
            />
          </label>
        </form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}
        >
          Cancel
        </Button>
        <Button onClick={updateNote}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

TeacherNotesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  teacherId: PropTypes.number.isRequired,
  teacherName: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default TeacherNotesModal;
