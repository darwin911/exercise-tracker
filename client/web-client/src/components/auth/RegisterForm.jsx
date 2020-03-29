import React, { useContext } from 'react';
import { AuthLink, FormField } from './index';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { SET_USER } = CONSTANTS;

export const RegisterForm = () => {
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const registerValidation = Yup.object({
    name: Yup.string().max(2, 'Must be 2 characters or less'),
    username: Yup.string().min(6, 'Must be 6 characters or more'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Must be 4 characters or more')
      .required('Required'),
  });

  const handleRegister = async values => {
    const { email, username, password } = values;

    const authenticatedUser = await registerUser({ username, email, password });

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

  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        email: '',
        password: '',
      }}
      validationSchema={registerValidation}
      onSubmit={handleRegister}>
      {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <br />

          <FormField
            inputType='name'
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.name && errors.name}
            disabled={isSubmitting}
          />

          <FormField
            inputType='username'
            value={values.username}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.username && errors.username}
            disabled={isSubmitting}
          />

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

          <AuthLink path='login' />
        </form>
      )}
    </Formik>
  );
};
