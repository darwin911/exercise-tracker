import * as Yup from "yup";

import { AuthLink, FormField } from "./index";
import React, { useContext } from "react";

import { AppContext } from "../../Store";
import { CONSTANTS } from "../../constants";
import { Formik } from "formik";
import { registerUser } from "../../helper";
import { useNavigate } from "react-router-dom";

const { SET_USER } = CONSTANTS;

export const RegisterForm = () => {
  const dispatch = useContext(AppContext)[1];
  const navigate = useNavigate();
  const registerValidation = Yup.object({
    name: Yup.string()
      .min(1, "At least 1 character")
      .max(255, "Must be 255 characters or less")
      .required("Name is Required"),
    username: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Username is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(4, "Must be 4 characters or more")
      .required("Password Required"),
  });

  const handleRegister = async (values, { setFieldError }) => {
    const { email, username, password } = values;

    const data = await registerUser({ username, email, password });

    if (data) {
      if (data.error) {
        setFieldError(data.field || "email", data.message);
      } else if (data.id) {
        dispatch({ type: SET_USER, payload: data });
        localStorage.setItem("token", data.token);
        navigate(`/home/${data.username}`);
      }
    }
  };

  return (
    <main className="auth container">
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={registerValidation}
        validateOnBlur
        validateOnMount
        onSubmit={handleRegister}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <header>
              <h2>Register</h2>
              <img
                src={process.env.PUBLIC_URL + "/images/user.svg"}
                alt="Register"
              />
            </header>

            <FormField
              inputType="name"
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.name && errors.name}
              disabled={isSubmitting}
            />

            <FormField
              inputType="username"
              value={values.username}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.username && errors.username}
              disabled={isSubmitting}
            />

            <FormField
              inputType="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
              disabled={isSubmitting}
            />

            <FormField
              inputType="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password}
              disabled={isSubmitting}
            />

            <button type="submit" disabled={!isValid}>
              {isSubmitting ? <div className="loader" /> : "Submit"}
            </button>

            <AuthLink path="login" />
          </form>
        )}
      </Formik>
    </main>
  );
};
