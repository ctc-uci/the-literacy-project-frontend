import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, CloseButton } from 'react-bootstrap';

import styles from './CommonAlert.module.css';

const CommonAlert = ({ variant, open, setOpen, openTime, children }) => {
  // Closes alert after openTime milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, openTime);
    return () => clearTimeout(timer);
  }, [open]);

  return open ? (
    <Alert variant={variant} className={styles.alert}>
      {children}
      <CloseButton className={styles['close-btn']} onClick={() => setOpen(false)} />
    </Alert>
  ) : null;
};

CommonAlert.defaultProps = {
  openTime: 5000,
};

CommonAlert.propTypes = {
  variant: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  openTime: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CommonAlert;
