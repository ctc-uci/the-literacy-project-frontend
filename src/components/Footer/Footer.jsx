import React from 'react';
import { Row } from 'react-bootstrap';
import styles from './Footer.module.css';
import logo from '../../assets/logos/logo-white.png';

const Footer = () => {
  const goTopOfPage = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div classNam={styles.footer}>
      <Row className={styles.top}>
        <div className={styles['button-wrapper']}>
          <button type="button" className={styles.button} onClick={goTopOfPage}>
            <div className={styles['to-top']}>
              ↑ <span className={styles.italic}>Back to Top</span>
            </div>
          </button>
        </div>
      </Row>
      <div className={styles.middle}>
        <div className={styles['mid-1']}>
          <img src={logo} alt={logo} className={styles.logo} />
          <div className={styles['mid-1-text']}>
            <div>
              <a
                href="https://literacyproj.org"
                target="_blank"
                rel="noreferrer"
                className={styles['footer-link']}
              >
                https://literacyproj.org
              </a>
            </div>
            <div>124 Tustin Avenue, Suite 103 | Newport Beach, CA 92663</div>
          </div>
        </div>
        <div className={styles['mid-2']}>
          {/* TODO: HELP DOCUMENTATION LINK */}
          <div>
            Help Documentation |{' '}
            <a
              href="https://literacyproj.org/contact-us"
              target="_blank"
              rel="noreferrer"
              className={styles['footer-link']}
            >
              Contact Administration
            </a>
          </div>
          <div>
            TEL 949.721.1319 |{' '}
            <a
              href="https://literacyproj.org/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className={styles['footer-link']}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <Row className={styles.bottom}>
        <div className={styles.copyright}>
          Copyright © 2017, The Literacy Project. All Rights Reserved.
        </div>
      </Row>
    </div>
  );
};

export default Footer;
