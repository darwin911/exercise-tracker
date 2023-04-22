import React, { useContext } from "react";

import { AppContext } from "../../Store";
import { Link } from "react-router-dom";

export const MainHeading = () => {
  const [{ user }] = useContext(AppContext);

  if (user && user.username) {
    return (
      <h1 className="main-heading">
        <Link to={`/home/${user.username}`}>
          E<span className="hide-sm">xercise </span>
          <b>
            T<span className="hide-sm">racker</span>
          </b>
        </Link>
      </h1>
    );
  }

  return (
    <h1 className="main-heading">
      E<span className="hide-sm">xercise </span>
      <b>
        T<span className="hide-sm">racker</span>
      </b>
    </h1>
  );
};
