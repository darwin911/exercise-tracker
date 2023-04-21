import { CONSTANTS, TRANSITIONS } from "../../constants";
import React, { useContext } from "react";

import { AppContext } from "../../Store";
import { createPortal } from "react-dom";
import { deleteUser } from "../../helper";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { LOGOUT } = CONSTANTS;

export const ConfirmDeleteAccountModal = ({ userId }) => {
  const [{ user }, dispatch] = useContext(AppContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/profile/" + userId);
  };

  const handleDelete = async () => {
    await deleteUser(user.id);
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  return createPortal(
    <motion.div
      className="modal"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={TRANSITIONS.SPRING}
    >
      <div className="delete-account">
        <h2>Confirm Account Deletion</h2>
        <p>
          This action will delete all of your user account information{" "}
          <strong>permanently</strong>, including your Profile and Exercise
          data.
        </p>
        <button onClick={() => handleCancel()}>Cancel</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </motion.div>,
    document.body
  );
};
