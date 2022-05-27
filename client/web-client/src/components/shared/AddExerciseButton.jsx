import React, { useContext } from "react";

import { AddSVG } from "./index";
import { AppContext } from "../../Store";
import { useNavigate } from "react-router-dom";

export const AddExerciseButton = () => {
  const [{ user }] = useContext(AppContext);
  const navigate = useNavigate();
  const toggleModal = () => {
    navigate(`/home/${user?.id}/add`);
  };
  return (
    <button className="btn toggle-form" onClick={() => toggleModal()}>
      <AddSVG fill={"white"} />
    </button>
  );
};
