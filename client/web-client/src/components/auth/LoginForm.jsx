import React, { useContext } from 'react';
import { AuthLink, FormField } from './index';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { SET_USER } = CONSTANTS;

export const LoginForm = () => {
  const dispatch = useContext(AuthContext)[1];
  const history = useHistory();

  const handleLogin = async ({ email, password }) => {
    const authenticatedUser = await loginUser({ email, password });

    if (authenticatedUser) {
      if (authenticatedUser.error) {
        alert(authenticatedUser.error);
        return;
      }
      dispatch({ type: SET_USER, payload: authenticatedUser });
      localStorage.setItem('token', authenticatedUser.token);
      history.push('/home');
    }
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Must be 4 characters or more')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidation}
      onSubmit={handleLogin}>
      {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <br />
          <FormField
            inputType='email'
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.email && errors.email}
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
          <button type='submit'>{isSubmitting ? <div className='loader' /> : 'Submit'}</button>
          <AuthLink path='register' />
        </form>
      )}
    </Formik>
  );
};
