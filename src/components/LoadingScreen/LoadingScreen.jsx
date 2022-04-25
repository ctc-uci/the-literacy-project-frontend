import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './LoadingScreen.module.css';
import loadingImage from '../../assets/LoadingPageGraphic.png';

const LoadingScreen = () => {
  return (
    <div>
      <img src={loadingImage} alt="404 warning" className={styles.image} />

      <div className={styles.content}>
        <h1 className={styles.text}>Your content is loading...</h1>
        <Spinner animation="border" variant="primary" className={styles.spinner} />
      </div>
    </div>
  );
};

export default LoadingScreen;
