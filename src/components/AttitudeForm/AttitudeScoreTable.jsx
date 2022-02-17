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
      <form className="testDateForm">
        <p style={{ textAlign: 'left', fontSize: '18px', margin: '0px 8px 0px 0px' }}>
          {' '}
          {tableName}{' '}
        </p>
        <input className="dateInput" type="date" min="0" max="4" name="testDate" />
      </form>

      <table className="attTable">
        <tr>
          <th className="attTh">Recreational Reading</th>
          <th className="attTh">Academic Reading</th>
        </tr>

        {/* AUTOMATE ROW CREATION */}
        {scoreTableRow.map((_, i) => (
          <AttitudeScoreTableRow
            setScoreTable={handleScoreTableRow}
            key={`score-row-${i + 1}`}
            rowNumber={i + 1}
          />
        ))}
      </table>

      <table className="attTable" style={{ marginTop: '13px' }}>
        <tr>
          <th className="totTh"> Total: {recTotal}</th>
          <th className="totTh"> Total: {academicTotal}</th>
        </tr>

        <tr className="totals"> Total of Both: {recTotal + academicTotal} </tr>
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
