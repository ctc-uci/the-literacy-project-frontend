import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import states from 'states-us';
import styles from './ViewEditSite.module.css';
import WarningModal from '../WarningModal/WarningModal';
import { TLPBackend } from '../../common/utils';
import CSVButton from '../CSVButton/CSVButton';
import '../../common/vars.css';

const s = states.filter(x => !x.territory);
const abbrev = s.map(x => x.name);
// remove district of columbia
abbrev.splice(8, 1);
const options = abbrev.map(x => ({ label: x, value: x }));

// Regex for phone number validation in 1234567890 format
const phoneNumberReg = /^[0-9]{10}$/;
// Regex for zip code validation in 00000 format
const zipCodeReg = /^[0-9]{5}$/;

const schema = yup
  .object()
  .shape(
    {
      siteName: yup.string().required('Please enter a site name.'),
      addressStreet: yup.string().required('Address street is required.'),
      addressApt: yup.string(),
      addressCity: yup.string().required('City is required.'),
      addressState: yup.string(),
      addressZip: yup
        .string()
        .required('Zip code is required.')
        .matches(zipCodeReg, 'Zip Code is not valid.'),
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

const ViewSite = ({ siteId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const [siteInfo, setSiteInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [secondName, setSecondName] = useState('');
  const [abbrevState, setAbbrevState] = useState('');
  const [warningOpen, setWarningOpen] = useState(false);

  const [apt, setApt] = useState('');

  const deleteSite = async () => {
    await TLPBackend.delete(`/sites/${siteId}`);
    window.location.replace(`/area/${siteInfo.areaId}`);
  };

  const changeEdit = () => {
    setEdit(!edit);
  };

  const openWarningModal = () => {
    setWarningOpen(!warningOpen);
  };

  const getSiteInfo = async () => {
    const res = await TLPBackend.get(`/sites/${siteId}`);
    setSiteInfo(res.data);
    setAbbrevState(s.filter(x => x.name === res.data.addressState)[0].abbreviation);
    if (res.data.addressApt != null) {
      setApt(` ${res.data.addressApt}`);
    }
    if (res.data.secondContactInfo.firstName != null) {
      setSecondName(
        `${res.data.secondContactInfo.firstName} ${res.data.secondContactInfo.lastName}`,
      );
    }
  };

  useEffect(async () => {
    getSiteInfo();
  }, [siteInfo]);

  const onSubmit = async data => {
    const formData = {
      siteName: data.siteName,
      addressStreet: data.addressStreet,
      addressApt: data.addressApt,
      addressCity: data.addressCity,
      addressState: siteInfo.addressState,
      addressZip: data.addressZip,
      areaId: siteInfo.areaId,
      active: data.active === 'true',
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
    await TLPBackend.put(`/sites/${siteId}`, formData);
    changeEdit();
  };

  if (edit) {
    return (
      <div>
        <WarningModal
          isOpen={warningOpen}
          setIsOpen={setWarningOpen}
          body="site"
          name={siteInfo.siteName}
          deleteFunc={deleteSite}
        />
        <p className={styles.routing}>
          <Link to="/" className={styles.link}>
            Areas{' '}
          </Link>
          / {/* filler for now */}
          <Link to={`/area/${siteInfo.areaId}`} className={styles.link}>
            {siteInfo.areaName}{' '}
          </Link>
          / {siteInfo.siteName}
        </p>
        <Container>
          <Col md={{ span: 8, offset: 2 }}>
            <form className={`form-group ${styles['site-form']}`} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles['form-wrapper']}>
                <div className={styles['form-header']}>
                  <h2 className={styles['form-title']}>{siteInfo.siteName}</h2>
                </div>
                <div className={styles['title-csv']}>
                  <h3 className={styles['optional-subtitles']}>Site Status</h3>
                </div>
                <div className={styles['input-area']}>
                  <Col md={5}>
                    <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                    <select
                      className={`form-control ${styles.status}`}
                      {...register('active')}
                      defaultValue={siteInfo.active ? 'Active' : 'Inactive'}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </Col>
                </div>
                <h3 className={styles['optional-subtitles']}>Basic Information</h3>
                <div className={styles['input-area']}>
                  <Col md={5}>
                    <label htmlFor="site-name">
                      Name<span style={{ color: '#e32' }}>*</span>
                      <input
                        type="text"
                        className={`form-control ${styles['page-inputs']}
                                  ${errors.siteName ? `is-invalid` : ''}`}
                        name="siteName"
                        defaultValue={siteInfo.siteName}
                        {...register('siteName')}
                      />
                      <div className={`text-danger ${styles['err-msg']}`}>
                        {errors.siteName?.message ?? <>{'\u00A0'}</>}
                      </div>
                    </label>
                    <label htmlFor="address-street">
                      Address Line<span style={{ color: '#e32' }}>*</span>
                      <input
                        type="text"
                        className={`form-control ${styles['page-inputs']}
                                  ${errors.addressStreet ? `is-invalid` : ''}`}
                        name="addressStreet"
                        defaultValue={siteInfo.addressStreet}
                        {...register('addressStreet')}
                      />
                      <div className={`text-danger ${styles['err-msg']}`}>
                        {errors.addressStreet?.message ?? <>{'\u00A0'}</>}
                      </div>
                    </label>
                    <label htmlFor="apt-suite-etc" style={{ 'padding-bottom': '20px' }}>
                      Apt, suite, etc
                      <input
                        type="text"
                        className={`form-control ${styles['page-inputs']}`}
                        name="addressApt"
                        placeholder="Apt 208"
                        defaultValue={siteInfo.addressApt}
                        {...register('addressApt')}
                      />
                    </label>
                    <div className={styles['input-fields-coalesce-wrapper']}>
                      <label htmlFor="address-city">
                        City<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="text"
                          className={`form-control ${styles['addr-small-field']}
                                    ${errors.addressCity ? `is-invalid` : ''}`}
                          name="addressCity"
                          defaultValue={siteInfo.addressCity}
                          {...register('addressCity')}
                        />
                        <div className={`text-danger ${styles['err-msg']}`}>
                          {errors.addressCity?.message ?? <>{'\u00A0'}</>}
                        </div>
                      </label>
                      <label aria-label="address-state" htmlFor="address-state">
                        <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                        State
                        <select
                          disabled="true"
                          className="form-control"
                          defaultValue={siteInfo.addressState}
                        >
                          {options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label htmlFor="address-zip">
                        ZIP Code<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="number"
                          // ZIP Codes are <= 9 digits
                          onInput={e => {
                            if (e.target.value.length > 5) {
                              e.target.value = e.target.value.slice(0, 5);
                            }
                          }}
                          maxLength={9}
                          className={`form-control ${styles['addr-small-field']}
                                    ${errors.addressZip ? `is-invalid` : ''}`}
                          name="address-zip"
                          defaultValue={siteInfo.addressZip}
                          {...register('addressZip')}
                        />
                        <div className={`text-danger ${styles['err-msg']}`}>
                          {errors.addressZip?.message ?? <>{'\u00A0'}</>}
                        </div>
                      </label>
                    </div>
                  </Col>
                </div>
                <h3 className={styles['optional-subtitles']}>Primary Contact</h3>
                <div className={styles['input-area']}>
                  <Row>
                    <Col lg={3}>
                      <label htmlFor="primary-name">
                        First Name<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="text"
                          className={`form-control ${errors.primaryFirstName ? `is-invalid` : ''}`}
                          name="primaryName"
                          placeholder="First Name"
                          defaultValue={siteInfo.primaryContactInfo.firstName}
                          {...register('primaryFirstName')}
                        />
                        <div className={`text-danger ${styles['err-msg']}`}>
                          {errors.primaryFirstName?.message ?? <>{'\u00A0'}</>}
                        </div>
                      </label>
                    </Col>
                    <Col lg={3}>
                      <label htmlFor="primary-name">
                        Last Name<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="text"
                          className={`form-control ${errors.primaryLastName ? `is-invalid` : ''}`}
                          name="primaryName"
                          placeholder="Last Name"
                          defaultValue={siteInfo.primaryContactInfo.lastName}
                          {...register('primaryLastName')}
                        />
                      </label>
                      <div className={`text-danger ${styles['err-msg']}`}>
                        {errors.primaryLastName?.message ?? <>{'\u00A0'}</>}
                      </div>
                    </Col>
                    <Col lg={5}>
                      <label htmlFor="primary-title">
                        Title
                        <input
                          type="text"
                          className={`form-control ${styles['page-inputs']}`}
                          name="primaryTitle"
                          defaultValue={siteInfo.primaryContactInfo.title}
                          placeholder="i.e. Principal, Sir"
                          {...register('primaryTitle')}
                        />
                      </label>
                    </Col>
                  </Row>
                  <Col md={5}>
                    <label htmlFor="primary-email">
                      Email<span style={{ color: '#e32' }}>*</span>
                      <input
                        type="text"
                        className={`form-control ${styles['page-inputs']}
                                  ${errors.primaryEmail ? `is-invalid` : ''}`}
                        name="primaryEmail"
                        defaultValue={siteInfo.primaryContactInfo.email}
                        {...register('primaryEmail')}
                      />
                      <div className={`text-danger ${styles['err-msg']}`}>
                        {errors.primaryEmail?.message ?? <>{'\u00A0'}</>}
                      </div>
                    </label>
                    <label htmlFor="primary-phone">
                      Phone Number<span style={{ color: '#e32' }}>*</span>
                      <input
                        type="number"
                        // Phone #s are <= 10 digits
                        onInput={e => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        maxLength={10}
                        className={`form-control ${styles['page-inputs']}
                                  ${errors.primaryPhone ? `is-invalid` : ''}`}
                        name="primaryPhone"
                        placeholder="(123)1231234"
                        defaultValue={siteInfo.primaryContactInfo.phone}
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
                  <Row style={{ 'padding-bottom': '20px' }}>
                    <Col lg={3}>
                      <label htmlFor="secondary-name">
                        First Name
                        <input
                          type="text"
                          className="form-control"
                          name="secondaryFirstName"
                          placeholder="First Name"
                          defaultValue={siteInfo.secondContactInfo.firstName}
                          {...register('secondaryFirstName')}
                        />
                      </label>
                    </Col>
                    <Col lg={3}>
                      <label htmlFor="secondary-name">
                        Last Name
                        <input
                          type="text"
                          className="form-control"
                          name="secondaryLastName"
                          placeholder="Last Name"
                          defaultValue={siteInfo.secondContactInfo.lastName}
                          {...register('secondaryLastName')}
                        />
                      </label>
                    </Col>
                    <Col lg={5}>
                      <label htmlFor="secondary-title">
                        Title
                        <input
                          type="text"
                          className={`form-control ${styles['page-inputs']}`}
                          name="secondaryTitle"
                          placeholder="i.e. Principal, Sir"
                          defaultValue={siteInfo.secondContactInfo.title}
                          {...register('secondaryTitle')}
                        />
                      </label>
                    </Col>
                  </Row>
                  <Col md={5}>
                    <label htmlFor="secondary-email">
                      Email
                      <input
                        type="text"
                        className={`form-control ${styles['page-inputs']}
                                  ${errors.secondaryEmail ? `is-invalid` : ''}`}
                        name="secondaryEmail"
                        defaultValue={siteInfo.secondContactInfo.email}
                        placeholder="email@gmail.com"
                        {...register('secondaryEmail')}
                      />
                      <div className={`text-danger ${styles['err-msg']}`}>
                        {errors.secondaryEmail?.message ?? <>{'\u00A0'}</>}
                      </div>
                    </label>
                    <label htmlFor="secondary-phone">
                      Phone Number
                      <input
                        className={`form-control ${styles['page-inputs']}
                                  ${errors.secondaryPhone ? `is-invalid` : ''}`}
                        type="number"
                        // Phone #s are <= 10 digits
                        onInput={e => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        name="secondaryPhone"
                        placeholder="(123)1231234"
                        defaultValue={siteInfo.secondContactInfo.phone}
                        {...register('secondaryPhone')}
                      />
                      <div className={`text-danger ${styles['err-msg']}`}>
                        {errors.secondaryPhone?.message ?? <>{'\u00A0'}</>}
                      </div>
                    </label>
                  </Col>
                </div>
                <Col>
                  <h3 className={styles['optional-subtitles']}>Notes</h3>
                  <label htmlFor="notes" className={styles['input-area']}>
                    <textarea
                      className={`form-control ${styles.notes}`}
                      defaultValue={siteInfo.notes}
                      name="notes"
                      {...register('notes')}
                    />
                  </label>
                </Col>
                <button type="submit" className={`btn ${styles['save-btn']}`}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={openWarningModal}
                  className={`btn ${styles['delete-btn']}`}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={changeEdit}
                  className={`btn ${styles['cancel-btn']}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Col>
        </Container>
      </div>
    );
  }
  return (
    <div>
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        body="site"
        name={siteInfo.siteName}
        deleteFunc={deleteSite}
      />
      <p className={styles.routing}>
        <Link to="/" className={styles.link}>
          Areas{' '}
        </Link>
        / {/* filler for now */}
        <Link to={`/area/${siteInfo.areaId}`} className={styles.link}>
          {siteInfo.areaName}{' '}
        </Link>
        / {siteInfo.siteName}
      </p>
      <Container>
        <Col md={{ span: 8, offset: 2 }}>
          <div className={styles['form-wrapper']}>
            <div className={styles['form-header']}>
              <h2 className={styles['form-title']}>{siteInfo.siteName}</h2>
            </div>
            <div className={styles['title-csv']}>
              <h3 className={styles['optional-subtitles']}>Site Status</h3>
              <CSVButton type="site" siteId={Number.parseInt(siteId, 10)} />
            </div>
            <div className={styles['input-area']}>
              <Col md={5}>
                <p>
                  {siteInfo.active ? (
                    <span style={{ color: '#28A745' }}>Active</span>
                  ) : (
                    <span style={{ color: '#E53E3E' }}>Inactive</span>
                  )}
                </p>
              </Col>
            </div>

            <h3 className={styles['optional-subtitles']}>Basic Information</h3>
            <div className={styles['input-area']}>
              <Col md={5}>
                <label htmlFor="site-name">
                  <b>Name</b>
                  <p className={styles.text}>{siteInfo.siteName}</p>
                </label>
              </Col>
              <Col md={5}>
                <label htmlFor="address-street">
                  <b>Address</b>
                  <p className={styles.text}>
                    {`${siteInfo.addressStreet}${apt}, ${siteInfo.addressCity}, ${abbrevState}, ${siteInfo.addressZip}`}
                  </p>
                </label>
              </Col>
            </div>

            <h3 className={styles['optional-subtitles']}>Primary Contact</h3>
            <div className={styles['input-area']}>
              <Row>
                <Col lg={5}>
                  <label htmlFor="primary-name">
                    <b>Name</b>
                    <p className={styles.text}>
                      {siteInfo.primaryContactInfo &&
                        `${siteInfo.primaryContactInfo.firstName} ${siteInfo.primaryContactInfo.lastName}`}
                    </p>
                  </label>
                </Col>
                <Col lg={5}>
                  <label htmlFor="primary-title">
                    <b>Title</b>
                    <p className={styles.text}>
                      {siteInfo.primaryContactInfo && siteInfo.primaryContactInfo.title}
                    </p>
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="primary-email">
                  <b>Email</b>
                  <p className={styles.text}>
                    {siteInfo.primaryContactInfo && siteInfo.primaryContactInfo.email}
                  </p>
                </label>
              </Col>
              <Col md={5}>
                <label htmlFor="primary-phone">
                  <b>Phone Number</b>
                  <p className={styles.text}>
                    {siteInfo.primaryContactInfo && siteInfo.primaryContactInfo.phone}
                  </p>
                </label>
              </Col>
            </div>
            <h3 className={styles['optional-subtitles']}>Secondary Contact</h3>
            <div className={styles['input-area']}>
              <Row>
                <Col lg={5}>
                  <label htmlFor="secondary-name">
                    <b>Name</b>
                    <p className={styles.text}>{siteInfo.secondContactInfo && secondName}</p>
                  </label>
                </Col>
                <Col lg={5}>
                  <label htmlFor="secondary-title">
                    <b>Title</b>
                    <p className={styles.text}>
                      {siteInfo.secondContactInfo && siteInfo.secondContactInfo.title}
                    </p>
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="secondary-email">
                  <b>Email</b>
                  <p className={styles.text}>
                    {siteInfo.secondContactInfo && siteInfo.secondContactInfo.email}
                  </p>
                </label>
              </Col>
              <Col md={5}>
                <label htmlFor="secondary-phone">
                  <b>Phone Number</b>
                  <p className={styles.text}>
                    {siteInfo.secondContactInfo && siteInfo.secondContactInfo.phone}
                  </p>
                </label>
              </Col>
            </div>
            <h3 className={styles['optional-subtitles']}>Notes</h3>
            <label htmlFor="notes" className={`${styles['input-area']} ${styles.notes}`}>
              <p className={styles.text}>{siteInfo.notes}</p>
            </label>
            <button type="button" onClick={changeEdit} className={`btn ${styles['edit-btn']}`}>
              Edit
            </button>
            <button
              type="button"
              onClick={openWarningModal}
              className={`btn ${styles['delete-btn']}`}
            >
              Delete
            </button>
          </div>
        </Col>
      </Container>
    </div>
  );
};

ViewSite.propTypes = {
  siteId: PropTypes.number.isRequired,
};

export default ViewSite;
