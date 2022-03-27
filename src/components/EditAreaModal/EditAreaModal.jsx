import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditAreaModal.css';

const EditAreaModal = props => {
  const { areaId, areaName, isOpen, setIsOpen } = props;

  const [name, setName] = useState(areaName);
  const [status, setStatus] = useState(true);

  const deleteArea = () => {
    // TODO: connect to api
    console.log(`Deleted ${areaId}`);
    setIsOpen(false);
  };

  const updateArea = () => {
    // TODO: connect to api
    console.log(`Update ${areaId}. Name=${name}, Status=${status}`);
    setIsOpen(false);
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
          <Button variant="danger" onClick={() => deleteArea(areaId)}>
            Delete
          </Button>
          <Button variant="info" onClick={() => setIsOpen(false)}>
            Save and Add Another
          </Button>
          <Button variant="primary" onClick={() => updateArea(areaId)}>
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
