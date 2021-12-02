import React, { useState } from 'react';
import './AttitudeForm.css';
import PropTypes from 'prop-types';

function AttitudeScoreTableRow({ rowNumber, setScoreTable }) {
  const [recScore, setRecScore] = useState(0);
  const [academicScore, setAcademicScore] = useState(0);

  const handleRecScore = event => {
    // LATER KEEP TRACK OF TABLE TOTALS
    setRecScore(event.target.value);
    setScoreTable(event.target.value, academicScore, rowNumber - 1);
  };
  const handleAcademicScore = event => {
    setAcademicScore(event.target.value);
    setScoreTable(recScore, event.target.value, rowNumber - 1);
  };

  return (
    <>
      <tr>
        <td>
          <form onChange={handleRecScore}>
            <label htmlFor="rec">
              {rowNumber}.
              <input type="number" min="0" max="4" name="rec" value={recScore} />
            </label>
          </form>
        </td>
        <td>
          <form onChange={handleAcademicScore}>
            <label htmlFor="academic">
              {rowNumber}.
              <input type="number" min="0" max="4" name="academic" value={academicScore} />
            </label>
          </form>
        </td>
      </tr>
    </>
  );
}

AttitudeScoreTableRow.defaultProps = {
  rowNumber: 1,
  setScoreTable: () => {},
};

AttitudeScoreTableRow.propTypes = {
  rowNumber: PropTypes.number,
  setScoreTable: PropTypes.func,
};

export default AttitudeScoreTableRow;
