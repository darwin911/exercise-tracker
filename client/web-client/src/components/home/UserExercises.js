import React, { useContext, useState, useEffect } from 'react';
import { ExercisesSummary } from './ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { ExerciseList } from './ExerciseList';
import { Loader } from '../Loader';
import { AddExerciseButton } from '../AddExerciseButton';
import { AuthContext } from '../../Store';

export const UserExercises = () => {
  const { user, exercises, loading, filter } = useContext(AuthContext)[0];

  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredExercises(exercises);
      return;
    }

    setFilteredExercises(filterExercisesByType(filter, exercises));
  }, [filter, exercises]);

  const minutes = getTotalMinutes(filteredExercises);
  const count = filteredExercises.length;
  const miles = getTotalMiles(filteredExercises);
  const data = {
    minutes,
    count,
    miles,
  };

  const Dashboard = () => (
    <aside className='dashboard'>
      <ExercisesSummary username={user ? user.username : 'Guest'} {...data} />
      <div className='filter__container'>
        <FilterExercises />
        <AddExerciseButton />
      </div>
    </aside>
  );

  if (!loading) {
    return (
      <section className='user-exercises'>
        <Dashboard />
        <ExerciseList exercises={filteredExercises} />
      </section>
    );
  }
  return <Loader size={4} />;
};

const filterExercisesByType = (value = 'All', exerciseCollection) => {
  if (value === 'All') return exerciseCollection;
  return exerciseCollection.filter(ex => ex.type === value);
};

const getTotalMiles = exerciseCollection => {
  return (
    Math.round(
      exerciseCollection
        .filter(exercise => exercise.distance)
        .reduce((acc, item) => acc + item.distance, 0) * 100
    ) / 100
  );
};

const getTotalMinutes = exerciseCollection => {
  return exerciseCollection.reduce((total, exercise) => total + exercise.duration, 0);
};
