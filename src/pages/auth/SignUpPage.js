import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../auth";

const SignUp = () => {
  const [errMsg, setErrMsg] = useState(null);
  let history = useHistory();

  console.log("history", history);

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { name, email, password } = event.target.elements;

      try {
        await auth.signup({
          name: name.value,
          email: email.value,
          password: password.value
        });
        history.push("/home");
      } catch (error) {
        console.log("handleSignUp", error);
        setErrMsg(error.message);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Sign up</h1>
      {errMsg && <p className="error">SignUp Failed: {errMsg}</p>}
      <form onSubmit={handleSignUp}>
        <p>
          <span>Name:</span>
          <input name="name" type="text" placeholder="Name" />
        </p>
        <p>
          <span>Email:</span>
          <input name="email" type="email" placeholder="Email" />
        </p>
        <p>
          <span>Password:</span>
          <input name="password" type="password" placeholder="Password" />
        </p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
