import React, { useContext, useState } from 'react';
import { deleteExercise } from '../../helper';
import moment from 'moment';
import { AuthContext } from '../../Store';
import { REMOVE_EXERCISE, TOGGLE_MODAL } from '../../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CancelSVG } from '../CancelSVG';

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
    dispatch({ type: TOGGLE_MODAL });
  };

  const ExerciseDuration = () => (
    <p className='exercise__duration'>
      {duration} <span>mins</span>
    </p>
  );

  const ExerciseType = () => <p className='exercise__type'>{type}</p>;

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

  return (
    <motion.div
      positionTransition
      className={`exercise ${type.toLowerCase()}`}
      initial={{ y: -10, opacity: 0.35 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0.35 }}>
      <div className='exercise__left-container'>
        <p className='exercise__day-of-week'>{moment(date).format('dddd')}</p>
        <p className='exercise__date'>{moment(date).format('MMM D')}</p>
        <p className='exercise__time'>{moment(time, 'Hmm').format('h:mm a')}</p>
        <ExerciseDuration duration={duration} />
        <ExerciseType type={type} />
        <ExerciseNote note={note} />
        <ExerciseDistance distance={distance} />
      </div>
      <div className='exercise__right-container'>
        <ExerciseDeleteButton id={id} deleting={deleting} handleDelete={handleDelete} />
        <ExerciseEditButton id={id} toggleEdit={toggleEdit} />
      </div>
    </motion.div>
  );
};
