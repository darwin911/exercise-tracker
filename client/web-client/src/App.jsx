import React, { useState, useEffect, useContext } from 'react';
import './style/App.css';
import { Route, useHistory, withRouter } from 'react-router-dom';
import { getUserExercises, verifyToken, getUserPushUpsData, getUser } from './helper';
import { AppContext } from './Store';
import { Loader, Footer } from './Components/shared/index';
import { Auth } from './Components/Auth/index';
import { Header } from './Components/Header/Header';
import { Profile } from './Components/Profile/index';
import { Home } from './Components/Home/index';
import { CONSTANTS } from './constants';
const { SET_USER, SET_EXERCISES, TOGGLE_LOADING, LOAD_PUSH_UPS_DATA } = CONSTANTS;

export const App = withRouter(({ location: { pathname } }) => {
  const [state, dispatch] = useContext(AppContext);
  const { user, loading } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const openModal = pathname.includes('/add') || pathname.includes('/edit');

  useEffect(() => {
    if (user) return;
    let token = localStorage.getItem('token');
    const handleAutoLogin = async (token) => {
      dispatch({ type: TOGGLE_LOADING });
      const pushToHome = pathname.includes('auth') || pathname === '/';
      const verifiedUser = await verifyToken({ token });
      if (verifiedUser) {
        const { id } = verifiedUser;
        const user = await getUser(id);
        dispatch({ type: SET_USER, payload: user });
        history.push(pushToHome ? `/home/${user.id}` : pathname);
      } else {
        localStorage.removeItem('token');
        history.push('/auth/login');
      }
    };

    if (token) handleAutoLogin(token);
    else if (!pathname.includes('register')) {
      history.push('/auth/login');
    }
  }, [dispatch, pathname, history, user]);

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });
    const loadExercises = async (userId) => {
      const { exercises } = await getUserExercises(userId);
      dispatch({ type: SET_EXERCISES, payload: exercises });
    };

    const loadPushUpChartDataToState = async () => {
      const data = await getUserPushUpsData(user.id);
      dispatch({ type: LOAD_PUSH_UPS_DATA, payload: data });
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
      {loading ? (
        <Loader size={8} />
      ) : (
        <>
          <Route path='/home/:id' component={Home} />
          <Route
            path='/profile'
            render={() => <Profile isOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          />
        </>
      )}
      <Route path='/auth' component={Auth} />
      <Footer />
    </div>
  );
});
