import React, { useContext, useState, useEffect } from 'react';
import { ExercisesSummary } from './ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { ExerciseList } from './ExerciseList';
import { AddExerciseButton } from '../AddExerciseButton';
import { AuthContext } from '../../Store';
import { ACTIVITY_TYPES } from '../../constants';

const activityTypes = Object.values(ACTIVITY_TYPES).map((type) => type.title);

export const UserExercises = () => {
  const { user, exercises, loading, filter } = useContext(AuthContext)[0];

  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredExercises(exercises);
      return;
    }

    const isActivityType = activityTypes.indexOf(filter.replace(/_/g, ' ')) !== -1;

    let exercisesToUpdate = isActivityType
      ? filterExercisesByActivity(filter, exercises)
      : filterExercisesByType(filter, exercises);

    setFilteredExercises(exercisesToUpdate);
  }, [filter, exercises]);

  if (loading) return null;

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

  return (
    <section className='user-exercises'>
      <Dashboard />
      <ExerciseList exercises={filteredExercises} />
    </section>
  );
};

const filterExercisesByActivity = (value, exercisesArray) => {
  let val = value.toUpperCase().replace(/ /g, '_');
  return exercisesArray.filter((ex) => ex.activityType === val);
};

const filterExercisesByType = (value = 'ALL', exercisesArray) =>
  exercisesArray.filter((ex) => ex.type.toUpperCase() === value.toUpperCase());

const getTotalMiles = (exercisesArray) => {
  return (
    Math.round(
      exercisesArray.reduce((acc, item) => (item.distance ? acc + item.distance : acc), 0) * 100
    ) / 100
  );
};

const getTotalMinutes = (exercisesArray) => {
  return exercisesArray.reduce((acc, item) => (item.duration ? acc + item.duration : acc), 0);
};
