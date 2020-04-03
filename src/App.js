import React, { useState, useEffect, useMemo } from "react";
// import auth from "./auth";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./auth/context";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;