import React, { useContext } from "react";

import { AuthContext } from "../auth/context";

const Page2 = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <h1>Page2</h1>
      <p> Hello, {currentUser && currentUser.displayName} </p>
      <p> This is protected route </p>
    </>
  );
};

export default Page2;
