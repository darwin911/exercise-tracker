import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { AddExerciseModal } from "./AddExerciseModal";
import { AppContext } from "../../Store";
import { EditExerciseModal } from "./EditExerciseModal";
import { Loader } from "../shared/index";
import { UserExercises } from "./index";

export const Home = () => {
  const [{ loading }] = useContext(AppContext);
  return !loading ? (
    <main className="container">
      <UserExercises />
      <Routes>
        <Route path="add" element={<AddExerciseModal />} />
        <Route path="edit/:exerciseId" element={<EditExerciseModal />} />
      </Routes>
    </main>
  ) : (
    <Loader size={8} />
  );
};
