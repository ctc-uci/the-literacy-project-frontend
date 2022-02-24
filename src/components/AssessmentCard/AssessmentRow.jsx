import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AssessmentRow.css';

function AssessmentRow({ testNumber, gameName, skillTest, passingScore, numQuestions }) {
  const [preScore, setPreScore] = useState(0);
  const [postScore, setPostScore] = useState(0);

  const handlePreScore = event => {
    setPreScore(event.target.value);
  };

  const handlePostScore = event => {
    setPostScore(event.target.value);
  };

  const change = (postScore - preScore) / numQuestions;
  if (numQuestions !== 0) {
    return (
      <tr>
        <td className="test-number">{testNumber}</td>
        <td className="game-name">{gameName}</td>
        <td className="skill-test">{skillTest}</td>
        <td>{passingScore}</td>
        <td className="player-score">
          <form onChange={handlePreScore}>
            <input placeholder={0} type="number" name="Pre Score" min={0} max={numQuestions} />
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="test-number">{testNumber}</td>
      <td className="game-name">{gameName}</td>
      <td className="skill-test">{skillTest}</td>
      <td>---</td>
      <td>-----</td>
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
  numQuestions: 0,
};

AssessmentRow.propTypes = {
  testNumber: PropTypes.number,
  gameName: PropTypes.string,
  skillTest: PropTypes.string,
  passingScore: PropTypes.string,
  numQuestions: PropTypes.number,
};

export default AssessmentRow;
