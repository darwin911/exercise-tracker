import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AppContext } from '../../Store';
import { AddExerciseModal, EditExerciseModal, CreateWorkoutModal, UserExercises } from './index';
// import { Workouts } from './Workouts';
import { Loader } from '../shared/index';

export const Home = () => {
  const [{ exercises, loading }] = useContext(AppContext);
  return !loading ? (
    <main className={`container`}>
      {/* <Workouts /> */}
      <UserExercises />
      <Route path='/home/add' render={() => <AddExerciseModal />} />
      <Route
        path='/home/edit/:exerciseId'
        render={({ match }) => {
          const { exerciseId } = match.params;
          const [editExercise] = exercises.filter((ex) => ex.id === exerciseId);
          if (!editExercise) return null;
          return <EditExerciseModal exercise={editExercise} />;
        }}
      />
      <Route path='/home/create-workout' render={() => <CreateWorkoutModal />} />
    </main>
  ) : (
    <Loader size={8} />
  );
};
