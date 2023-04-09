import moment from 'moment';

export const getTotalPushups = (exercisesArray) =>
  exercisesArray.reduce(
    (acc, item) => (item.repetitions ? acc + Number(item.repetitions) : acc),
    0
  );

export const getTotalMinutes = (exercisesArray) => {
  return exercisesArray.reduce((acc, item) => (item.duration ? acc + item.duration : acc), 0);
};

export const filterExercisesByActivity = (value, exercisesArray) => {
  let val = value.toUpperCase().replace(/ /g, '_');
  return exercisesArray.filter((ex) => ex.activityType === val);
};

export const filterExercisesByType = (value, exercisesArray) =>
  exercisesArray.filter((ex) => ex.type.toUpperCase() === value.toUpperCase());

export const getTotalMiles = (exercisesArray) => {
  return (
    Math.round(
      exercisesArray.reduce((acc, item) => (item.distance ? acc + item.distance : acc), 0) * 100
    ) / 100
  );
};

export const filterExercisesByDate = (exercises, dateFilter) => {
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
