import React from 'react';

export const Exercise = ({ exercise }) => {
  const { _id, username, note, duration, date } = exercise;

  const handleDelete = async id => {
    const response = await fetch(`http://localhost:5000/exercises/${id}`, {
      method: 'DELETE'
    });
    console.log(await response.json());
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
