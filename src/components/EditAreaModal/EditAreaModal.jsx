import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { TLPBackend } from '../../common/utils';
import WarningModal from '../WarningModal/WarningModal';
import styles from './EditAreaModal.module.css';
import '../../common/vars.css';
import StateFormSelect from '../StateFormSelect/StateFormSelect';

const EditAreaModal = props => {
  const { areaId, areaActive, areaName, areaState, isOpen, setIsOpen } = props;

  const [name, setName] = useState(areaName);
  const [state, setState] = useState(areaState);
  const [status, setStatus] = useState(areaActive);
  const [warningOpen, setWarningOpen] = useState(false);
  const [nameExists, setNameExists] = useState(false);

  const reloadPage = () => {
    window.location.reload(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openWarningModal = () => {
    setWarningOpen(!warningOpen);
  };

  const deleteArea = () => {
    TLPBackend.delete(`/areas/${areaId}`).then(() => {
      reloadPage();
      closeModal();
    });
  };

  const updateArea = async () => {
    // TODO: Add error message if the request fails
    const areas = await TLPBackend.get('/areas');
    const areaNames = areas.data.map(area => area.areaName);

    if (areaNames.indexOf(name) > -1) {
      setNameExists(true);
      return;
    }

    TLPBackend.put(`/areas/${areaId}`, {
      areaName: name,
      areaState: state,
      active: status,
    }).then(() => {
      reloadPage();
      closeModal(true);
    });
  };

  return (
    <>
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        name={areaName}
        body="area"
        deleteFunc={deleteArea}
      />
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group className="mb-3" controlId="editArea.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Area Name"
                defaultValue={areaName}
                onChange={({ target }) => setName(target.value)}
                className={nameExists ? styles.error : ''}
              />
              {nameExists ? <p className={styles['error-msg']}> {name} already exists </p> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="editArea.state">
              <Form.Label>State</Form.Label>
              <StateFormSelect
                defaultValue={areaState}
                onChange={({ target }) => setState(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editArea.status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={({ target }) => setStatus(target.value === 'Active')}
                defaultValue={areaActive ? 'Active' : 'Inactive'}
                style={status ? { color: 'green' } : { color: 'red' }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={styles.buttons} onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" className={styles.buttons} onClick={openWarningModal}>
            Delete
          </Button>
          <Button variant="primary" className={styles.buttons} onClick={() => updateArea()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EditAreaModal.propTypes = {
  areaId: PropTypes.number.isRequired,
  areaActive: PropTypes.bool.isRequired,
  areaName: PropTypes.string.isRequired,
  areaState: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditAreaModal;
