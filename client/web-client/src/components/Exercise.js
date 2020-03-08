import React, { useContext, useState } from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';
import { AuthContext } from '../Store';
import { REMOVE_EXERCISE, LOAD_EDIT_EXERCISE } from '../constants';
import { motion } from 'framer-motion';

export const Exercise = ({ exercise }) => {
  const dispatch = useContext(AuthContext)[1];

  const [deleting, setDeleting] = useState(false);
  const { id, note, duration, date, time, type, distance } = exercise;

  const handleDelete = async id => {
    setDeleting(true);
    await deleteExercise(id);
    setDeleting(false);
    dispatch({ type: REMOVE_EXERCISE, payload: exercise });
  };

  const toggleEdit = () => {
    dispatch({ type: LOAD_EDIT_EXERCISE, payload: exercise });
  };

  return (
    <motion.div
      positionTransition
      className={`exercise ${type.toLowerCase()}`}
      initial={{ y: -10, transformOrigin: 'center' }}
      animate={{ y: 0 }}
      exit={{ scale: 0, opacity: 0 }}>
      <div className='exercise__left-container'>
        <p className='exercise__day-of-week'>{moment(date).format('ddd')}</p>
        <p className='exercise__date'>{moment(date).format('MMM D')}</p>
        <p className='exercise__time'>{moment(time, 'Hmm').format('hh:mm a')}</p>
        <p className='exercise__duration'>
          {duration} <span>mins</span>
        </p>
        <p className='exercise__type'>{type}</p>
        {note && (
          <p className='exercise__note'>
            <span role='img' aria-label='Note'>
              📝
            </span>{' '}
            {note}
          </p>
        )}
        {distance && (
          <p className='exercise__distance'>
            {distance} <span>miles</span>
          </p>
        )}
      </div>
      <div className='exercise__right-container'>
        <button className='btn delete' onClick={() => handleDelete(id)} disabled={deleting}>
          {deleting ? <div className='loader' /> : '✖'}
        </button>
        <button className='btn edit' onClick={() => toggleEdit()}>
          ✎
        </button>
      </div>
    </motion.div>
  );
};
