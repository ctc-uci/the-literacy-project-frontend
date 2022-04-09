import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { BsBackspace } from 'react-icons/bs';

import styles from './ReturnHeader.module.css';

const ReturnHeader = ({ returnText, returnLink, rightText }) => (
  <div className={styles.wrapper}>
    <Link to={returnLink} className={styles['return-link']}>
      <BsBackspace />
      <h4>{returnText}</h4>
    </Link>
    <h1 className={styles['right-text']}>{rightText}</h1>
  </div>
);

ReturnHeader.propTypes = {
  returnText: PropTypes.string.isRequired,
  returnLink: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired,
};

export default ReturnHeader;
