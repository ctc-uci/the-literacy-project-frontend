import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateAreaModal.css';
import { Modal, Button, Form, Alert, CloseButton } from 'react-bootstrap';
import { TLPBackend } from '../../common/utils';

const CreateAreaModal = ({ isOpen, setIsOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [areaName, setAreaName] = useState('');
  const [alertText, setAlertText] = useState('');
  const [isAlertSuccess, setIsAlertSuccess] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    setShowAlert(true);
  };
  const closeModalNoAlert = () => {
    setIsOpen(false);
    setShowAlert(false);
  };
  const submitNewArea = async () => {
    const areas = await TLPBackend.get('/areas');
    const areaNames = areas.data.map(area => area.areaName);

    if (areaNames.indexOf(areaName) > -1) {
      // same area name as existing one
      setAlertText(`[ERROR] area name ${areaName} already exists`);
      setIsAlertSuccess(false);
      closeModal();
      return;
    }

    TLPBackend.post('/areas', {
      areaName,
      active: 'true',
    })
      .then(() => {
        setAlertText(`Successfully created area: ${areaName}`);
        setIsAlertSuccess(true);
        closeModal();
      })
      .catch(() => {
        setAlertText(`[ERROR] unable to create area: ${areaName}`);
        setIsAlertSuccess(false);
        closeModal();
      });
  };
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModalNoAlert}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">Create New Area</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Form.Group className="mb-5" controlId="createArea.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                defaultValue={areaName}
                onChange={e => {
                  setAreaName(e.target.value);
                }}
                required
              />
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={submitNewArea}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant={isAlertSuccess ? 'primary' : 'danger'} className="alert-custom">
            {alertText}
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

CreateAreaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateAreaModal;
