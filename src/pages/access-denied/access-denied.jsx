import React from 'react';
import { Link } from 'react-router-dom';
import styles from './access-denied.module.css';
import error from '../../assets/access-denied.png';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const AccessDeniedView = () => {
  return (
    <div>
      <NavigationBar />
      <img src={error} alt="404 warning" className={styles.error} />

      <div className={styles.content}>
        <h1 className={styles.warning}>Whoops! Access Denied...</h1>
        <p className={styles.text}>
          Looks like you don&apos;t have permission to access the requested page
        </p>
        <Link to="/">
          <button type="button" className="btn btn-warning">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccessDeniedView;
