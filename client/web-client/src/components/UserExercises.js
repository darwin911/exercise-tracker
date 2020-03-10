import React, { useContext } from 'react';
import { TOGGLE_MODAL } from '../constants';
import { ExercisesSummary } from './ExercisesSummary';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../Store';
import { useHistory } from 'react-router-dom';

export const UserExercises = () => {
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const { user, exercises, loading } = state;

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
    history.push('/home/add');
  };

  if (!loading) {
    return (
      <div className='user-exercises'>
        <ExercisesSummary username={user ? user.username : 'Guest'} />
        <hr />
        <div className='exercises__container'>
          <ExerciseList exercises={exercises} />
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
