import React, { useContext } from 'react';
import { ExercisesSummary } from './ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { AddExerciseButton } from '../AddExerciseButton';
import { AppContext } from '../../Store';

export const Dashboard = ({ data }) => {
  const [{ user }] = useContext(AppContext);
  return (
    <aside className='dashboard'>
      <ExercisesSummary username={user ? user.username : 'Guest'} {...data} />
      <div className='filter__container'>
        <FilterExercises />
        <AddExerciseButton />
      </div>
    </aside>
  );
};
