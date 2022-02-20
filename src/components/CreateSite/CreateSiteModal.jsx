import { React } from 'react';
import './CreateSiteModal.css';
import { Container, Col, Row } from 'react-bootstrap';
import { BsQuestionCircle } from 'react-icons/bs';

const CreateSiteModal = () => {
  return (
    <Container>
      <Col md={{ span: 8, offset: 2 }}>
        <form className="form-group site-form">
          <div className="formwrapper">
            <div className="form-header">
              <h2 className="form-title">CREATE NEW SITE</h2>
            </div>
            <h3 className="subtitles">Basic Information</h3>
            <div className="input-area">
              <Col md={5}>
                <label htmlFor="site-name">
                  Name
                  <input type="text" className="form-control" placeholder="placeholder" />
                </label>
                <label htmlFor="address">
                  Address
                  <input type="text" className="form-control" placeholder="placeholder" />
                </label>
              </Col>
            </div>

            <h3 className="subtitles">Primary Contact</h3>
            <div className="input-area">
              <Row>
                <Col lg={5}>
                  <label htmlFor="primary-name">
                    Name
                    <input type="text" className="form-control" placeholder="placeholder" />
                  </label>
                </Col>
                <Col lg={5}>
                  <label htmlFor="primary-title">
                    Title <BsQuestionCircle />
                    <input type="text" className="form-control" placeholder="placeholder" />
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="primary-email">
                  Email
                  <input type="text" className="form-control" placeholder="placeholder" />
                </label>
                <label htmlFor="primary-phone">
                  Phone Number
                  <input type="text" className="form-control" placeholder="placeholder" />
                </label>
              </Col>
            </div>

            <h3 className="subtitles">Secondary Contact</h3>
            <div className="input-area">
              <Row>
                <Col lg={5}>
                  <label htmlFor="secondary-name">
                    Name
                    <input type="text" className="form-control" placeholder="placeholder" />
                  </label>
                </Col>
                <Col lg={5}>
                  <label htmlFor="secondary-title">
                    Title <BsQuestionCircle />
                    <input type="text" className="form-control" placeholder="placeholder" />
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label htmlFor="secondary-email">
                  Email
                  <input type="text" className="form-control" placeholder="placeholder" />
                </label>
                <label htmlFor="secondary-phone">
                  Phone Number
                  <input type="text" className="form-control" placeholder="placeholder" />
                </label>
              </Col>
            </div>

            <h3 className="subtitles">Notes</h3>
            <label htmlFor="notes" className="input-area">
              <textarea className="form-control" placeholder="placeholder" />
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

export default CreateSiteModal;
