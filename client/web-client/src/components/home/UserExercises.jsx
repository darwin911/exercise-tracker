import React, { useContext, useState, useEffect } from 'react';
import { ExercisesSummary } from './ExercisesSummary';
import { FilterExercises } from '../FilterExercises';
import { ExerciseList } from './ExerciseList';
import { AddExerciseButton } from '../AddExerciseButton';
import { AuthContext } from '../../Store';
import { Loader } from '../Loader';
import { ACTIVITY_TYPES } from '../../constants';
import moment from 'moment';

const activityTypes = Object.values(ACTIVITY_TYPES).map((type) => type.title);

export const UserExercises = () => {
  const { user, exercises, loading, filterByType, filterByDate } = useContext(AuthContext)[0];

  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (filterByType === 'ALL' && filterByDate === 'All Time') {
      setFilteredExercises(exercises);
    } else {
      const isActivityType = activityTypes.indexOf(filterByType.replace(/_/g, ' ')) !== -1;

      let exercisesToUpdate = isActivityType
        ? filterExercisesByActivity(filterByType, exercises)
        : filterExercisesByType(filterByType, exercises);

      exercisesToUpdate = filterExercisesByDate(
        (exercisesToUpdate.length && exercisesToUpdate) || exercises,
        filterByDate
      );

      setFilteredExercises(exercisesToUpdate);
    }
  }, [filterByType, filterByDate, exercises]);

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

  if (!exercises.length) {
    return <Loader size={8} />;
  }

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

const filterExercisesByType = (value, exercisesArray) =>
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

const filterExercisesByDate = (exercises, dateFilter) => {
  let thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
  let sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
  let threeDaysAgo = moment().subtract(3, 'day').format('YYYY-MM-DD');
  let yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
  let today = moment().format('YYYY-MM-DD');
  switch (dateFilter) {
    case 'Last 30 Days':
      return exercises.filter((exercise) =>
        moment(exercise.date, 'YYYY-MM-DD').isSameOrAfter(thirtyDaysAgo)
      );
    case 'Last 7 Days':
      return exercises.filter((exercise) =>
        moment(exercise.date, 'YYYY-MM-DD').isSameOrAfter(sevenDaysAgo)
      );
    case 'Last 3 Days':
      return exercises.filter((exercise) =>
        moment(exercise.date, 'YYYY-MM-DD').isSameOrAfter(threeDaysAgo)
      );
    case 'Yesterday':
      return exercises.filter((exercise) =>
        moment(exercise.date, 'YYYY-MM-DD').isSameOrAfter(yesterday)
      );
    case 'Today':
      return exercises.filter((exercise) =>
        moment(exercise.date, 'YYYY-MM-DD').isSameOrAfter(today)
      );
    default:
      return exercises;
  }
};
