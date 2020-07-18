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
