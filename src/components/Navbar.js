import React, { useContext } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import auth from "../auth";
import { AuthContext } from "../auth/context";

const AppLink = ({ children, to, ...rest }) => {
  let match = useRouteMatch({ path: to });

  const className = match ? "active" : "";

  return (
    <Link className={className} to={to} {...rest}>
      {children}
    </Link>
  );
};

const LeftPanel = () => {
  const { currentUser } = useContext(AuthContext);
  let history = useHistory();
  console.log("LeftPanel:: currLoc:", history.location.pathname);
  const handleLogout = async e => {
    e.preventDefault();
    console.log("history", history);
    await auth.logout();
    history.push("/home");
  };
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <AppLink to="/home">Home</AppLink>
        </li>
        <li className="nav-item">
          <AppLink to="/page1">Page1</AppLink>
        </li>
        <li className="nav-item">
          <AppLink to="/page2">Page2</AppLink> (Private)
        </li>
        {!currentUser && (
          <>
            <li className="nav-item">
              <AppLink to="/login">Login</AppLink>
            </li>
            <li className="nav-item">
              <AppLink to="/signup">Sign Up</AppLink>
            </li>
          </>
        )}
        {currentUser && (
          <li className="nav-item">
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LeftPanel;
