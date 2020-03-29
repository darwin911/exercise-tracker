import React, { useContext } from 'react';
import { AuthLink, FormField, MainHeading } from './index';
import { Route, useHistory } from 'react-router-dom';
import { loginUser, registerUser } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { SET_USER } = CONSTANTS;

const validation = Yup.object({
  name: Yup.string().max(2, 'Must be 255 characters or less'),
  username: Yup.string().min(6, 'Must be 6 characters or more'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Must be 4 characters or more')
    .required('Required'),
});

export const Auth = () => {
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const heading = window.location.pathname.includes('login') ? 'Login' : 'Register';

  const handleSubmit = async values => {
    const { email, username, password } = values;
    const { pathname } = window.location;
    let authenticatedUser;
    if (pathname.includes('/auth/login')) {
      authenticatedUser = await loginUser({ email, password });
    } else if (pathname === '/auth/register') {
      authenticatedUser = await registerUser({ username, email, password });
    }
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
    <main className='auth container'>
      <header>
        <MainHeading />
      </header>
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
          error: '',
        }}
        validationSchema={validation}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <h2>{heading}</h2>
            <br />
            <Route
              path='/auth/register'
              render={() => (
                <React.Fragment>
                  <FormField
                    inputType='name'
                    value={values.name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  <FormField
                    inputType='username'
                    value={values.username}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </React.Fragment>
              )}
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
            <Route path='/auth/login' render={() => <AuthLink path='register' />} />
            <Route path='/auth/register' render={() => <AuthLink path='login' />} />
          </form>
        )}
      </Formik>
    </main>
  );
};
