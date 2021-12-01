import React from 'react';
// import { useState } from 'react';
import './AttitudeForm.css';
import PropTypes from 'prop-types';

import AttitudeScoreTableRow from './AttitudeScoreTableRow';

function AttitudeScoreTable({ tableName }) {
  // const [recTotal, setRecTotal] = useState(0);
  // const [academicTotal, setAcademicTotal] = useState(0);

  return (
    <>
      <table>
        <tr>
          <h4> {tableName} </h4>
        </tr>

        <tr>
          <th>Recreational Reading</th>
          <th>Academic Reading</th>
        </tr>

        {/* RILEY AUTOMATE ROW CREATION */}
        <AttitudeScoreTableRow rowNumber={1} />

        <tr>
          <td>Recreational Total: TBD</td>
          <td>Academic Total: TBD</td>
        </tr>

        <tr> Total Both Scores: TBD </tr>
      </table>
    </>
  );
}

AttitudeScoreTable.defaultProps = {
  tableName: '',
};

AttitudeScoreTable.propTypes = {
  tableName: PropTypes.string,
};

export default AttitudeScoreTable;
