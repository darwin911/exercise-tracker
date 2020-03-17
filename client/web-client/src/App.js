import React, { useState, useEffect, useContext } from 'react';
import './style/App.css';
import { CONSTANTS } from './constants';
import { getUserExercises, verifyToken } from './helper';
import { Route, useHistory } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './components/Header';
import { Auth } from './components/auth/Auth';
import { UserExercises } from './components/home/UserExercises';
import { AddExercise } from './components/home/AddExercise';
import { EditExerciseModal } from './components/home/EditExerciseModal';
import { ActivityTypes } from './components/home/ActivityTypes';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING } = CONSTANTS;

export const App = () => {
  const [{ exercises, user, modalOpen }, dispatch] = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem('token');

    const loadCredentials = async token => {
      dispatch({ type: TOGGLE_LOADING });
      const verifiedUser = await verifyToken({ token });
      if (!verifiedUser) {
        history.push('/auth/login');
      } else {
        dispatch({ type: SET_USER, payload: verifiedUser });
        history.push('/home');
      }
    };

    token ? loadCredentials(token) : history.push('/auth/login');
  }, [history, dispatch]);

  useEffect(() => {
    const loadExercises = async userId => {
      dispatch({ type: TOGGLE_LOADING });
      const { exercises } = await getUserExercises(userId);
      dispatch({ type: SET_EXERCISES, payload: exercises });
    };

    if (user) loadExercises(user.id);
  }, [user, dispatch]);

  return (
    <div className={`App${modalOpen ? ' modal-open' : ''}`}>
      <Route path='/home'>
        <Header isOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className={`container${menuOpen ? ' menu-open' : ''}`}>
          <ActivityTypes />
          <UserExercises />
        </main>
        <Route path='/home/add' render={() => <AddExercise />} />
        <Route
          path='/home/edit/:exerciseId'
          render={({ match }) => {
            const { exerciseId } = match.params;
            const [editExercise] = exercises.filter(ex => ex.id === exerciseId);
            if (!editExercise) return null;
            return <EditExerciseModal exercise={editExercise} />;
          }}
        />
      </Route>
      <Route path='/auth' component={Auth} />
    </div>
  );
};
