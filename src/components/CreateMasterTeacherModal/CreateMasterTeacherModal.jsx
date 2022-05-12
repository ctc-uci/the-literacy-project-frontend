import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './CreateMasterTeacherModal.module.css';
import ConfirmMasterTeacherModal from '../ConfirmMasterTeacherModal/ConfirmMasterTeacherModal';
// import { AUTH_ROLES } from '../../common/config';
// import { sendInviteLink } from '../../common/auth/auth_utils';
// import { reloadPage } from '../../common/utils';

const CreateMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  const [confirmModalIsOpen, setConfirmModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [sites, setSites] = useState([]);
  // const [teacherData, setTeacherData] = useState({
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   sites: [],
  // });

  const removeSite = e => {
    const name = e.target.getAttribute('name');
    // setTeacherData({ ...teacherData, sites: sites.filter(siteName => siteName !== name) });
    setSites(sites.filter(siteName => siteName !== name));
  };

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Email must be a valid email address')
        .required('Email is required'),
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      phoneNumber: yup.string().required('Phone number is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const closeModal = () => setIsOpen(false);

  // const sendEmailSuccessSequence = () => {
  //   setIsOpen(false);
  //   setConfirmModalOpen(true);
  // };

  // TODO FINISH ONSUBMIT
  const onSubmit = data => {
    try {
      console.log(data);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // const handleSubmit = async e => {
  //   try {
  //     e.preventDefault();
  //     await sendInviteLink(AUTH_ROLES.USER_ROLE, email, firstName, lastName, phoneNumber);
  //     setErrorMessage('');
  //     setEmail('');
  //     sendEmailSuccessSequence();
  //     reloadPage();
  //   } catch (err) {
  //     setErrorMessage(err.message);
  //   }
  // };

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
              <label htmlFor="email" className={styles.emailField}>
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
              <div>
                <label htmlFor="phone-number" className={styles.phoneNumField}>
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
                </div>
              </div>
              <Form.Group className="mb-3" controlId="createTeacherAccount.assignSite">
                <Form.Label>Assign Site(s)</Form.Label>
                <div>
                  {sites.map(site => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Badge bg="secondary" className={styles['site-badge']}>
                        <BsX cursor="pointer" name={site} onClick={removeSite} /> {site}
                      </Badge>
                    );
                  })}
                </div>
                <Form.Select
                  onChange={({ target }) => {
                    if (target.value !== 'No School Selected' && !sites.includes(target.value)) {
                      setSites([...sites, target.value]);
                    }
                  }}
                >
                  <option>No School Selected</option>
                  <option value="School One">School One</option>
                  <option value="School Two">School Two</option>
                  <option value="School Three">School Three</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit(onSubmit)}>
              Send Email
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
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
