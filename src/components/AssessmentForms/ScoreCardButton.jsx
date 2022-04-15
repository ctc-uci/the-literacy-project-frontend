import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

const ScoreCardButton = ({ editState, setEditState }) => {
  // Edit states: newInput, editing, editExisting
  const setAsEditing = e => {
    e.preventDefault();
    setEditState('editing');
  };
  if (editState === 'newInput') {
    return (
      <Button as="button" type="button" variant="warning" onClick={e => setAsEditing(e)}>
        Input Scores +
      </Button>
    );
  }
  if (editState === 'editing') {
    return (
      <Button as="button" type="submit" variant="success">
        <IoCheckmarkDoneOutline />
        Submit Scores
      </Button>
    );
  }
  return (
    <Button as="button" type="button" variant="primary" onClick={e => setAsEditing(e)}>
      Edit Scores
    </Button>
  );
};

ScoreCardButton.propTypes = {
  editState: PropTypes.string.isRequired,
  setEditState: PropTypes.func.isRequired,
};

export default ScoreCardButton;
