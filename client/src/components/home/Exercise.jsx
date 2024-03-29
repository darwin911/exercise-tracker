import { CONSTANTS, EXERCISE_TYPES, TRANSITIONS } from "../../constants";
import React, { useContext, useState } from "react";

import { AppContext } from "../../Store";
import { CancelSVG } from "../shared/index";
import { Link } from "react-router-dom";
import { deleteExercise } from "../../helper";
import kebabCase from "lodash/kebabCase";
import moment from "moment";
import { motion } from "framer-motion";

const { REMOVE_EXERCISE, TOGGLE_MODAL } = CONSTANTS;

export const Exercise = ({ exercise }) => {
  const [{ user }, dispatch] = useContext(AppContext);

  const [deleting, setDeleting] = useState(false);
  const { id, note, duration, date, time, type, distance, repetitions } =
    exercise;

  const handleDelete = async (id) => {
    setDeleting(true);
    await deleteExercise(id);
    setDeleting(false);
    dispatch({ type: REMOVE_EXERCISE, payload: exercise });
  };

  const toggleEdit = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  const ExerciseDuration = () =>
    type !== EXERCISE_TYPES.PUSH_UPS ? (
      <p className="exercise__duration">
        {duration} <span>mins</span>
      </p>
    ) : (
      <p className="exercise__repetitions">
        {repetitions} <span>reps</span>
      </p>
    );

  const ExerciseType = () => <p className="exercise__type">{type}</p>;

  const ExerciseNote = () => {
    if (!note) return null;
    return (
      <p className="exercise__note">
        <span role="img" aria-label="Note">
          📝
        </span>{" "}
        {note}
      </p>
    );
  };

  const ExerciseDistance = () => {
    if (!distance) return null;
    return (
      <p className="exercise__distance">
        {distance} <span>miles</span>
      </p>
    );
  };

  const ExerciseDeleteButton = () => (
    <button
      className="btn delete"
      onClick={() => handleDelete(id)}
      disabled={deleting}
    >
      {deleting ? <div className="loader" /> : <CancelSVG />}
    </button>
  );

  const ExerciseEditButton = () => (
    <Link
      className="btn edit"
      onClick={() => toggleEdit()}
      to={`/home/${user.id}/edit/${id}`}
    >
      ✎
    </Link>
  );

  const ExerciseDateAndTime = () => {
    const exerciseDate = moment.utc(date).format("MMM D");
    const exerciseTime = moment(time, "Hmm").format("h:mm a");
    return (
      <>
        <p className="exercise__day-of-week">
          {moment.utc(date).format("ddd")}
        </p>
        <p className="exercise__date">{exerciseDate}</p>
        <p className="exercise__time">{exerciseTime}</p>
      </>
    );
  };

  return (
    <motion.div
      layoutTransition={TRANSITIONS.SPRING}
      className={`exercise ${kebabCase(type)}`}
      initial={{ y: -10, opacity: 0.15 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -5, opacity: 0.15 }}
      tabIndex={0}
    >
      <div className="exercise__left-container">
        <ExerciseDateAndTime />
        <ExerciseDuration />
        <ExerciseType />
        <ExerciseNote />
        <ExerciseDistance />
      </div>
      <div className="exercise__right-container">
        <ExerciseDeleteButton
          id={id}
          deleting={deleting}
          handleDelete={handleDelete}
        />
        <ExerciseEditButton id={id} toggleEdit={toggleEdit} />
      </div>
    </motion.div>
  );
};
