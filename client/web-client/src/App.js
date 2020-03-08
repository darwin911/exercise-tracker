import React, { useEffect, useContext } from 'react';
import './App.css';
import { SET_USER, SET_EXERCISES, TOGGLE_LOADING } from './constants';
import { getUserExercises, verifyToken } from './helper';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { UserExercises } from './components/UserExercises';
import { AddExercise } from './components/AddExercise';
import { EditExercise } from './components/EditExercise';

export const App = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, modalOpen } = state;
  const history = useHistory();

  useEffect(() => {
    const loadCredentials = async token => {
      dispatch({ type: TOGGLE_LOADING });
      const verifiedUser = await verifyToken({ token });
      if (!verifiedUser) {
        history.push('/login');
      } else {
        dispatch({ type: SET_USER, payload: verifiedUser });
        history.push('/home');
      }
    };

    let token = localStorage.getItem('token');
    if (token) {
      loadCredentials(token);
    } else {
      history.push('/login');
    }
  }, [history, dispatch]);

  useEffect(() => {
    const loadExercises = async userId => {
      dispatch({ type: TOGGLE_LOADING });
      const { exercises: dbExercises } = await getUserExercises(userId);
      dispatch({ type: SET_EXERCISES, payload: dbExercises });
    };

    if (user) {
      loadExercises(user.id);
    }
  }, [user, dispatch]);

  return (
    <Switch>
      <Route path='/home'>
        <>
          <div className={`App${modalOpen ? ' modal-open' : ''}`}>
            <main className='container'>
              <Header dispatch={dispatch} />
              <hr />
              <UserExercises />
            </main>
          </div>
          <Route path='/home/add' component={AddExercise} />
          <Route
            path='/home/edit/:exerciseId'
            render={({ match }) => {
              const { exerciseId } = match.params;
              const [editExercise] = state.exercises.filter(ex => ex.id === exerciseId);
              return <EditExercise exercise={editExercise} />;
            }}
          />
        </>
      </Route>
      />
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/register'>
        <Register />
      </Route>
    </Switch>
  );
};
