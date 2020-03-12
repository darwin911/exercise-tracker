import React, { useContext } from 'react';
import { ExercisesSummary } from '../ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../../Store';

import { AddExerciseButton } from '../AddExerciseButton';

export const UserExercises = ({ exercises }) => {
  const { user, loading } = useContext(AuthContext)[0];

  if (loading) return <div className='loader' style={{ width: '5em', height: '5em' }} />;

  return (
    <div className='user-exercises'>
      <ExercisesSummary username={user ? user.username : 'Guest'} exercises={exercises} />
      <div className='filter__container'>
        <FilterExercises />
        <AddExerciseButton />
      </div>
      <ExerciseList exercises={exercises} />
    </div>
  );
};
