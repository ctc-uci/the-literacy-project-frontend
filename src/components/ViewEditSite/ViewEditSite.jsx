import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ViewEditSite.css';
import { Container, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { TLPBackend } from '../../common/utils';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import NavigationBar from '../NavigationBar/NavigationBar';

const nameContainsSpace = name => {
  return name.indexOf(' ') !== -1;
};

const schema = yup
  .object({
    siteName: yup.string().required(),
    addressStreet: yup.string().required(),
    addressCity: yup.string().required(),
    addressZip: yup.number().required(),
    primaryName: yup.string().required(),
    primaryTitle: yup.string().required(),
    primaryEmail: yup.string().required(),
    primaryPhone: yup.string().required(),
    secondaryName: yup.string(),
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

  const deleteSite = () => {
    TLPBackend.delete(`/sites/${siteId}`);
  };

  const siteInfo = JSON.parse(localStorage.getItem('siteInfo'));
  const [edit, setEdit] = useState(false);
  const [areaName, setAreaName] = useState('');

  const changeEdit = () => {
    setEdit(!edit);
  };

  const getArea = async () => {
    const res = await TLPBackend.get(`/areas/${siteInfo.areaId}`);
    if (res.status === 200) {
      setAreaName(res.data.areaName);
    }
  };

  useEffect(async () => {
    const res = await TLPBackend.get(`/sites/${siteId}`);
    if (res.status === 200) {
      localStorage.setItem('siteInfo', JSON.stringify(res.data));
    }
    getArea();
  }, [siteInfo]);

  const onSubmit = async data => {
    const formData = {
      siteName: data.siteName,
      addressStreet: data.addressStreet,
      addressCity: data.addressCity,
      addressZip: data.addressZip,
      areaId: siteInfo.areaId,
      active: 'true',
      notes: data.notes,
      primaryContactInfo: {
        // Revisit later: currently only one input field for name,
        // but we need first + last name differentiation
        firstName: nameContainsSpace(data.primaryName)
          ? data.primaryName.slice(0, data.primaryName.indexOf(' '))
          : data.primaryName,
        lastName: nameContainsSpace(data.primaryName)
          ? data.primaryName.slice(data.primaryName.indexOf(' ') + 1)
          : '',
        title: data.primaryTitle,
        email: data.primaryEmail,
        phoneNumber: data.primaryPhone,
      },
    };

    // Adding secondary contact info, if present
    if (data.secondaryName !== '') {
      formData.secondContactInfo = {
        firstName: nameContainsSpace(data.secondaryName)
          ? data.secondaryName.slice(0, data.secondaryName.indexOf(' '))
          : data.secondaryName,
        lastName: nameContainsSpace(data.secondaryName)
          ? data.secondaryName.slice(data.secondaryName.indexOf(' ') + 1)
          : '',
        title: data.secondaryTitle,
        email: data.secondaryEmail,
        phoneNumber: data.secondaryPhone,
      };
    }

    // send form data to server
    await TLPBackend.put(`/sites/${siteId}`, formData);
  };

  if (edit) {
    return (
      <div>
        <NavigationBar />
        <p className="routing">
          <Link to="/area-management" className="link">
            Area{' '}
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
                    <DropdownMenu
                      innerClass="site_dropdown_inner"
                      current={siteInfo.active ? 'Active' : 'Inactive'}
                      choices={['Active', 'Inactive']}
                      buttonClass={siteInfo.active ? 'active_site_dd' : 'inactive_site_dd'}
                    />
                  </Col>
                </div>
                <h3 className="optional-subtitles">Basic Information</h3>
                <div className="input-area">
                  <Col md={5}>
                    <label htmlFor="site-name">
                      <input
                        type="text"
                        className="form-control"
                        name="siteName"
                        defaultValue={siteInfo.siteName}
                        {...register('siteName')}
                      />
                    </label>
                    <label htmlFor="address-street">
                      Address Line
                      <input
                        type="text"
                        className="form-control"
                        name="addressStreet"
                        defaultValue={siteInfo.addressStreet}
                        {...register('addressStreet')}
                      />
                    </label>
                    <div className="input-fields-coalesce-wrapper">
                      <label htmlFor="address-city">
                        City
                        <input
                          type="text"
                          className="addr-small-field form-control"
                          name="addressCity"
                          defaultValue={siteInfo.addressCity}
                          {...register('addressCity')}
                        />
                      </label>
                      <label htmlFor="address-zip">
                        ZIP Code
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
                    <Col lg={5}>
                      <label htmlFor="primary-name">
                        Name
                        <input
                          type="text"
                          className="form-control"
                          name="primaryName"
                          defaultValue={`${siteInfo.primaryContactInfo.firstName} ${siteInfo.primaryContactInfo.lastName}`}
                          {...register('primaryName')}
                        />
                      </label>
                    </Col>
                    <Col lg={5}>
                      <label htmlFor="primary-title">
                        Title
                        <input
                          type="text"
                          className="form-control"
                          name="primaryTitle"
                          defaultValue={siteInfo.primaryContactInfo.title}
                          {...register('primaryTitle')}
                        />
                      </label>
                    </Col>
                  </Row>
                  <Col md={5}>
                    <label htmlFor="primary-email">
                      Email
                      <input
                        type="text"
                        className="form-control"
                        name="primaryEmail"
                        defaultValue={siteInfo.primaryContactInfo.email}
                        {...register('primaryEmail')}
                      />
                    </label>
                    <label htmlFor="primary-phone">
                      Phone Number
                      <input
                        type="number"
                        // Phone #s are <= 10 digits
                        onInput={e => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        maxLength={10}
                        className="form-control"
                        name="primaryPhone"
                        defaultValue={siteInfo.primaryContactInfo.phoneNumber}
                        {...register('primaryPhone')}
                      />
                    </label>
                  </Col>
                </div>

                <h3 className="optional-subtitles">Secondary Contact</h3>
                <div className="input-area">
                  <Row>
                    <Col lg={5}>
                      <label htmlFor="secondary-name">
                        Name
                        <input
                          type="text"
                          className="form-control"
                          name="secondaryName"
                          defaultValue={
                            siteInfo.secondContactInfo &&
                            `${siteInfo.secondContactInfo.firstName} ${siteInfo.secondContactInfo.lastName}`
                          }
                          {...register('secondaryName')}
                        />
                      </label>
                    </Col>
                    <Col lg={5}>
                      <label htmlFor="secondary-title">
                        Title
                        <input
                          type="text"
                          className="form-control"
                          name="secondaryTitle"
                          defaultValue={
                            siteInfo.secondContactInfo && siteInfo.secondContactInfo.title
                          }
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
                        className="form-control"
                        name="secondaryEmail"
                        defaultValue={
                          siteInfo.secondContactInfo && siteInfo.secondContactInfo.email
                        }
                        {...register('secondaryEmail')}
                      />
                    </label>
                    <label htmlFor="secondary-phone">
                      Phone Number
                      <input
                        className="form-control"
                        type="number"
                        // Phone #s are <= 10 digits
                        onInput={e => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        name="secondaryPhone"
                        defaultValue={
                          siteInfo.secondContactInfo && siteInfo.secondContactInfo.phoneNumber
                        }
                        {...register('secondaryPhone')}
                      />
                    </label>
                  </Col>
                </div>

                <h3 className="optional-subtitles">Notes</h3>
                <label htmlFor="notes" className="input-area">
                  <textarea
                    className="form-control"
                    defaultValue={siteInfo.notes}
                    name="notes"
                    {...register('notes')}
                  />
                </label>
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
      <NavigationBar />
      <p className="routing">
        <Link to="/area-management" className="link">
          Area{' '}
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
                <label htmlFor="address-street">
                  <b>Address Line</b>
                  <p className="text">{siteInfo.addressStreet}</p>
                </label>
                <div className="input-fields-coalesce-wrapper">
                  <label htmlFor="address-city">
                    <b>City</b>
                    <p className="text">{siteInfo.addressCity}</p>
                  </label>
                  <label htmlFor="address-zip">
                    <b>ZIP Code</b>
                    <p className="text">{siteInfo.addressZip}</p>
                  </label>
                </div>
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
                <label htmlFor="primary-phone">
                  <b>Phone Number</b>
                  <p className="text">{siteInfo.primaryContactInfo.phoneNumber}</p>
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
                    <p className="text">
                      {siteInfo.secondContactInfo && siteInfo.secondContactInfo.title}
                    </p>
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="secondary-email">
                  <b>Email</b>
                  <p className="text">
                    {siteInfo.secondContactInfo && siteInfo.secondContactInfo.email}
                  </p>
                </label>
                <label htmlFor="secondary-phone">
                  <b>Phone Number</b>
                  <p className="text">
                    {siteInfo.secondContactInfo && siteInfo.secondContactInfo.phoneNumber}
                  </p>
                </label>
              </Col>
            </div>
            <h3 className="optional-subtitles">Notes</h3>
            <label htmlFor="notes" className="input-area">
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
