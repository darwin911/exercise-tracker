import React, { useContext } from 'react';
import { Exercise } from './Exercise';
import { AddExercise } from './AddExercise';
import { AuthContext } from '../Store';

export const UserExercises = () => {
  const state = useContext(AuthContext)[0];
  const { user, exercises, loading } = state;

  if (!loading) {
    return (
      <div className='user-exercises'>
        {user && <h4>{user ? user.username : 'Guest'}'s Exercises</h4>}
        {exercises.map(exercise => (
          <Exercise key={exercise._id} exercise={exercise} />
        ))}
        <hr />
        <AddExercise />
      </div>
    );
  } else {
    return <div className='loader'></div>;
  }
};
