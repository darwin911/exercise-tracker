import * as Yup from "yup";

import { CONSTANTS, EXERCISE_TYPES, TRANSITIONS } from "../../constants";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useContext, useState } from "react";

import { AppContext } from "../../Store";
import { addExercise } from "../../helper";
import { createPortal } from "react-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { ADD_EXERCISE, TOGGLE_MODAL } = CONSTANTS;
const { PUSH_UPS, RUN } = EXERCISE_TYPES;

const DOMRoot = document.querySelector("#root");

export const AddExerciseModal = () => {
  const [state, dispatch] = useContext(AppContext);
  const { user } = state;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    const newExercise = await addExercise({
      userId: user.id,
      username: user.username,
      ...values,
    });

    if (newExercise) {
      dispatch({ type: ADD_EXERCISE, payload: newExercise });
    }

    dispatch({ type: TOGGLE_MODAL });
    setLoading(false);
    navigate(`/home/${user.username}`);
  };

  const closeModal = () => {
    navigate(`/home/${user.username}`);
  };

  const initValues = {
    date: moment().format(moment.HTML5_FMT.DATE),
    time: moment().format(moment.HTML5_FMT.TIME),
    type: "",
    duration: "",
    distance: "",
    repetitions: "",
    note: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Pick One"),
  });

  return createPortal(
    <motion.aside
      className="add-exercise__modal"
      initial={{ x: "-10%", opacity: 0.15 }}
      animate={{ x: "0", opacity: 1 }}
      transition={TRANSITIONS.SPRING}
    >
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => {
          const { type, date, duration, distance, note, repetitions, time } =
            values;
          const addButtonDisabledState =
            loading ||
            !type ||
            (type !== PUSH_UPS && !duration) ||
            (type === PUSH_UPS && !repetitions) ||
            (type === RUN && !distance);
          return (
            <form className="add-exercise" onSubmit={handleSubmit}>
              <h2>Log New Exercise</h2>
              <br />
              <hr className="divider" />

              <div className="form-field type">
                <label htmlFor="type">Type:</label>
                <ErrorMessage name="type">
                  {(msg) => (
                    <motion.span
                      initial={{ transform: "rotate3d(1, 0, 0, 0.25turn)" }}
                      animate={{ transform: "rotate3d(1, 0, 0, 0turn)" }}
                      className="error"
                    >
                      {msg}
                    </motion.span>
                  )}
                </ErrorMessage>
                <Field
                  className={`${
                    errors.type && touched.type ? "input-error" : null
                  }`}
                  autoFocus
                  as="select"
                  id="type"
                  name="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={type}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  {Object.values(EXERCISE_TYPES).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-field date">
                <label htmlFor="date">Date:</label>
                <Field
                  id="date"
                  name="date"
                  type="date"
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={date}
                  max={moment().format(moment.HTML5_FMT.DATE)}
                  required
                />
              </div>

              <div className="form-field time">
                <label htmlFor="time">Time:</label>
                <Field
                  id="time"
                  name="time"
                  type="time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={time}
                  required
                />
              </div>

              {type !== PUSH_UPS ? (
                <div className="form-field duration">
                  <label htmlFor="duration">Duration: </label>
                  <ErrorMessage name="duration">
                    {(msg) => (
                      <motion.span
                        initial={{ transform: "rotate3d(1, 0, 0, 0.25turn)" }}
                        animate={{ transform: "rotate3d(1, 0, 0, 0turn)" }}
                        className="error"
                      >
                        {msg}
                      </motion.span>
                    )}
                  </ErrorMessage>
                  <Field
                    className={`${
                      errors.duration && touched.duration ? "input-error" : null
                    }`}
                    id="duration"
                    name="duration"
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    min={1}
                    max={360}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={duration}
                  />
                  <label htmlFor="duration">min{duration > 1 && "s"}</label>
                </div>
              ) : (
                <div className="form-field repetitions">
                  <label htmlFor="repetitions">Repetitions: </label>
                  <Field
                    id="repetitions"
                    name="repetitions"
                    type="number"
                    min={1}
                    max={9999}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={repetitions}
                  />
                </div>
              )}

              {type === RUN ? (
                <div className="form-field distance">
                  <label htmlFor="distance">Distance: </label>
                  <Field
                    id="distance"
                    name="distance"
                    type="number"
                    placeholder="0.0"
                    step={0.1}
                    min={0.1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={distance}
                    required
                  />
                  <label htmlFor="distance">mi</label>
                </div>
              ) : null}

              <div className="form-field note">
                <label htmlFor="note">Note: </label>
                <Field
                  id="note"
                  as="textarea"
                  rows="2"
                  maxLength="999"
                  name="note"
                  type="text"
                  placeholder="Felt great!"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  value={note}
                />
              </div>

              <div className="form-field buttons-container">
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => closeModal()}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn add"
                  onClick={handleSubmit}
                  disabled={addButtonDisabledState}
                >
                  {loading ? <div className="loader" /> : "Add"}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </motion.aside>,
    DOMRoot
  );
};
