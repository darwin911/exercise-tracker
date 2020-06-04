import React, { useState, useEffect, useContext } from 'react';
import './style/App.css';
import { CONSTANTS } from './constants';
import { getUserExercises, verifyToken, getUserPushUpsData, getUser } from './helper';
import { Route, useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './components/Header';
import { Auth } from './components/auth/Auth';
import { UserExercises } from './components/home/UserExercises';
import { AddExerciseModal } from './components/home/AddExerciseModal';
import { EditExerciseModal } from './components/home/EditExerciseModal';
import { Profile } from './components/profile/Profile';
import { Loader } from './components/Loader';
// import { ActivityTypes } from './components/home/ActivityTypes';
// import { Chart } from './components/Chart';
// import { StackedChart } from './components/home/StackedChart';
// import { PushUpMonitor } from './components/home/PushUpMonitor';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING } = CONSTANTS;

export const App = withRouter(({ location }) => {
  const [state, dispatch] = useContext(AuthContext);
  const { exercises, user } = state;
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
        const id = verifiedUser.id;
        const user = await getUser(id);
        dispatch({ type: SET_USER, payload: user });
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
      console.info('UseEffect\nLoading Exercises');
      dispatch({ type: SET_EXERCISES, payload: exercises });
    };

    const loadPushUpChartDataToState = async () => {
      const data = await getUserPushUpsData(user.id);
      console.info('UseEffect\nLoading Push Ups');
      console.log(data);
      dispatch({ type: 'LOAD_PUSH_UPS_DATA', payload: data });
    };

    if (user) {
      loadExercises(user.id);
      loadPushUpChartDataToState(user.id);
    }
  }, [user, dispatch]);

  return (
    <div className={`App${openModal ? ' modal-open' : ''} ${menuOpen ? ' menu-open' : ''}`}>
      <Route path='/home'>
        <Header isOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {user ? (
          <main className={`container`}>
            {/* <Chart /> */}
            {/* <StackedChart /> */}
            {/* <PushUpMonitor data={pushUpData} /> */}
            <UserExercises />
          </main>
        ) : (
          <Loader size={8} />
        )}

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
      <footer className='footer'>
        <div className='container'>
          <br />
          <strong>Created by &copy; Darwin Smith</strong>
          <span> {new Date().getFullYear()}</span>
          <br />
        </div>
      </footer>
    </div>
  );
});
