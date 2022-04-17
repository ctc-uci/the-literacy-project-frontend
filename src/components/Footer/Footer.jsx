import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './Footer.module.css';
import logo from './logo.png';

const Footer = () => {
  const goTopOfPage = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Row>
        <div className={styles['button-wrapper']}>
          <button type="button" className={styles.button} onClick={goTopOfPage}>
            <div className={styles['to-top']}>↑ Back to Top</div>
          </button>
        </div>
      </Row>
      <Row className={styles.middle}>
        <Col md="auto">
          <div className={styles.wrapper}>
            <img src={logo} alt={logo} className={styles.logo} />
          </div>
        </Col>
        <Col sm={4}>
          <div>https://literacyproj.org/</div>
          <div>124 Tustin Avenue, Suite 103 | Newport Beach, CA 92663</div>
        </Col>
        <Col md="auto">
          <div>Help Documentation | Contact Administration</div>
          <div>TEL 949.721.1319 | Privacy Policy</div>
        </Col>
      </Row>
      <Row>
        <div className={styles.copyright}>
          Copyright © 2017, The Literacy Project. All Rights Reserved.
        </div>
      </Row>
    </div>
  );
};

export default Footer;
