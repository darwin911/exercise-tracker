import React, { useContext, useState } from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';
import { AuthContext } from '../Store';
import { REMOVE_EXERCISE } from '../constants';
import { motion } from 'framer-motion';

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
    <motion.div
      className='exercise'
      initial={{ y: 0 }}
      animate={{ y: 10 }}
      exit={{ x: '-100%' }}>
      <div className='exercise__left-container'>
        <p className='exercise__date'>{moment(date).format('MMM Do')}</p>
        <p className='exercise__time'>{moment(date).format('h:mm a')}</p>
        <p className='exercise__duration'>
          {duration} <span>mins</span>
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
          {deleting ? (
            <div className='loader' />
          ) : (
            <i style={{ fontStyle: 'normal' }}>&#x2212;</i>
          )}
        </button>
      </div>
    </motion.div>
  );
};
