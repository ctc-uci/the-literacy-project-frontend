import { React } from 'react';
import PropTypes from 'prop-types';
import './CreateSiteModal.css';
import { Container, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import states from 'states-us';
import { TLPBackend } from '../../common/utils';

const s = states.filter(x => !x.territory).map(x => x.abbreviation);
const options = s.map(x => ({ label: x, value: x }));

const schema = yup
  .object({
    siteName: yup.string().required(),
    addressStreet: yup.string().required(),
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

const CreateSiteModal = ({ areaId }) => {
  const { register, handleSubmit } = useForm({
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
      addressAptSuiteEtc: data.addressAptSuiteEtc,
      addressCity: data.addressCity,
      addressState: data.addressState,
      addressZip: data.addressZip,
      areaId,
      active: 'true',
      notes: data.notes,
      primaryContactInfo: {
        firstName: data.primaryFirstName,
        lastName: data.primaryLastName,
        title: data.primaryTitle,
        email: data.primaryEmail,
        phoneNumber: data.primaryPhone,
      },
    };

    // Adding secondary contact info, if present
    if (data.secondaryName) {
      formData.secondContactInfo = {
        firstName: data.secondaryFirstName,
        lastName: data.secondaryLastName,
        title: data.secondaryTitle,
        email: data.secondaryEmail,
        phoneNumber: data.secondaryPhone,
      };
    }

    // send form data to server
    await TLPBackend.post('/sites', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log('Submit success');
    // Send the user back to all sites; TODO add success status notif
    window.location.replace(`/area/${areaId}`);
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
                  Name<span style={{ color: '#e32' }}>*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="siteName"
                    placeholder="i.e. Lakeview Middle School"
                    {...register('siteName')}
                  />
                </label>
                <label htmlFor="address-street">
                  Street Address<span style={{ color: '#e32' }}>*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="addressStreet"
                    placeholder="ie 123 Playa Dr"
                    {...register('addressStreet')}
                  />
                </label>
                <label htmlFor="apt-suite-etc">
                  Apt, suite, etc
                  <input
                    type="text"
                    className="form-control"
                    name="addressAptSuiteEtc"
                    placeholder="Apt 208"
                    {...register('addressAptSuiteEtc')}
                  />
                </label>
                <div className="input-fields-coalesce-wrapper">
                  <label htmlFor="address-city">
                    City<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="text"
                      className="addr-small-field form-control"
                      name="addressCity"
                      placeholder="Irvine"
                      {...register('addressCity')}
                    />
                  </label>
                  <label aria-label="address-state" htmlFor="address-state">
                    <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                    State<span style={{ color: '#e32' }}>*</span>
                    <select {...register('addressState')} className="form-control">
                      {options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="address-zip">
                    Zip Code<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="number"
                      onInput={e => {
                        if (e.target.value.length > 9) {
                          e.target.value = e.target.value.slice(0, 9);
                        }
                      }}
                      maxLength={9}
                      className="form-control addr-small-field"
                      name="address-zip"
                      placeholder="ie 92614"
                      {...register('addressZip')}
                    />
                  </label>
                </div>
              </Col>
            </div>
            <h3 className="required-subtitles">Primary Contact</h3>
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
                      {...register('primaryLastName')}
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
                    type="email"
                    className="form-control"
                    name="primaryEmail"
                    placeholder="email@gmail.com"
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
                    className="form-control"
                    name="primaryPhone"
                    placeholder="123333241"
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
                      {...register('secondaryLastName')}
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
                      placeholder="i.e. Principal, Sir"
                      {...register('secondaryTitle')}
                    />
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="secondary-email">
                  Email
                  <input
                    type="email"
                    className="form-control"
                    name="secondaryEmail"
                    placeholder="email@gmail.com"
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
                    placeholder="123333241"
                    {...register('secondaryPhone')}
                  />
                </label>
              </Col>
            </div>
            <h3 className="optional-subtitles">Notes</h3>
            <label htmlFor="notes" className="input-area">
              <textarea
                className="notes form-control"
                placeholder="notes"
                name="notes"
                {...register('notes')}
              />
            </label>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#3288c4', width: '160px', margin: '60px 0px 30px 70px' }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancel}
              className="btn cancel-btn"
              style={{ backgroundColor: '#5f758d', width: '160px', margin: '60px 0px 30px 70px' }}
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
