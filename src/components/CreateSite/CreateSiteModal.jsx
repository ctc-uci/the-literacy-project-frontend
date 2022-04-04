import { React } from 'react';
import PropTypes from 'prop-types';
import './CreateSiteModal.css';
import { Container, Col, Row } from 'react-bootstrap';
// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TLPBackend } from '../../common/utils';

const nameContainsSpace = name => {
  return name.indexOf(' ') !== -1;
};

const schema = yup
  .object({
    siteName: yup.string().required(),
    addressStreet: yup.string().required(),
    // addressStreet: yup.string(),
    addressCity: yup.string().required(),
    // addressCity: yup.string(),
    addressZip: yup.number().required(),
    // addressZip: yup.number(),
    primaryName: yup.string().required(),
    // primaryName: yup.string(),
    primaryTitle: yup.string().required(),
    // primaryTitle: yup.string(),
    primaryEmail: yup.string().required(),
    // primaryEmail: yup.string(),
    primaryPhone: yup.string().required(),
    // primaryPhone: yup.string(),
    secondaryName: yup.string(),
    secondaryTitle: yup.string(),
    secondaryEmail: yup.string(),
    secondaryPhone: yup.string(),
    notes: yup.string(),
  })
  .required();

const CreateSiteModal = areaId => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const onSubmit = async data => {
    const formData = {
      siteName: data.siteName,
      addressStreet: data.addressStreet,
      addressCity: data.addressCity,
      addressZip: data.addressZip,
      ...areaId,
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
    console.log(formData);
    await TLPBackend.post('/sites', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log('Submit success');
    // Send the user back to all sites; TODO add success status notif
    window.location.replace('/sites');
  };

  return (
    <Container>
      <Col md={{ span: 8, offset: 2 }}>
        <form className="form-group site-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="formwrapper">
            <div className="form-header">
              <h2 className="form-title">CREATE NEW SITE</h2>
            </div>
            <h3 className="required-subtitles">Basic Information</h3>
            <div className="input-area">
              <Col md={5}>
                <label htmlFor="site-name">
                  Name
                  <input
                    type="text"
                    className="form-control"
                    name="siteName"
                    placeholder="placeholder"
                    {...register('siteName')}
                  />
                </label>
                <label htmlFor="address-street">
                  Address Line
                  <input
                    type="text"
                    className="form-control"
                    name="addressStreet"
                    placeholder="placeholder"
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
                      placeholder="placeholder"
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
                      placeholder="placeholder"
                      {...register('addressZip')}
                    />
                  </label>
                </div>
              </Col>
            </div>

            <h3 className="required-subtitles">Primary Contact</h3>
            <div className="input-area">
              <Row>
                <Col lg={5}>
                  <label htmlFor="primary-name">
                    Name
                    <input
                      type="text"
                      className="form-control"
                      name="primaryName"
                      placeholder="placeholder"
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
                      placeholder="placeholder"
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
                    placeholder="placeholder"
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
                    placeholder="placeholder"
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
                      placeholder="placeholder"
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
                      placeholder="placeholder"
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
                    placeholder="placeholder"
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
                    placeholder="placeholder"
                    {...register('secondaryPhone')}
                  />
                </label>
              </Col>
            </div>

            <h3 className="optional-subtitles">Notes</h3>
            <label htmlFor="notes" className="input-area">
              <textarea
                className="form-control"
                placeholder="placeholder"
                name="notes"
                {...register('notes')}
              />
            </label>

            <button type="submit" className="btn save-btn">
              Save
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
