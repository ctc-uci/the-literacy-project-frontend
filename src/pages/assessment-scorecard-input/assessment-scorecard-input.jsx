import React from 'react';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import './assessment-scorecard-input.css';

const AssessmentScorecardInput = () => {
  return (
    <div className="buttons">
      <div className="div">
        <div className="overhead">
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Assessment Score Card</div>
          <div className="test-date">
            <div>Pre-Test Date:</div>
            <input placeholder="input date here" />
          </div>
        </div>
        <AssessmentScoreCard name="preTest" />
        <div className="test-date" style={{ marginRight: '310px', marginTop: '50px' }}>
          <div>Post-Test Date:</div>
          <input placeholder="input date here" />
        </div>
        <AssessmentScoreCard name="postTest" />
      </div>
      <button type="button" className="btn btn-dark">
        EDIT
      </button>
      <button type="button" className="btn btn-dark">
        SAVE
      </button>
    </div>
  );
};

export default AssessmentScorecardInput;
