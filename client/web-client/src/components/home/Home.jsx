import React, { useContext } from 'react';
import { UserExercises } from './UserExercises';
import { AddExerciseModal } from './AddExerciseModal';
import { EditExerciseModal } from './EditExerciseModal';
import { CreateWorkoutModal } from './CreateWorkoutModal';
import { Loader } from '../Loader';
import { Workouts } from './Workouts';
import { Route } from 'react-router-dom';
import { AuthContext } from '../../Store';

export const Home = () => {
  const [{ user, exercises }] = useContext(AuthContext);
  return user ? (
    <main className={`container`}>
      <Workouts />
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
