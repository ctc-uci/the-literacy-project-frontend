import React from 'react';
import PropTypes from 'prop-types';
import './AssessmentRow.css';

function AssessmentRow({ testNumber, gameName, skillTest, passingScore, numQuestions }) {
  if (numQuestions !== 0) {
    return (
      <tr>
        <td className="test-number">{testNumber}</td>
        <td className="game-name">{gameName}</td>
        <td className="skill-test">{skillTest}</td>
        <td>{passingScore}</td>
        <td className="player-score">
          <form>
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
