import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AssessmentRow({ testNumber, gameName, skillTest, passingScore }) {
  const [preScore, setPreScore] = useState(0);
  const [postScore, setPostScore] = useState(0);

  const handlePreScore = event => {
    setPreScore(event.target.value);
  };

  const handlePostScore = event => {
    setPostScore(event.target.value);
  };

  return (
    <tr>
      <td>{testNumber}</td>
      <td>{gameName}</td>
      <td>{skillTest}</td>
      <td>{passingScore}</td>
      <td>
        <form onChange={handlePreScore}>
          <input type="text" name="Pre Score" />
        </form>
      </td>
      <td>
        <form onChange={handlePostScore}>
          <input type="text" name="Post Score" />
        </form>
      </td>
      <td>{postScore - preScore}</td>
    </tr>
  );
  // Notes for later:
  // We need to make sure we error check postScore and preScore for being Int
}

AssessmentRow.defaultProps = {
  testNumber: 0,
  gameName: '',
  skillTest: 'test',
  passingScore: '1/3',
};

AssessmentRow.propTypes = {
  testNumber: PropTypes.number,
  gameName: PropTypes.string,
  skillTest: PropTypes.string,
  passingScore: PropTypes.string,
};

export default AssessmentRow;
