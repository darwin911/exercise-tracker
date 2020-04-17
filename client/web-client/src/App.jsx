import React, { useState, useEffect, useContext } from 'react';
import './style/App.css';
import { CONSTANTS } from './constants';
import { getUserExercises, verifyToken } from './helper';
import { Route, useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './components/Header';
import { Auth } from './components/auth/Auth';
import { UserExercises } from './components/home/UserExercises';
import { AddExerciseModal } from './components/home/AddExerciseModal';
import { EditExerciseModal } from './components/home/EditExerciseModal';
// import { ActivityTypes } from './components/home/ActivityTypes';
import { Profile } from './components/profile/Profile';
import { Chart } from './components/Chart';
import { Loader } from './components/Loader';
import { StackedChart } from './components/home/StackedChart';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING } = CONSTANTS;

export const App = withRouter(({ location }) => {
  const [state, dispatch] = useContext(AuthContext);
  const { exercises, user, loading } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const openModal = location.pathname.includes('/add') || location.pathname.includes('/edit');

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });

    let token = localStorage.getItem('token');

    const handleAutoLogin = async (token) => {
      const pushToHome = location.pathname.includes('auth') || location.pathname === '/';
      const verifiedUser = await verifyToken({ token });
      if (verifiedUser) {
        dispatch({ type: SET_USER, payload: verifiedUser });
        history.push(pushToHome ? '/home' : location.pathname);
      } else {
        history.push('/auth/login');
      }
    };

    token ? handleAutoLogin(token) : history.push('/auth/login');
  }, [history, dispatch]);

  useEffect(() => {
    const loadExercises = async (userId) => {
      dispatch({ type: TOGGLE_LOADING });
      const { exercises } = await getUserExercises(userId);
      dispatch({ type: SET_EXERCISES, payload: exercises });
    };

    if (user) loadExercises(user.id);
  }, [user, dispatch]);

  if (loading) {
    return <Loader size={8} />;
  }

  return (
    <div className={`App${openModal ? ' modal-open' : ''} ${menuOpen ? ' menu-open' : ''}`}>
      <Route path='/home'>
        <Header isOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className={`container`}>
          <Chart />
          <StackedChart />
          <UserExercises />
        </main>
        <Route path='/home/add' render={() => <AddExerciseModal />} />
        <Route
          path='/home/edit/:exerciseId'
          render={({ match }) => {
            const { exerciseId } = match.params;
            const [editExercise] = exercises.filter((ex) => ex.id === exerciseId);
            if (!editExercise) return null;
            return <EditExerciseModal exercise={editExercise} />;
          }}
        />
      </Route>
      <Route
        path='/profile'
        render={() => <Profile isOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      />
      <Route path='/auth' component={Auth} />
    </div>
  );
});
