import { LoginForm, RegisterForm } from "./index";

import React from "react";
import { Route } from "react-router-dom";

export const Auth = () => {
  return (
    <main className="auth container">
      <Route path="/auth/login" component={LoginForm} />
      <Route path="/auth/register" component={RegisterForm} />
    </main>
  );
};
