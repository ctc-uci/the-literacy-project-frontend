import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { TLPBackend } from '../../common/utils';
import './EditAreaModal.css';

const EditAreaModal = props => {
  const { areaId, areaName, isOpen, setIsOpen } = props;

  const [name, setName] = useState(areaName);
  const [status, setStatus] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteArea = () => {
    TLPBackend.delete(`/areas/${areaId}`).then(() => {
      closeModal();
    });
  };

  const updateArea = () => {
    TLPBackend.put(`/areas/${areaId}`, { areaName: name, active: status }).then(() => {
      closeModal();
    });
  };

  return (
    <>
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editArea.status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                onChange={({ target }) => setStatus(target.value === 'Active')}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteArea()}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => updateArea()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EditAreaModal.propTypes = {
  areaId: PropTypes.number.isRequired,
  areaName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditAreaModal;
