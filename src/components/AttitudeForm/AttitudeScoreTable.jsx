import React, { useState } from 'react';
import './AttitudeForm.css';
import PropTypes from 'prop-types';

import AttitudeScoreTableRow from './AttitudeScoreTableRow';

function AttitudeScoreTable({ tableName }) {
  const [recTotal, setRecTotal] = useState(0);
  const [academicTotal, setAcademicTotal] = useState(0);

  const [scoreTableRow, setScoreTableRow] = useState([
    ...Array(10)
      .fill()
      .map(() => ({ recVal: 0, academicVal: 0 })),
  ]);

  const setRecAndAcademicTotal = arr => {
    let totalRec = 0;
    let totalAcademic = 0;
    for (let i = 0; i < arr.length; i += 1) {
      totalRec += arr[i].recVal;
      totalAcademic += arr[i].academicVal;
    }
    setRecTotal(totalRec);
    setAcademicTotal(totalAcademic);
  };

  const handleScoreTableRow = (recVal, academicVal, ind) => {
    const updatedArr = [...scoreTableRow];
    updatedArr[ind].recVal = parseInt(recVal, 10);
    updatedArr[ind].academicVal = parseInt(academicVal, 10);

    setScoreTableRow(updatedArr);
    setRecAndAcademicTotal(updatedArr);
  };

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
        {scoreTableRow.map((_, i) => (
          <AttitudeScoreTableRow
            setScoreTable={handleScoreTableRow}
            key={`score-row-${i + 1}`}
            rowNumber={i + 1}
          />
        ))}

        <tr>
          <td>Recreational Total: {recTotal}</td>
          <td>Academic Total: {academicTotal}</td>
        </tr>

        <tr> Total Both Scores: {recTotal + academicTotal} </tr>
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
