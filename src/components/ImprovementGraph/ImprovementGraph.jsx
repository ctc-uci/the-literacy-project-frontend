import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImprovementGraph.module.css';

const ImprovementGraph = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <h3>Improvement</h3>
      <div className={styles['graph-wrapper']}>
        <div style={{ width: '395px', height: '295px', border: '1px solid black' }}>graph here</div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

ImprovementGraph.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default ImprovementGraph;
