import React, { useState, useEffect, useContext } from 'react';
import './style/App.css';
import { CONSTANTS } from './constants';
import { getUserExercises, verifyToken } from './helper';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './components/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserExercises } from './components/home/UserExercises';
import { Profile } from './components/profile/Profile';
import { AddExercise } from './components/home/AddExercise';
import { EditExerciseModal } from './components/home/EditExerciseModal';
import { ActivityTypes } from './components/home/ActivityTypes';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING } = CONSTANTS;

export const App = () => {
  const [{ exercises, user }, dispatch] = useContext(AuthContext);
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
    token ? loadCredentials(token) : history.push('/login');
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
        <div className={`App${modalOpen ? ' modal-open' : ''}`}>
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <main className={`container${menuOpen ? ' menu-open' : ''}`}>
            <ActivityTypes />
            <UserExercises />
          </main>
          <Route path='/home/add' component={AddExercise} />
          <Route
            path='/home/edit/:exerciseId'
            render={({ match }) => {
              const { exerciseId } = match.params;
              const [editExercise] = exercises.filter(ex => ex.id === exerciseId);
              if (!editExercise) return null;
              return <EditExerciseModal exercise={editExercise} />;}} />
        </div>
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/register'>
        <Register />
      </Route>
    </Switch>
  );
};
