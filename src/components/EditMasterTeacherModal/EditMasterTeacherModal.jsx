import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton, Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './EditMasterTeacherModal.module.css';
import { TLPBackend, reloadPage } from '../../common/utils';
import WarningModal from '../WarningModal/WarningModal';

const EditMasterTeacherModal = ({ isOpen, setIsOpen, teacherId }) => {
  const [showEditMasterTeacherAlert, setShowEditMasterTeacherAlert] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setShowEditMasterTeacherAlert(true);
  };

  // const closeModalNoAlert = () => {
  //   setIsOpen(false);
  //   setShowEditMasterTeacherAlert(false);
  //   setErrorMessage('');
  // };

  // This teacher data will be populated, but may be changed using the form
  const [teacherData, setTeacherData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notes: '',
  });
  // Copy of initial teacher data for undo functionality
  const [initialTeacherData, setInitialTeacherData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notes: '',
    active: '',
    siteList: [],
  });
  const [errorMessage, setErrorMessage] = useState(null);
  // const [status, setStatus] = useState('');
  const [sites, setSites] = useState([]);
  const [possibleSites, setPossibleSites] = useState([]);
  const teacherName = `${teacherData.firstName} ${teacherData.lastName}`;

  const removeSite = siteId => {
    setPossibleSites([...(possibleSites ?? []), sites.find(site => site.siteId === siteId)]);
    setSites(sites.filter(site => site.siteId !== siteId));
  };

  const [warningOpen, setWarningOpen] = useState(false);
  const openWarningModal = () => {
    setWarningOpen(true);
    setIsOpen(false);
  };

  const updateMasterTeacherData = async data => {
    const { firstName, lastName, phoneNumber, email, notes } = data;
    await TLPBackend.put(`/teachers/${teacherId}`, {
      firstName,
      lastName,
      phoneNumber,
      email,
      notes: notes ?? '',
      active: initialTeacherData.active.toLowerCase(),
    });
    setTeacherData({ firstName, lastName, phoneNumber, email });
    // TODO: Make MTs table refresh instead of reloading page
    // reloadPage();
    setErrorMessage('');
  };

  const assignSites = async (before, after) => {
    if (!before && !after) {
      return;
    }
    const removedSites = before.filter(site => !after.includes(site));
    const newSites = after.filter(site => !before.includes(site));
    await Promise.all(
      newSites.map(ns =>
        TLPBackend.post(`/teachers/add-site/${teacherId}`, { siteId: Number(ns.siteId) }),
      ),
    );
    await Promise.all(
      removedSites.map(rs =>
        TLPBackend.delete(`/teachers/remove-site/${teacherId}`, {
          data: { siteId: Number(rs.siteId) },
        }),
      ),
    );
  };

  // TODO: Get undo functionality working for MT edits
  const undoChanges = async () => {
    try {
      const { firstName, lastName, phoneNumber, email, notes } = initialTeacherData;
      await TLPBackend.put(`/teachers/${teacherId}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        notes: notes ?? '',
        active: initialTeacherData.active.toLowerCase(),
      });
      setTeacherData({ firstName, lastName, email, phoneNumber, notes: notes ?? '' });
      setErrorMessage('');
      setShowEditMasterTeacherAlert(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const schema = yup
    .object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      phoneNumber: yup.string().required('Phone number is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const onSubmit = async data => {
    try {
      console.log(data);
      await assignSites(initialTeacherData.siteList, sites);
      await updateMasterTeacherData(data);
      closeModal();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const getMasterTeacherData = async () => {
    const res = await TLPBackend.get(`/teachers/all/${teacherId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { firstName, lastName, phoneNumber, email, notes, active } = res.data[0];
    setInitialTeacherData({
      firstName,
      lastName,
      phoneNumber,
      email,
      active,
      notes: notes ?? '',
      siteList: res.data[0].sites ?? [],
    });
    setTeacherData({ firstName, lastName, phoneNumber, email, notes: notes ?? '' });
    setSites(res.data[0].sites ?? []);
    // setStatus(active);
    reset({ firstName, lastName, email, phoneNumber, notes });
  };

  const getSitesWithoutMT = async () => {
    const res = await TLPBackend.get(`/sites/no-master-teacher`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setPossibleSites(res.data);
  };

  const deleteMasterTeacher = async () => {
    try {
      await TLPBackend.delete(`/teachers/${teacherId}`);
      reloadPage();
      setIsOpen(false);
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
  };

  useEffect(async () => {
    if (!isOpen) return;

    try {
      await getMasterTeacherData();
      await getSitesWithoutMT();
    } catch (err) {
      setErrorMessage(err);
    }
  }, [isOpen]);

  return (
    <>
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        name={teacherName}
        body="teacher"
        deleteFunc={deleteMasterTeacher}
      />
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Teacher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="first-name" className={styles.fNameField}>
                <h3 className={styles.requiredSubtitles}>First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  key={initialTeacherData.firstName}
                  defaultValue={initialTeacherData.firstName}
                  className={`form-control ${errors.firstName ? `is-invalid` : ''}`}
                  {...register('firstName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.firstName?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
              <label htmlFor="last-name" className={styles.lNameField}>
                <h3 className={styles.requiredSubtitles}>Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  key={initialTeacherData.lastName}
                  defaultValue={initialTeacherData.lastName}
                  className={`form-control ${errors.lastName ? `is-invalid` : ''}`}
                  {...register('lastName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.lastName?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="email" className={styles.emailField}>
                <h3 className={styles.requiredSubtitles}>Email</h3>
                <input
                  disabled
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={initialTeacherData.email}
                  className="form-control"
                />
              </label>
              <div>
                <label htmlFor="phone-number" className={styles.phoneNumField}>
                  <h3 className={styles.requiredSubtitles}>Phone Number</h3>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    key={initialTeacherData.phoneNumber}
                    defaultValue={initialTeacherData.phoneNumber}
                    className={`form-control ${errors.phoneNumber ? `is-invalid` : ''}`}
                    {...register('phoneNumber')}
                  />
                </label>
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.phoneNumber?.message ?? <>{'\u00A0'}</>}
                </div>
              </div>
              {/* <label htmlFor="active" className={styles.emailField}>
                <h3 className={styles.requiredSubtitles}>Status</h3>
                <select
                  name="active"
                  className="form-control"
                  onChange={e => setStatus(e.target.value)}
                >
                  <option selected={status === 'active'} value="active">
                    Active
                  </option>
                  <option selected={status === 'inactive'} value="inactive">
                    Inactive
                  </option>
                </select>
                {status === 'inactive' ? (
                  <Form.Label id={styles['status-inactive-text']}>
                    *** If a teacher is made inactive, their assigned sites will be removed from
                    them.
                  </Form.Label>
                ) : null}
              </label> */}
              <Form.Group className="mb-3" controlId="editTeacherAccount.assignSite">
                <Form.Label>Assign Site(s)</Form.Label>
                <div>
                  {sites?.map(site => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Badge bg="secondary" className={styles['site-badge']}>
                        <BsX
                          cursor="pointer"
                          name={site.siteName}
                          onClick={() => {
                            removeSite(site.siteId);
                          }}
                        />
                        {site.siteName}
                      </Badge>
                    );
                  })}
                </div>
                <Form.Select
                  onChange={({ target }) => {
                    if (target.value !== 'Select Site...' && !sites?.includes(target.value)) {
                      setSites([
                        ...(sites ?? []),
                        possibleSites.find(site => site.siteId === Number(target.value)),
                      ]);
                      setPossibleSites(
                        possibleSites.filter(site => site.siteId !== Number(target.value)),
                      );
                    }
                  }}
                >
                  <option>Select Site...</option>
                  {possibleSites?.map(site => (
                    <option key={site.siteId} value={site.siteId}>
                      {site.siteName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <label htmlFor="notes" className={styles.notesField}>
                <h3 className={styles.optionalSubtitles}>Notes</h3>
                <textarea
                  type="text"
                  name="notes"
                  key={teacherData.notes}
                  defaultValue={teacherData.notes}
                  className={`form-control ${errors.notes ? `is-invalid` : ''} ${
                    styles.notesInput
                  }`}
                  {...register('notes')}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className={styles.button} onClick={openWarningModal}>
              Delete
            </Button>
            <Button variant="primary" className={styles.button} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {showEditMasterTeacherAlert ? (
        <Alert variant="primary" className={styles['alert-custom']}>
          {`Updated ${teacherData.firstName} ${teacherData.lastName}'s information.`}{' '}
          <span
            aria-hidden
            className={`alert-link-custom underline ${styles.undoChanges}`}
            onClick={undoChanges}
          >
            UNDO
          </span>
          <CloseButton
            className={styles['alert-close-btn']}
            onClick={() => setShowEditMasterTeacherAlert(false)}
          />
        </Alert>
      ) : null}
    </>
  );
};

EditMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  teacherId: PropTypes.number.isRequired,
};

export default EditMasterTeacherModal;
