import React, { useContext } from "react";

import { AuthContext } from "../auth/context";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <h1>HomePage</h1>
      {currentUser && <pre>{JSON.stringify(currentUser, null, 2)}</pre>}
    </>
  );
};

export default HomePage;
