import React, { useContext, useState } from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';
import { AuthContext } from '../Store';
import { REMOVE_EXERCISE } from '../constants';
import { motion } from 'framer-motion';

export const Exercise = ({ exercise }) => {
  const dispatch = useContext(AuthContext)[1];

  const [deleting, setDeleting] = useState(false);
  const { id, note, duration, date, type } = exercise;

  const handleDelete = async id => {
    setDeleting(true);
    await deleteExercise(id);
    setDeleting(false);
    dispatch({ type: REMOVE_EXERCISE, payload: id });
  };

  return (
    <motion.div
      positionTransition
      className={`exercise ${type.toLowerCase()}`}
      initial={{ y: -10, transformOrigin: 'center' }}
      animate={{ y: 0 }}
      exit={{ scale: 0, opacity: 0 }}>
      <div className='exercise__left-container'>
        <p className='exercise__date'>{moment(date).format('ddd MMM D')}</p>
        <p className='exercise__time'>{moment(date).format('h:mm a')}</p>
        <p className='exercise__duration'>
          {duration} <span>mins</span>
        </p>
        {type && (
          <p className='exercise__type'>
            {type} <span></span>
          </p>
        )}
        {note && (
          <p className='exercise__note'>
            <span role='img' aria-label='Note'>
              📝
            </span>{' '}
            {note}
          </p>
        )}
      </div>
      <div className='exercise__right-container'>
        <button className='btn delete' onClick={() => handleDelete(id)} disabled={deleting}>
          {deleting ? <div className='loader' /> : <i style={{ fontStyle: 'normal' }}>&#x2212;</i>}
        </button>
      </div>
    </motion.div>
  );
};
