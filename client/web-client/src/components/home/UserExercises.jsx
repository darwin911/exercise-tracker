import React, { useContext, useState, useEffect } from 'react';
import { ExerciseList } from './ExerciseList';
import { AppContext } from '../../Store';
import { Loader } from '../Loader';
import { Dashboard } from './Dashboard';
import { ACTIVITY_TYPES } from '../../constants';
import {
  getTotalPushups,
  getTotalMinutes,
  getTotalMiles,
  filterExercisesByActivity,
  filterExercisesByType,
  filterExercisesByDate,
} from '../../util/exercises-helper';

const activityTypes = Object.values(ACTIVITY_TYPES).map((type) => type.title);

export const UserExercises = () => {
  const { exercises, loading, filterByType, filterByDate } = useContext(AppContext)[0];
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (filterByType === 'ALL' && filterByDate === 'All Time') {
      setFilteredExercises(exercises);
    } else if (filterByType === 'ALL') {
      let filteredExercises = filterExercisesByDate(exercises, filterByDate);
      setFilteredExercises(filteredExercises);
    } else {
      const isActivityType = activityTypes.indexOf(filterByType.replace(/_/g, ' ')) !== -1;
      let exercisesToUpdate = isActivityType
        ? filterExercisesByActivity(filterByType, exercises)
        : filterExercisesByType(filterByType, exercises);
      exercisesToUpdate = filterExercisesByDate(
        (exercisesToUpdate.length && exercisesToUpdate) || exercisesToUpdate,
        filterByDate
      );
      setFilteredExercises(exercisesToUpdate);
    }
  }, [filterByType, filterByDate, exercises]);

  if (loading) return null;

  const minutes = getTotalMinutes(filteredExercises);
  const count = filteredExercises.length;
  const miles = getTotalMiles(filteredExercises);
  const pushUps = getTotalPushups(filteredExercises);
  const data = {
    minutes,
    count,
    miles,
    pushUps,
  };

  if (!exercises.length) {
    return <Loader size={8} />;
  }

  return (
    <section className='user-exercises'>
      <Dashboard data={data} />
      <ExerciseList exercises={filteredExercises} />
    </section>
  );
};
