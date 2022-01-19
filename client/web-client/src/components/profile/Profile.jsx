import {
  ConfirmDeleteAccountModal,
  Friends,
  ProfileCard,
  WeightTracker,
} from "./index";
import React, { useContext } from "react";

import { AppContext } from "../../Store";
import { Loader } from "../shared/index";
import { Route } from "react-router-dom";

export const Profile = () => {
  const [{ user }] = useContext(AppContext);

  if (!user) return <Loader size={4} />;

  return (
    <>
      <main className="container">
        <div className="profile wrapper">
          <ProfileCard />
          <Friends />
          <WeightTracker />
        </div>
        <Route
          path="/profile/:id/delete"
          render={({ match }) => {
            const { id } = match.params;
            return <ConfirmDeleteAccountModal userId={id} />;
          }}
        />
      </main>
    </>
  );
};
