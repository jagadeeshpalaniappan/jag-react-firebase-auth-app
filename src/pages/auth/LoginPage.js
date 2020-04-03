import React, { useContext, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../AppContext";
import { Link } from "react-router-dom";
import auth from "../../auth";

const LoginPage = () => {
  const [errMsg, setErrMsg] = useState(null);
  let history = useHistory();
  console.log("history", history);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        const loggedInUser = await auth.login({
          email: email.value,
          password: password.value
        });
        console.log("login: sucess::", loggedInUser);
        // setUser(loggedInUser);
        const currPage = history.location.state
          ? history.location.state.from.pathname
          : "/home";
        history.push(currPage);
      } catch (error) {
        console.log("handleLogin", error);
        setErrMsg(error.message);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Login</h1>

      {history.location.state && (
        <p className="error">
          You need to login to access this page:{" "}
          {history.location.state.from.pathname}{" "}
        </p>
      )}

      {errMsg && <p className="error">Login Failed: {errMsg}</p>}

      <form onSubmit={handleLogin}>
        <p>
          <span>Email:</span>
          <input name="email" type="email" placeholder="Email" />
        </p>
        <p>
          <span>Password:</span>
          <input name="password" type="password" placeholder="Password" />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
