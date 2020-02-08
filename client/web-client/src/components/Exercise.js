import React from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';

export const Exercise = ({ exercise, setExercises }) => {
  const { _id, note, duration, date } = exercise;

  const handleDelete = async id => {
    const resp = await deleteExercise(id);

    setExercises(prevState => [
      ...prevState.filter(exercise => exercise._id !== id)
    ]);
  };

  return (
    <div>
      <p>Duration: {duration} mins</p>
      <p>Date: {moment(date).format('h:mm a | MMM Do')}</p>
      <p>Note: {note}</p>
      <button className='btn delete' onClick={() => handleDelete(_id)}>
        Delete
      </button>
    </div>
  );
};
