import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { SET_USER, SET_EXERCISES, TOGGLE_LOADING } from './constants';
import { getUserExercises, verifyToken } from './helper';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './components/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserExercises } from './components/home/UserExercises';
import { AddExercise } from './components/home/AddExercise';
import { EditExerciseModal } from './components/home/EditExerciseModal';

export const App = () => {
  const [{ exercises, user, modalOpen }, dispatch] = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main className={`container${menuOpen ? ' menu-open' : ''}`}>
              <hr />
              <UserExercises />
            </main>
          </div>
          <Route path='/home/add' component={AddExercise} />
          <Route
            path='/home/edit/:exerciseId'
            render={({ match }) => {
              const { exerciseId } = match.params;
              const [editExercise] = exercises.filter(ex => ex.id === exerciseId);
              if (!editExercise) return null;
              return <EditExerciseModal exercise={editExercise} />;
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
