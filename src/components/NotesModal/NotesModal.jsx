import { React, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './NotesModal.module.css';
import { TLPBackend } from '../../common/utils';

const NotesModal = ({ isOpen, setIsOpen, site }) => {
  const [noteText, setNoteText] = useState('');
  const handleNoteChange = e => {
    setNoteText(e.target.value);
  };

  // sends a PUT request to update site and closes modal
  const updateNote = async () => {
    await TLPBackend.put(`/sites/${site.siteId}`, {
      ...site,
      notes: noteText,
    });
    // site.notes = noteText;
    setIsOpen(false);
  };

  // updates the state whenever the componment is passed a new site prop
  useEffect(() => {
    if (site.notes === null) {
      setNoteText('');
    } else {
      setNoteText(site.notes);
    }
  }, [site]);

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title className={styles.title}>Notes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <textarea
            type="text"
            value={noteText}
            className="form-control"
            onChange={handleNoteChange}
          />
        </form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button onClick={() => setIsOpen(false)} className="btn-warning">
          Cancel
        </Button>
        <Button onClick={updateNote}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

NotesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  site: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default NotesModal;
