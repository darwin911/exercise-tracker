import React, { useContext, useState } from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';
import { AuthContext } from '../Store';
import { REMOVE_EXERCISE } from '../constants';

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
    <div className='exercise'>
      <div className='exercise__left-container'>
        <p className='exercise__duration'>{duration} mins</p>
        <p className='exercise__date'>
          {moment(date).format('h:mm a | MMM Do')}
        </p>
        <p className='exercise__note'>
          <span role='img' aria-label='Note'>
            📝
          </span>{' '}
          {note}
        </p>
      </div>
      <div className='exercise__right-container'>
        <button
          className='btn delete'
          onClick={() => handleDelete(_id)}
          disabled={deleting}>
          {deleting ? <div className='loader' /> : 'Delete'}
        </button>
      </div>
    </div>
  );
};
