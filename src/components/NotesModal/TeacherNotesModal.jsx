import { React, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './NotesModal.module.css';
import { TLPBackend } from '../../common/utils';

const NotesModal = ({ isOpen, setIsOpen, teacherId, notes }) => {
  const [noteText, setNoteText] = useState(notes);

  const handleNoteChange = e => {
    setNoteText(e.target.value);
  };

  // sends a PUT request to update teacher's notes and close modal
  const updateNote = async () => {
    await TLPBackend.put(`/teachers/${teacherId}`, {
      notes: noteText,
    });
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        {/* should be teacher first + last name */}
        <Modal.Title className={styles.title}>{teacherId}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <label className={styles.label} htmlFor="text">
            Notes
            <textarea
              type="text"
              value={noteText}
              className="form-control"
              onChange={handleNoteChange}
            />
          </label>
        </form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button onClick={() => setIsOpen(false)} className="btn-danger">
          Cancel
        </Button>
        <Button onClick={updateNote}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

NotesModal.defaultProps = {
  notes: 'some notes',
};

NotesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  teacherId: PropTypes.number.isRequired,
  notes: PropTypes.string,
};

export default NotesModal;
