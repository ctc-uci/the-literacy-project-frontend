import React from 'react';
// import { useState } from 'react';
import './AttitudeForm.css';
import PropTypes from 'prop-types';

function AttitudeScoreTableRow({ rowNumber }) {
  // const [recScore, setRecScore] = useState(0);
  // const [academicScore, setAcademicScore] = useState(0);

  // const handleRecScore = event => {
  //   setRecScore(event.target.value);
  //   console.log(recScore);
  //   // LATER KEEP TRACK OF TABLE TOTALS
  // };
  // const handleAcademicScore = event => {
  //   setAcademicScore(event.target.value);
  //   console.log(academicScore);
  //   // LATER KEEP TRACK OF TABLE TOTALS
  // };

  return (
    <>
      <tr>
        <td>
          <form>
            <label htmlFor="rec">
              {rowNumber}.
              <input type="number" />
            </label>
          </form>
        </td>
        <td>
          <form>
            <label htmlFor="academic">
              {rowNumber}.
              <input type="number" />
            </label>
          </form>
        </td>
      </tr>
    </>
  );
}

AttitudeScoreTableRow.defaultProps = {
  rowNumber: 1,
};

AttitudeScoreTableRow.propTypes = {
  rowNumber: PropTypes.number,
};

export default AttitudeScoreTableRow;
