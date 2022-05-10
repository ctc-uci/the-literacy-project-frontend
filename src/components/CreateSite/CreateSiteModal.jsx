import { React } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './CreateSiteModal.module.css';
import { TLPBackend } from '../../common/utils';
import '../../common/vars.css';

const CreateSiteModal = ({ areaId }) => {
  // Regex for phone number validation in 1234567890 format
  const phoneNumberReg = /^[0-9]{3}[0-9]{3}[0-9]{4}$/;

  const schema = yup
    .object()
    .shape(
      {
        siteName: yup.string().required('Please enter a site name.'),
        addressStreet: yup.string().required('Address street is required.'),
        addressApt: yup.string(),
        addressCity: yup.string().required('City is required.'),
        addressZip: yup
          .number()
          .required('Zip code is required.')
          .typeError('Zip code must be a number.'),
        primaryFirstName: yup.string().required('First name is required.'),
        primaryLastName: yup.string().required('Last name is required.'),
        primaryTitle: yup.string(),
        primaryEmail: yup
          .string()
          .email('Email must be a valid email address')
          .required('Email is required.'),
        primaryPhone: yup
          .string()
          .required('Phone number is required.')
          .matches(phoneNumberReg, 'Phone number is not valid.'),
        secondaryFirstName: yup.string(),
        secondaryLastName: yup.string(),
        secondaryTitle: yup.string(),
        secondaryEmail: yup.string().email('Email must be a valid email address'),
        secondaryPhone: yup.string().when('secondaryPhone', {
          is: number => typeof number !== 'undefined' && number.length !== 0,
          then: yup.string().matches(phoneNumberReg, 'Phone number is not valid.'),
          otherwise: yup.string(),
        }),
        notes: yup.string(),
      },
      [['secondaryPhone', 'secondaryPhone']],
    )
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const cancel = () => {
    window.location.replace(`/area/${areaId}`);
  };

  const onSubmit = async data => {
    const formData = {
      siteName: data.siteName,
      addressStreet: data.addressStreet,
      addressApt: data.addressApt,
      addressCity: data.addressCity,
      addressZip: data.addressZip,
      areaId,
      active: true,
      notes: data.notes,
      primaryContactInfo: {
        firstName: data.primaryFirstName,
        lastName: data.primaryLastName,
        title: data.primaryTitle,
        email: data.primaryEmail,
        phone: data.primaryPhone,
      },
    };

    // Adding secondary contact info, if present
    if (data.secondaryFirstName) {
      formData.secondContactInfo = {
        firstName: data.secondaryFirstName,
        lastName: data.secondaryLastName,
        title: data.secondaryTitle,
        email: data.secondaryEmail,
        phone: data.secondaryPhone,
      };
    }

    // send form data to server
    await TLPBackend.post('/sites', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Send the user back to all sites; TODO add success status notif
    window.location.replace(`/area/${areaId}`);
  };

  return (
    <Container>
      <Col md={{ span: 8, offset: 2 }}>
        <form className={`form-group ${styles['site-form']}`} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form-wrapper']}>
            <div className={styles['form-header']}>
              <h2 className={styles['form-title']}>CREATE NEW SITE</h2>
            </div>
            <h3 className={styles['required-subtitles']}>Basic Information</h3>
            <div className={styles['input-area']}>
              <Col md={5}>
                <label className={styles.label} htmlFor="site-name">
                  Name<span style={{ color: '#e32' }}>*</span>
                  <input
                    style={{ width: '255px' }}
                    type="text"
                    className={`form-control ${errors.siteName ? `is-invalid` : ''}`}
                    name="siteName"
                    placeholder="i.e. Lakeview Middle School"
                    {...register('siteName')}
                  />
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.siteName?.message ?? <>{'\u00A0'}</>}
                  </div>
                </label>
                <label className={styles.label} htmlFor="address-street">
                  Street Address<span style={{ color: '#e32' }}>*</span>
                  <input
                    style={{ width: '255px' }}
                    type="text"
                    className={`form-control ${styles['page-inputs']}
                              ${errors.addressStreet ? `is-invalid` : ''}`}
                    name="addressStreet"
                    placeholder="ie 123 Playa Dr"
                    {...register('addressStreet')}
                  />
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.addressStreet?.message ?? <>{'\u00A0'}</>}
                  </div>
                </label>
                <label className={styles.label} htmlFor="apt-suite-etc">
                  Apt, suite, etc
                  <input
                    style={{ width: '255px' }}
                    type="text"
                    className="form-control"
                    name="addressApt"
                    placeholder="Apt 208"
                    {...register('addressApt')}
                  />
                </label>
                <div className={styles['input-fields-coalesce-wrapper']}>
                  <label className={styles.label} htmlFor="address-city">
                    City<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="text"
                      className={`form-control ${styles['addr-small-field']}
                                ${errors.addressCity ? `is-invalid` : ''}`}
                      name="addressCity"
                      placeholder="Irvine"
                      {...register('addressCity')}
                    />
                    <div className={`text-danger ${styles['err-msg']}`}>
                      {errors.addressCity?.message ?? <>{'\u00A0'}</>}
                    </div>
                  </label>
                  <label style={{ padding: 10 }} htmlFor="address-zip">
                    Zip Code<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="number"
                      onInput={e => {
                        if (e.target.value.length > 9) {
                          e.target.value = e.target.value.slice(0, 9);
                        }
                      }}
                      maxLength={9}
                      className={`form-control ${styles['addr-small-field']}
                                ${errors.addressZip ? `is-invalid` : ''}`}
                      name="address-zip"
                      placeholder="ie 92614"
                      {...register('addressZip')}
                    />
                    <div className={`text-danger ${styles['err-msg']}`}>
                      {errors.addressZip?.message ?? <>{'\u00A0'}</>}
                    </div>
                  </label>
                </div>
              </Col>
            </div>
            <h3 className={styles['required-subtitles']}>Primary Contact</h3>
            <div className={styles['input-area']}>
              <Row>
                <Col lg={3}>
                  <label className={styles.label} htmlFor="primary-name">
                    First Name<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="text"
                      className={`form-control ${errors.primaryFirstName ? `is-invalid` : ''}`}
                      name="primaryName"
                      placeholder="First Name"
                      {...register('primaryFirstName')}
                    />
                    <div className={`text-danger ${styles['err-msg']}`}>
                      {errors.primaryFirstName?.message ?? <>{'\u00A0'}</>}
                    </div>
                  </label>
                </Col>
                <Col lg={3}>
                  <label className={styles.label} htmlFor="primary-name">
                    Last Name<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="text"
                      className={`form-control ${errors.primaryLastName ? `is-invalid` : ''}`}
                      name="primaryName"
                      placeholder="Last Name"
                      {...register('primaryLastName')}
                    />
                    <div className={`text-danger ${styles['err-msg']}`}>
                      {errors.primaryLastName?.message ?? <>{'\u00A0'}</>}
                    </div>
                  </label>
                </Col>
                <Col lg={5}>
                  <label className={styles.label} htmlFor="primary-title">
                    Title
                    <input
                      style={{ width: '255px' }}
                      type="text"
                      className="form-control"
                      name="primaryTitle"
                      placeholder="i.e. Principal, Sir"
                      {...register('primaryTitle')}
                    />
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label className={styles.label} htmlFor="primary-email">
                  Email<span style={{ color: '#e32' }}>*</span>
                  <input
                    style={{ width: '255px' }}
                    type="email"
                    className={`form-control ${errors.primaryEmail ? `is-invalid` : ''}`}
                    name="primaryEmail"
                    placeholder="email@gmail.com"
                    {...register('primaryEmail')}
                  />
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.primaryEmail?.message ?? <>{'\u00A0'}</>}
                  </div>
                </label>
                <label className={styles.label} htmlFor="primary-phone">
                  Phone Number<span style={{ color: '#e32' }}>*</span>
                  <input
                    style={{ width: '255px' }}
                    type="number"
                    // Phone #s are <= 10 digits
                    onInput={e => {
                      if (e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10);
                      }
                    }}
                    maxLength={10}
                    className={`form-control ${errors.primaryPhone ? `is-invalid` : ''}`}
                    name="primaryPhone"
                    placeholder="1233332410"
                    {...register('primaryPhone')}
                  />
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.primaryPhone?.message ?? <>{'\u00A0'}</>}
                  </div>
                </label>
              </Col>
            </div>
            <h3 className={styles['optional-subtitles']}>Secondary Contact</h3>
            <div className={styles['input-area']}>
              <Row>
                <Col lg={3}>
                  <label className={styles.label} htmlFor="secondary-name">
                    First Name
                    <input
                      type="text"
                      className="form-control"
                      name="secondaryFirstName"
                      placeholder="First Name"
                      {...register('secondaryFirstName')}
                    />
                  </label>
                </Col>
                <Col lg={3}>
                  <label className={styles.label} htmlFor="secondary-name">
                    Last Name
                    <input
                      type="text"
                      className="form-control"
                      name="secondaryLastName"
                      placeholder="Last Name"
                      {...register('secondaryLastName')}
                    />
                  </label>
                </Col>
                <Col lg={5}>
                  <label className={styles.label} htmlFor="secondary-title">
                    Title
                    <input
                      style={{ width: '255px' }}
                      type="text"
                      className="form-control"
                      name="secondaryTitle"
                      placeholder="i.e. Principal, Sir"
                      {...register('secondaryTitle')}
                    />
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label className={styles.label} htmlFor="secondary-email">
                  Email
                  <input
                    style={{ width: '255px' }}
                    type="email"
                    className={`form-control ${errors.secondaryEmail ? `is-invalid` : ''}`}
                    name="secondaryEmail"
                    placeholder="email@gmail.com"
                    {...register('secondaryEmail')}
                  />
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.secondaryEmail?.message ?? <>{'\u00A0'}</>}
                  </div>
                </label>
                <label className={styles.label} htmlFor="secondary-phone">
                  Phone Number
                  <input
                    style={{ width: '255px' }}
                    className={`form-control ${errors.secondaryPhone ? `is-invalid` : ''}`}
                    type="number"
                    // Phone #s are <= 10 digits
                    onInput={e => {
                      if (e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10);
                      }
                    }}
                    name="secondaryPhone"
                    placeholder="1233332401"
                    {...register('secondaryPhone')}
                  />
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.secondaryPhone?.message ?? <>{'\u00A0'}</>}
                  </div>
                </label>
              </Col>
            </div>
            <h3 className={styles['optional-subtitles']}>Notes</h3>
            <Col>
              <label htmlFor="notes" className={`${styles['input-area']} ${styles.label}`}>
                <textarea
                  style={{ width: '700px' }}
                  className="form-control"
                  placeholder="Notes"
                  name="notes"
                  {...register('notes')}
                />
              </label>
            </Col>
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: '#3288c4',
                color: 'var(--text-color-white)',
                width: '160px',
                margin: '60px 0px 30px 70px',
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancel}
              className={`btn ${styles['cancel-btn']}`}
              style={{
                backgroundColor: '#5f758d',
                color: 'var(--text-color-white)',
                width: '160px',
                margin: '60px 0px 30px 70px',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Col>
    </Container>
  );
};

CreateSiteModal.propTypes = {
  areaId: PropTypes.number.isRequired,
};

export default CreateSiteModal;
