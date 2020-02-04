import React from 'react';

export const Exercise = ({ exercise, handleDelete }) => {
  const { _id, username, note, duration, date } = exercise;

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
