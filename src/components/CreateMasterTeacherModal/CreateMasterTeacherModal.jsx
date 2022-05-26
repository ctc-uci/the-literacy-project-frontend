import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './CreateMasterTeacherModal.module.css';
import ConfirmMasterTeacherModal from '../ConfirmMasterTeacherModal/ConfirmMasterTeacherModal';
import InformationPopover from '../Popover/InformationPopover';
import { passwordRulesTooltipText, passwordRegExp, TLPBackend } from '../../common/utils';
// import { reloadPage } from '../../common/utils';

const CreateMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  const [confirmModalIsOpen, setConfirmModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [sites, setSites] = useState([]);
  const [possibleSites, setPossibleSites] = useState([]);
  // const [teacherData, setTeacherData] = useState({
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   sites: [],
  // });
  const [passwordShown, setPasswordShown] = useState(false);
  const [reenterPasswordShown, setReenterPasswordShown] = useState(false);
  const [notes, setNotes] = useState('');

  // add site back to list of possible sites and remove from selected sites
  const removeSite = siteId => {
    setPossibleSites([...(possibleSites ?? []), sites.find(site => site.siteId === siteId)]);
    setSites(sites.filter(site => site.siteId !== siteId));
  };

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Email must be a valid email address')
        .required('Email is required'),
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      password: yup
        .string()
        .required('Password is required')
        .matches(passwordRegExp, 'Password does not meet requirements'),
      reenterPassword: yup
        .string()
        .required('Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords do not match'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const closeModal = () => {
    // clear all fields and clear any error messages
    reset({ firstName: '', lastName: '', email: '', password: '', reenterPassword: '' });
    setErrorMessage('');
    setSites([]);
    setIsOpen(false);
  };

  const sendEmailSuccessSequence = () => {
    closeModal();
    setConfirmModalOpen(true);
  };

  // get all possible site options
  const getSitesWithoutMT = async () => {
    const res = await TLPBackend.get(`/sites/no-master-teacher`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setPossibleSites(res.data);
  };

  const onSubmit = async data => {
    setErrorMessage('');
    try {
      const { firstName, lastName, email, password } = data;
      const siteIds = sites.map(s => s.siteId);
      await TLPBackend.post('/teachers', {
        firstName,
        lastName,
        email,
        password,
        notes,
        siteIds,
      });
      sendEmailSuccessSequence();
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  useEffect(async () => {
    if (!isOpen) return;

    try {
      await getSitesWithoutMT();
    } catch (err) {
      setErrorMessage(err);
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Teacher Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <label htmlFor="first-name" className={styles.fNameField}>
                <h3 className={styles.requiredSubtitles}>First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
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
                  placeholder="Last Name"
                  className={`form-control ${errors.lastName ? `is-invalid` : ''}`}
                  {...register('lastName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.lastName?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
              <label htmlFor="email" className={styles.fullInputField}>
                <h3 className={styles.requiredSubtitles}>Email</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${errors.email ? `is-invalid` : ''}`}
                  {...register('email')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.email?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
              {/* <label htmlFor="phone-number" className={styles.fullInputField}>
                <h3 className={styles.requiredSubtitles}>Phone Number</h3>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`form-control ${errors.phoneNumber ? `is-invalid` : ''}`}
                  {...register('phoneNumber')}
                />
              </label>
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.phoneNumber?.message ?? <>{'\u00A0'}</>}
              </div> */}

              <label htmlFor="password" className={styles.fullInputField}>
                <h3 className={styles.requiredSubtitles}>
                  Password{' '}
                  <span className={styles['password-popover']}>
                    <InformationPopover
                      bodyText={passwordRulesTooltipText}
                      header="Password Rules"
                    />
                  </span>
                </h3>
                <div className={styles['password-input']}>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={`form-control ${styles['input-custom']} ${
                      errors.password ? `is-invalid` : ''
                    }`}
                    {...register('password')}
                  />
                  <FaEye
                    className={styles['eye-icon']}
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                </div>
              </label>
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.password?.message ?? <>{'\u00A0'}</>}
              </div>

              <label htmlFor="reenter-password" className={styles.fullInputField}>
                <h3 className={styles.requiredSubtitles}>Re-enter Password</h3>
                <div className={styles['password-input']}>
                  <input
                    type={reenterPasswordShown ? 'text' : 'password'}
                    name="reenter-password"
                    placeholder="Password"
                    className={`form-control ${styles['input-custom']} ${
                      errors.password ? `is-invalid` : ''
                    }`}
                    {...register('reenterPassword')}
                  />
                  <FaEye
                    className={styles['eye-icon']}
                    onClick={() => setReenterPasswordShown(!reenterPasswordShown)}
                  />
                </div>
              </label>
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.reenterPassword?.message ?? <>{'\u00A0'}</>}
              </div>

              <Form.Group className="mb-3" controlId="createTeacherAccount.assignSite">
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

              <label htmlFor="notes" className={styles.fullInputField}>
                <h3 className={styles.subtitles}>Notes</h3>
                <input
                  type="text"
                  name="notes"
                  placeholder="Enter some notes here"
                  className="form-control"
                  onChange={e => setNotes(e.target.value)}
                />
              </label>
            </div>
          </Modal.Body>

          <Modal.Footer className={styles.footer}>
            {errorMessage && <p>{errorMessage}</p>}
            <Button
              style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}
              onClick={closeModal}
              className={styles.button}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} className={styles.button}>
              Create Account
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {confirmModalIsOpen ? (
        <ConfirmMasterTeacherModal isOpen={confirmModalIsOpen} setIsOpen={setConfirmModalOpen} />
      ) : null}
    </>
  );
};

CreateMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateMasterTeacherModal;
