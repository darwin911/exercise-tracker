import React, { useContext, useState } from 'react';
import { TOGGLE_MODAL } from '../constants';
import { ExercisesSummary } from './ExercisesSummary';
import { FilterExercises } from './FilterExercises';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../Store';
import { useHistory } from 'react-router-dom';

export const UserExercises = () => {
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const { user, exercises, loading } = state;

  const [filter, setFilter] = useState('All');

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
    history.push('/home/add');
  };

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
        <FilterExercises filter={filter} setFilter={setFilter} />
        <div className='exercises__container'>
          <ExerciseList exercises={filterExercises(filter)} />
          <div style={{ gridColumn: '1 / -1' }}>
            <button className='btn toggle-form' onClick={() => toggleModal()}>
              Add Exercise
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className='loader'></div>;
  }
};
