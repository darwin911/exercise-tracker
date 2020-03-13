import React, { useContext } from 'react';
import { ExercisesSummary } from '../ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../../Store';

import { AddExerciseButton } from '../AddExerciseButton';

const Loader = ({ size }) => (
  <div
    className='loader'
    style={{
      width: `${size}rem`,
      height: `${size}rem`,
      borderWidth: `${size + 2}px`,
    }}
  />
);

export const UserExercises = () => {
  const { user, loading } = useContext(AuthContext)[0];
  if (!loading) {
    return (
      <div className='user-exercises'>
        <ExercisesSummary username={user ? user.username : 'Guest'} />
        <div className='filter__container'>
          <FilterExercises />
          <AddExerciseButton />
        </div>
        <ExerciseList />
      </div>
    );
  }
  return <Loader size={4} />;
};
