import { Friends, ProfileCard } from "./index";
import React, { useContext } from "react";
import { Route, Routes, useParams } from "react-router-dom";

import { AppContext } from "../../Store";
import { ConfirmDeleteAccountModal } from "./ConfirmDeleteAccountModal";
import { Loader } from "../shared/index";

export const Profile = () => {
  const [{ user }] = useContext(AppContext);
  let params = useParams();

  if (!user) return <Loader size={4} />;

  return (
    <>
      <main className="container">
        <div className="profile wrapper">
          <ProfileCard />
          <Friends />
        </div>
        <Routes>
          <Route
            path="delete"
            element={<ConfirmDeleteAccountModal userId={params.userId} />}
          />
        </Routes>
      </main>
    </>
  );
};
