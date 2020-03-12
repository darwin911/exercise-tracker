import React, { useContext, useState } from 'react';
import { ExercisesSummary } from '../ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../../Store';

import { AddExerciseButton } from '../AddExerciseButton';

export const UserExercises = () => {
  const { user, exercises, loading } = useContext(AuthContext)[0];

  const [filter, setFilter] = useState('All');

  const filterExercises = filter => {
    const result = exercises.filter(ex => ex.type === filter);
    if (filter === 'All') return exercises;
    return result;
  };

  if (!loading) {
    return (
      <div className='user-exercises'>
        <ExercisesSummary username={user ? user.username : 'Guest'} />
        <hr />
        <div className='filter__container'>
          <FilterExercises filter={filter} setFilter={setFilter} />
          <AddExerciseButton />
        </div>
        <ExerciseList exercises={filterExercises(filter)} />
      </div>
    );
  } else {
    return <div className='loader'></div>;
  }
};
