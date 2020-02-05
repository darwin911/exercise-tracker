import React from 'react';
import { deleteExercise } from '../helper';
import moment from 'moment';

export const Exercise = ({ exercise }) => {
  const { _id, username, note, duration, date } = exercise;

  const handleDelete = async id => {
    const resp = await deleteExercise(id);
    console.log(resp);
  };

  return (
    <div>
      <p>Username: {username}</p>
      <p>ID: {_id}</p>
      <p>Note: {note}</p>
      <p>Duration: {duration} mins</p>
      <p>Date: {moment(date).format('h:mm a | MMM Do')}</p>
      <button onClick={() => handleDelete(_id)}>Delete</button>
    </div>
  );
};
