import { Dashboard, ExerciseList } from "./index";
import React, { useContext, useEffect, useState } from "react";
import {
  filterExercisesByActivity,
  filterExercisesByDate,
  filterExercisesByType,
  getTotalMiles,
  getTotalMinutes,
  getTotalPushups,
} from "../../util/exercises-helper";

import { ACTIVITY_TYPES } from "../../constants";
import { AppContext } from "../../Store";

const activityTypes = Object.values(ACTIVITY_TYPES).map((type) => type.title);

export const UserExercises = () => {
  const { exercises, loading, filterByType, filterByDate } =
    useContext(AppContext)[0];
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (filterByType === "ALL" && filterByDate === "All Time") {
      setFilteredExercises(exercises);
    } else if (filterByType === "ALL") {
      let filteredExercises = filterExercisesByDate(exercises, filterByDate);
      setFilteredExercises(filteredExercises);
    } else {
      const isActivityType =
        activityTypes.indexOf(filterByType.replace(/_/g, " ")) !== -1;
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

  return (
    <section className="user-exercises">
      <Dashboard data={data} />
      <ExerciseList exercises={filteredExercises} />
    </section>
  );
};
