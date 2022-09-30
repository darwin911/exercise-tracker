import "./style/App.css";

import { LoginForm, RegisterForm } from "./components/auth";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  getUser,
  getUserExercises,
  getUserPushUpsData,
  verifyToken,
} from "./helper";

import { AppContext } from "./Store";
import { CONSTANTS } from "./constants";
import { Footer } from "./components/shared";
import { Header } from "./components/Header";
import { Home } from "./components/home";
import { Profile } from "./components/profile";

const { SET_USER, SET_EXERCISES, TOGGLE_LOADING, LOAD_PUSH_UPS_DATA } =
  CONSTANTS;

export const App = () => {
  const [{ user }, dispatch] = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const openModal = pathname.includes("/add") || pathname.includes("/edit");

  useEffect(() => {
    if (user) return;
    let token = localStorage.getItem("token");
    const handleAutoLogin = async (token) => {
      dispatch({ type: TOGGLE_LOADING });
      const pushToHome = pathname.includes("auth") || pathname === "/";
      const verifiedUser = await verifyToken({ token });
      if (verifiedUser) {
        const { id } = verifiedUser;
        const user = await getUser(id);
        dispatch({ type: SET_USER, payload: user });
        navigate(pushToHome ? `/home/${user.id}` : pathname);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    if (token) handleAutoLogin(token);
    else if (!pathname.includes("register")) {
      navigate("/login");
    }
  }, [dispatch, pathname, navigate, user]);

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });
    const loadExercises = async (userId) => {
      const { exercises } = await getUserExercises(userId);
      dispatch({ type: SET_EXERCISES, payload: exercises });
    };

    const loadPushUpChartDataToState = async (userId) => {
      const data = await getUserPushUpsData(userId);
      dispatch({ type: LOAD_PUSH_UPS_DATA, payload: data });
    };

    if (user) {
      loadExercises(user.id);
      loadPushUpChartDataToState(user.id);
    }
    dispatch({ type: TOGGLE_LOADING });
  }, [user, dispatch]);

  return (
    <div
      className={`App${openModal ? " modal-open" : ""} ${
        menuOpen ? " menu-open" : ""
      }`}
    >
      <Header isOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path="/home/:id/*" element={<Home />} />
        <Route
          path="/profile/:userId/*"
          element={<Profile isOpen={menuOpen} setMenuOpen={setMenuOpen} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </div>
  );
};
