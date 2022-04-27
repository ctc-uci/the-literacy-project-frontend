import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ViewEditSite.css';
import { Container, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import states from 'states-us';
import { TLPBackend } from '../../common/utils';

const s = states.filter(x => !x.territory);
const abbrev = s.map(x => x.name);
// remove district of columbia
abbrev.splice(8, 1);
const options = abbrev.map(x => ({ label: x, value: x }));

const schema = yup
  .object({
    siteName: yup.string().required(),
    addressStreet: yup.string().required(),
    addressApt: yup.string(),
    addressCity: yup.string().required(),
    addressState: yup.string().required(),
    addressZip: yup.number().required(),
    primaryFirstName: yup.string().required(),
    primaryLastName: yup.string().required(),
    primaryTitle: yup.string(),
    primaryEmail: yup.string().required(),
    primaryPhone: yup.string().required(),
    secondaryFirstName: yup.string(),
    secondaryLastName: yup.string(),
    secondaryTitle: yup.string(),
    secondaryEmail: yup.string(),
    secondaryPhone: yup.string(),
    notes: yup.string(),
  })
  .required();

const ViewSite = ({ siteId }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const siteInfo = JSON.parse(localStorage.getItem('siteInfo'));
  const [edit, setEdit] = useState(false);
  const [areaName, setAreaName] = useState('');

  const abbrevState = s.filter(x => x.name === siteInfo.addressState)[0].abbreviation;

  const [apt, setApt] = useState('');

  const deleteSite = async () => {
    await TLPBackend.delete(`/sites/${siteId}`);
    window.location.replace(`/area/${siteInfo.areaId}`);
  };

  const changeEdit = () => {
    setEdit(!edit);
  };

  const getArea = async () => {
    const res = await TLPBackend.get(`/areas/${siteInfo.areaId}`);
    if (res.status === 200) {
      setAreaName(res.data.areaName);
    }
  };

  const getSiteInfo = async () => {
    const res = await TLPBackend.get(`/sites/${siteId}`);
    if (res.status === 200) {
      localStorage.setItem('siteInfo', JSON.stringify(res.data));
    }
  };

  useEffect(async () => {
    getSiteInfo();
    getArea();
    if (siteInfo.addressApt != null) {
      setApt(` ${siteInfo.addressApt}`);
    }
  }, []);

  const onSubmit = async data => {
    const formData = {
      siteName: data.siteName,
      addressStreet: data.addressStreet,
      addressApt: data.addressApt,
      addressCity: data.addressCity,
      addressState: data.addressState,
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
    if (data.secondaryName) {
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
    getSiteInfo();
    window.location.reload();
    changeEdit();
  };

  if (edit) {
    return (
      <div>
        <p className="routing">
          <Link to="/area-management" className="link">
            Areas{' '}
          </Link>
          / {/* filler for now */}
          <Link to={`/area/${siteInfo.areaId}`} className="link">
            {areaName}{' '}
          </Link>
          / {siteInfo.siteName}
        </p>
        <Container>
          <Col md={{ span: 8, offset: 2 }}>
            <form className="form-group site-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="formwrapper">
                <div className="form-header">
                  <h2 className="form-title">{siteInfo.siteName}</h2>
                </div>
                <h3 className="optional-subtitles">Site Status</h3>
                <div className="input-area">
                  <Col md={5}>
                    <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                    <select
                      className="form control status"
                      {...register('active')}
                      defaultValue={siteInfo.active ? 'Active' : 'Inactive'}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </Col>
                </div>
                <h3 className="optional-subtitles">Basic Information</h3>
                <div className="input-area">
                  <Col md={5}>
                    <label htmlFor="site-name">
                      Name<span style={{ color: '#e32' }}>*</span>
                      <input
                        type="text"
                        className="form-control page-inputs"
                        name="siteName"
                        defaultValue={siteInfo.siteName}
                        {...register('siteName')}
                      />
                    </label>
                    <label htmlFor="address-street">
                      Address Line<span style={{ color: '#e32' }}>*</span>
                      <input
                        type="text"
                        className="form-control page-inputs"
                        name="addressStreet"
                        defaultValue={siteInfo.addressStreet}
                        {...register('addressStreet')}
                      />
                    </label>
                    <label htmlFor="apt-suite-etc">
                      Apt, suite, etc
                      <input
                        type="text"
                        className="form-control page-inputs"
                        name="addressApt"
                        placeholder="Apt 208"
                        defaultValue={siteInfo.addressApt}
                        {...register('addressApt')}
                      />
                    </label>
                    <div className="input-fields-coalesce-wrapper">
                      <label htmlFor="address-city">
                        City<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="text"
                          className="addr-small-field form-control"
                          name="addressCity"
                          defaultValue={siteInfo.addressCity}
                          {...register('addressCity')}
                        />
                      </label>
                      <label aria-label="address-state" htmlFor="address-state">
                        <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                        State<span style={{ color: '#e32' }}>*</span>
                        <select
                          {...register('addressState')}
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
                            if (e.target.value.length > 9) {
                              e.target.value = e.target.value.slice(0, 9);
                            }
                          }}
                          maxLength={9}
                          className="form-control addr-small-field"
                          name="address-zip"
                          defaultValue={siteInfo.addressZip}
                          {...register('addressZip')}
                        />
                      </label>
                    </div>
                  </Col>
                </div>
                <h3 className="optional-subtitles">Primary Contact</h3>
                <div className="input-area">
                  <Row>
                    <Col lg={3}>
                      <label htmlFor="primary-name">
                        First Name<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="text"
                          className="form-control"
                          name="primaryName"
                          placeholder="First Name"
                          defaultValue={siteInfo.primaryContactInfo.firstName}
                          {...register('primaryFirstName')}
                        />
                      </label>
                    </Col>
                    <Col lg={3}>
                      <label htmlFor="primary-name">
                        Last Name<span style={{ color: '#e32' }}>*</span>
                        <input
                          type="text"
                          className="form-control"
                          name="primaryName"
                          placeholder="Last Name"
                          defaultValue={siteInfo.primaryContactInfo.lastName}
                          {...register('primaryLastName')}
                        />
                      </label>
                    </Col>
                    <Col lg={5}>
                      <label htmlFor="primary-title">
                        Title
                        <input
                          type="text"
                          className="form-control page-inputs"
                          name="primaryTitle"
                          defaultValue={siteInfo.primaryContactInfo.title}
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
                        className="form-control page-inputs"
                        name="primaryEmail"
                        defaultValue={siteInfo.primaryContactInfo.email}
                        {...register('primaryEmail')}
                      />
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
                        className="form-control page-inputs"
                        name="primaryPhone"
                        placeholder="(123)1231234"
                        defaultValue={siteInfo.primaryContactInfo.phone}
                        {...register('primaryPhone')}
                      />
                    </label>
                  </Col>
                </div>
                <h3 className="optional-subtitles">Secondary Contact</h3>
                <div className="input-area">
                  <Row>
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
                          className="form-control page-inputs"
                          name="secondaryTitle"
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
                        className="form-control page-inputs"
                        name="secondaryEmail"
                        defaultValue={siteInfo.secondContactInfo.email}
                        {...register('secondaryEmail')}
                      />
                    </label>
                    <label htmlFor="secondary-phone">
                      Phone Number
                      <input
                        className="form-control page-inputs"
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
                    </label>
                  </Col>
                </div>
                <Col>
                  <h3 className="optional-subtitles">Notes</h3>
                  <label htmlFor="notes" className="input-area">
                    <textarea
                      className="form-control notes"
                      defaultValue={siteInfo.notes}
                      name="notes"
                      {...register('notes')}
                    />
                  </label>
                </Col>
                <button type="submit" className="btn save-btn">
                  Save
                </button>
                <button type="button" onClick={deleteSite} className="btn delete-btn">
                  Delete
                </button>
                <button type="button" onClick={changeEdit} className="btn cancel-btn">
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
      <p className="routing">
        <Link to="/area-management" className="link">
          Areas{' '}
        </Link>
        / {/* filler for now */}
        <Link to={`/area/${siteInfo.areaId}`} className="link">
          {areaName}{' '}
        </Link>
        / {siteInfo.siteName}
      </p>
      <Container>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="formwrapper">
            <div className="form-header">
              <h2 className="form-title">{siteInfo.siteName}</h2>
            </div>
            <h3 className="optional-subtitles">Site Status</h3>
            <div className="input-area">
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
            <h3 className="optional-subtitles">Basic Information</h3>
            <div className="input-area">
              <Col md={5}>
                <label htmlFor="site-name">
                  <b>Name</b>
                  <p className="text">{siteInfo.siteName}</p>
                </label>
              </Col>
              <Col md={5}>
                <label htmlFor="address-street">
                  <b>Address</b>
                  <p className="text">
                    {`${siteInfo.addressStreet}${apt}, ${siteInfo.addressCity}, ${abbrevState} ${siteInfo.addressZip}`}
                  </p>
                </label>
              </Col>
            </div>

            <h3 className="optional-subtitles">Primary Contact</h3>
            <div className="input-area">
              <Row>
                <Col lg={5}>
                  <label htmlFor="primary-name">
                    <b>Name</b>
                    <p className="text">{`${siteInfo.primaryContactInfo.firstName} ${siteInfo.primaryContactInfo.lastName}`}</p>
                  </label>
                </Col>
                <Col lg={5}>
                  <label htmlFor="primary-title">
                    <b>Title</b>
                    <p className="text">{siteInfo.primaryContactInfo.title}</p>
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="primary-email">
                  <b>Email</b>
                  <p className="text">{siteInfo.primaryContactInfo.email}</p>
                </label>
              </Col>
              <Col md={5}>
                <label htmlFor="primary-phone">
                  <b>Phone Number</b>
                  <p className="text">{siteInfo.primaryContactInfo.phone}</p>
                </label>
              </Col>
            </div>
            <h3 className="optional-subtitles">Secondary Contact</h3>
            <div className="input-area">
              <Row>
                <Col lg={5}>
                  <label htmlFor="secondary-name">
                    <b>Name</b>
                    <p className="text">
                      {siteInfo.secondContactInfo &&
                        `${siteInfo.secondContactInfo.firstName} ${siteInfo.secondContactInfo.lastName}`}
                    </p>
                  </label>
                </Col>
                <Col lg={5}>
                  <label htmlFor="secondary-title">
                    <b>Title</b>
                    <p className="text">{siteInfo.secondContactInfo.title}</p>
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="secondary-email">
                  <b>Email</b>
                  <p className="text">{siteInfo.secondContactInfo.email}</p>
                </label>
              </Col>
              <Col md={5}>
                <label htmlFor="secondary-phone">
                  <b>Phone Number</b>
                  <p className="text">{siteInfo.secondContactInfo.phone}</p>
                </label>
              </Col>
            </div>
            <h3 className="optional-subtitles">Notes</h3>
            <label htmlFor="notes" className="input-area notes">
              <p className="text">{siteInfo.notes}</p>
            </label>
            <button type="button" onClick={changeEdit} className="btn edit-btn">
              Edit
            </button>
            <button type="button" onClick={deleteSite} className="btn delete-btn">
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
