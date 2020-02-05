import React from 'react';
import { deleteExercise } from '../helper';

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
      <p>Duration: {duration}</p>
      <p>Date: {date}</p>
      <button onClick={() => handleDelete(_id)}>Delete</button>
    </div>
  );
};
