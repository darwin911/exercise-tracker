import React, { useContext, useState } from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';
import { AuthContext } from '../Store';
import { REMOVE_EXERCISE, LOADING } from '../constants';

export const Exercise = ({ exercise }) => {
  const dispatch = useContext(AuthContext)[1];

  const [deleting, setDeleting] = useState(false);
  const { _id, note, duration, date } = exercise;

  const handleDelete = async id => {
    setDeleting(true);
    await deleteExercise(id);
    dispatch({ type: REMOVE_EXERCISE, payload: id });
    setDeleting(false);
  };

  return (
    <div>
      <p>Duration: {duration} mins</p>
      <p>Date: {moment(date).format('h:mm a | MMM Do')}</p>
      <p>Note: {note}</p>
      <button
        className='btn delete'
        onClick={() => handleDelete(_id)}
        disabled={deleting}>
        {deleting ? <div className='loader' /> : 'Delete'}
      </button>
    </div>
  );
};
