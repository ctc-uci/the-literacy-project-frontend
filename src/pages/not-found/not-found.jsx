import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import error from '../../assets/404.PNG';
import childGlass from '../../assets/personGlasses.PNG';

const NotFoundView = () => {
  return (
    <div>
      <img src={error} alt="404 warning" className={styles.error} />

      <div className={styles.content}>
        <h1 className={styles.text}>Whoops! We can&apos;t find the page your looking for...</h1>
        <Link to="/">
          <button type="button" className="btn btn-warning">
            Go Back Home
          </button>
        </Link>
      </div>
      <img src={childGlass} className={styles.child} alt="child with glasses" />
    </div>
  );
};

export default NotFoundView;
