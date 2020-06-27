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
import { Footer } from './Components/Footer';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING } = CONSTANTS;

export const App = withRouter(({ location }) => {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const openModal = location.pathname.includes('/add') || location.pathname.includes('/edit');

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });

    let token = localStorage.getItem('token');

    const handleAutoLogin = async (token) => {
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

    token ? handleAutoLogin(token) : history.push('/auth/login');
  }, []);

  useEffect(() => {
    const loadExercises = async (userId) => {
      dispatch({ type: TOGGLE_LOADING });
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
  }, [user, dispatch]);

  return (
    <div className={`App${openModal ? ' modal-open' : ''} ${menuOpen ? ' menu-open' : ''}`}>
      <Header isOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Route path='/home' render={() => <Home />} />
      <Route
        path='/profile'
        render={() => <Profile isOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      />
      <Route path='/auth' component={Auth} />
      <Footer />
    </div>
  );
});
