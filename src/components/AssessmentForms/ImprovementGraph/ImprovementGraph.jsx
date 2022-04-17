import React from 'react';
import PropTypes from 'prop-types';

import Graph from '../../Graph/Graph';
import styles from './ImprovementGraph.module.css';

const EmptyText = () => (
  <div className={styles.empty}>
    <p>No data has been entered. Begin by inputting data.</p>
  </div>
);

const ImprovementGraph = ({ studentData }) => {
  const MAX_ASSESSMENT_SCORE = 93;
  const MAX_ATTITUDE_SCORE = 80;

  const empty =
    studentData.pretestR === null &&
    studentData.posttestR === null &&
    studentData.pretestA === null &&
    studentData.posttestA === null;

  const preAttitude =
    (studentData?.pretestR?.reduce((tot, a) => tot + a, 0) / MAX_ATTITUDE_SCORE) * 100;
  const postAttitude =
    (studentData?.posttestR?.reduce((tot, a) => tot + a, 0) / MAX_ATTITUDE_SCORE) * 100;
  const preAssessment =
    (studentData?.pretestA?.reduce((tot, a) => tot + a, 0) / MAX_ASSESSMENT_SCORE) * 100;
  const postAssessment =
    (studentData?.posttestA?.reduce((tot, a) => tot + a, 0) / MAX_ASSESSMENT_SCORE) * 100;

  return empty ? (
    <EmptyText />
  ) : (
    <Graph
      xLabels={['Attitudinal', 'Academic']}
      preData={[preAttitude, preAssessment]}
      postData={[postAttitude, postAssessment]}
    />
  );
};

ImprovementGraph.propTypes = {
  studentData: PropTypes.shape({
    pretestR: PropTypes.arrayOf(PropTypes.number),
    posttestR: PropTypes.arrayOf(PropTypes.number),
    pretestA: PropTypes.arrayOf(PropTypes.number),
    posttestA: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default ImprovementGraph;
