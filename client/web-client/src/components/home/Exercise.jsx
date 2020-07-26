import React, { useContext, useState } from 'react';
import { deleteExercise } from '../../helper';
import moment from 'moment';
import { AppContext } from '../../Store';
import { CONSTANTS, EXERCISE_TYPES, TRANSITIONS } from '../../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CancelSVG } from '../shared/index';
const { REMOVE_EXERCISE, TOGGLE_MODAL } = CONSTANTS;

export const Exercise = ({ exercise }) => {
  const dispatch = useContext(AppContext)[1];

  const [deleting, setDeleting] = useState(false);
  const { id, note, duration, date, time, type, distance, repetitions } = exercise;

  const handleDelete = async (id) => {
    setDeleting(true);
    await deleteExercise(id);
    setDeleting(false);
    dispatch({ type: REMOVE_EXERCISE, payload: exercise });
  };

  const toggleEdit = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  const getEmoji = (type) => {
    switch (type) {
      case EXERCISE_TYPES.PUSH_UPS:
        return '💪';
      case EXERCISE_TYPES.YOGA:
        return '🧘';
      case EXERCISE_TYPES.RUN:
        return '🏃';
      case EXERCISE_TYPES.CYCLING:
        return '🚴🏻';
      case EXERCISE_TYPES.SWIMMING:
        return '🏊';
      default:
        return '';
    }
  };

  const ExerciseDuration = () =>
    type !== EXERCISE_TYPES.PUSH_UPS ? (
      <p className='exercise__duration'>
        {duration} <span>mins</span>
      </p>
    ) : (
      <p className='exercise__repetitions'>
        {repetitions} <span>reps</span>
      </p>
    );

  const ExerciseType = () => (
    <p className='exercise__type'>
      {type}
      <span>{getEmoji(type)}</span>
    </p>
  );

  const ExerciseNote = () => {
    if (!note) return null;
    return (
      <p className='exercise__note'>
        <span role='img' aria-label='Note'>
          📝
        </span>{' '}
        {note}
      </p>
    );
  };

  const ExerciseDistance = () => {
    if (!distance) return null;
    return (
      <p className='exercise__distance'>
        {distance} <span>miles</span>
      </p>
    );
  };

  const ExerciseDeleteButton = () => (
    <button className='btn delete' onClick={() => handleDelete(id)} disabled={deleting}>
      {deleting ? <div className='loader' /> : <CancelSVG />}
    </button>
  );

  const ExerciseEditButton = () => (
    <Link className='btn edit' onClick={() => toggleEdit()} to={`/home/edit/${id}`}>
      ✎
    </Link>
  );

  const className = type.toLowerCase().replace(/ /g, '-');

  return (
    <motion.div
      // this casuses flicker
      // positionTransition
      layoutTransition={TRANSITIONS.SPRING}
      className={`exercise ${className}`}
      initial={{ y: -10, opacity: 0.15 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -5, opacity: 0.15 }}
      tabIndex={0}>
      <div className='exercise__left-container'>
        <p className='exercise__day-of-week'>{moment.utc(date).format('dddd')}</p>
        <p className='exercise__date'>{moment.utc(date).format('MMM D')}</p>
        <p className='exercise__time'>{moment(time, 'Hmm').format('h:mm a')}</p>
        <ExerciseDuration />
        <ExerciseType />
        <ExerciseNote />
        <ExerciseDistance />
      </div>
      <div className='exercise__right-container'>
        <ExerciseDeleteButton id={id} deleting={deleting} handleDelete={handleDelete} />
        <ExerciseEditButton id={id} toggleEdit={toggleEdit} />
      </div>
    </motion.div>
  );
};
