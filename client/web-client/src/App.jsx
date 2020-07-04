import React, { useState, useEffect, useContext } from 'react';
import './style/App.css';
import { CONSTANTS } from './constants';
import { getUserExercises, verifyToken, getUserPushUpsData, getUser } from './helper';
import { Route, useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from './Store';
import { Header } from './Components/Header';
import { Auth } from './Components/Auth/Auth';
import { Profile } from './Components/Profile/Profile';
import { Home } from './Components/Home/Home';
import { Loader } from './Components/Loader';
import { Footer } from './Components/Footer';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING } = CONSTANTS;

export const App = withRouter(({ location }) => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, loading } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const openModal = location.pathname.includes('/add') || location.pathname.includes('/edit');

  useEffect(() => {
    let token = localStorage.getItem('token');

    const handleAutoLogin = async (token) => {
      dispatch({ type: TOGGLE_LOADING });
      console.info('handleAutoLogin');
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

    if (token) handleAutoLogin(token);
    else {
      history.push('/auth/login');
      dispatch({ type: TOGGLE_LOADING });
    }
    dispatch({ type: TOGGLE_LOADING });
  }, []);

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });
    const loadExercises = async (userId) => {
      const { exercises } = await getUserExercises(userId);
      dispatch({ type: SET_EXERCISES, payload: exercises });
    };

    const loadPushUpChartDataToState = async () => {
      const data = await getUserPushUpsData(user.id);
      dispatch({ type: 'LOAD_PUSH_UPS_DATA', payload: data });
    };

    if (user) {
      loadExercises(user.id);
      loadPushUpChartDataToState(user.id);
    }
    dispatch({ type: TOGGLE_LOADING });
  }, [user, dispatch]);

  return (
    <div className={`App${openModal ? ' modal-open' : ''} ${menuOpen ? ' menu-open' : ''}`}>
      <Header isOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {!loading ? (
        <>
          <Route path='/home' component={Home} />
          <Route
            path='/profile'
            render={() => <Profile isOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          />
        </>
      ) : (
        <Loader size={8} />
      )}
      <Route path='/auth' component={Auth} />
      <Footer />
    </div>
  );
});
