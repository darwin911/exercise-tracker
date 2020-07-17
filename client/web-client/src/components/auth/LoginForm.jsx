import React, { useContext } from 'react';
import { AuthLink, FormField } from './index';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../helper';
import { AppContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { SET_USER } = CONSTANTS;

export const LoginForm = () => {
  const dispatch = useContext(AppContext)[1];
  const history = useHistory();

  // arg1: values , arg2: actions
  const handleLogin = async ({ email, password }, { setFieldError }) => {
    const data = await loginUser({ email, password });
    if (data.error) {
      setFieldError('email', data.error);
    } else {
      dispatch({ type: SET_USER, payload: data });
      localStorage.setItem('token', data.token);
      history.push(`/home/${data.id}`);
    }
  };

  const loginValidation = Yup.object({
    email: Yup.string().email('Invalid email').required('Email Address Required'),
    password: Yup.string().min(4, 'Must be 4 characters or more').required('Password Required'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidation}
      onSubmit={handleLogin}
      validateOnBlur
      isInitialValid={false}>
      {({
        errors,
        values,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        status,
        isValid,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <header>
              <h2>Login</h2>
              <img src={process.env.PUBLIC_URL + '/images/verification-login.svg'} alt='Login' />
            </header>
            <br />
            <FormField
              inputType='email'
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={(touched.email && errors.email) || (status && status.email)}
              disabled={isSubmitting}
            />
            <FormField
              inputType='password'
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password}
              disabled={isSubmitting}
            />
            <button type='submit' disabled={!isValid}>
              {isSubmitting ? <div className='loader' /> : 'Submit'}
            </button>
            <AuthLink path='register' />
          </form>
        );
      }}
    </Formik>
  );
};
