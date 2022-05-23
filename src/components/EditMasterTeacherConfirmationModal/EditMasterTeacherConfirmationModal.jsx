import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';
import styles from './EditMasterTeacherConfirmationModal.module.css';
import { TLPBackend, reloadPage } from '../../common/utils';

const EditMasterTeacherConfirmationModal = ({ isOpen, setIsOpen, teacherId, onSubmitData }) => {
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [droppedSites, setDroppedSites] = useState([]);
  const [newSites, setNewSites] = useState([]);
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { firstName, lastName, beforeSites, afterSites } = onSubmitData;
    setName(`${firstName} ${lastName}`);
    setDroppedSites(beforeSites.filter(site => !afterSites.includes(site)));
    setNewSites(afterSites.filter(site => !beforeSites.includes(site)));
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const finishEdits = async data => {
    const { firstName, lastName, phoneNumber, email, notes, active } = data;
    await TLPBackend.put(`/teachers/${teacherId}`, {
      firstName,
      lastName,
      phoneNumber,
      email,
      notes: notes ?? '',
      active,
    });
    await Promise.all(
      newSites.map(ns =>
        TLPBackend.post(`/teachers/add-site/${teacherId}`, { siteId: Number(ns.siteId) }),
      ),
    );
    await Promise.all(
      droppedSites.map(rs =>
        TLPBackend.put(`/teachers/remove-site/${teacherId}`, { siteId: Number(rs.siteId) }),
      ),
    );
    setShowAlert(true);
    closeModal();
    // TODO: Make MTs table refresh instead of reloading page
    reloadPage();
  };

  return (
    <>
      <Modal
        className={styles.modal}
        dialogClassName={styles.dialog}
        show={isOpen}
        onHide={closeModal}
      >
        <Modal.Header className={styles['modal-header']} closeButton>
          <Modal.Title className={styles['modal-title']}>Changed Sites Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.centerFlex}>
            <div className={styles.threeQuarterWidth}>
              <p>
                <span className={styles.bold}>
                  You have changed the following site assignments for {name} as follows:
                </span>
              </p>
              {newSites.length > 0 ? (
                <>
                  <div className={styles.leftFlex}>
                    <p>Added:</p>
                  </div>
                  <div className={styles.leftFlex}>
                    <ul>
                      {newSites.map(site => (
                        <li key={site.siteId} className={styles.siteItem}>
                          {site.siteName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : null}
              {droppedSites.length > 0 ? (
                <>
                  <div className={styles.leftFlex}>
                    <p>Dropped:</p>
                  </div>
                  <div className={styles.leftFlex}>
                    <ul>
                      {droppedSites.map(site => (
                        <li key={site.siteId} className={styles.siteItem}>
                          {site.siteName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : null}
              <p>
                If these changes are correct, press{' '}
                <span className={styles.blue}>Save Changes</span>. If you made a mistake, press{' '}
                <span className={styles.gray}>Cancel</span>.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.buttons} variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className={styles.buttons}
            variant="primary"
            onClick={() => finishEdits(onSubmitData)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="success" className={styles['alert-custom']}>
            Successfully edited {name}&apos;s data.{' '}
            <CloseButton
              className={styles['alert-close-btn']}
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

EditMasterTeacherConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  teacherId: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onSubmitData: PropTypes.object.isRequired,
};

export default EditMasterTeacherConfirmationModal;
