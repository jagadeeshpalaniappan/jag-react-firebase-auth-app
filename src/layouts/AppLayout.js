import React from "react";

const AppLayout = ({ header, left, main, right }) => {
  return (
    <>
      {header}
      {left}
      {main}
      {right}
    </>
  );
};

export default AppLayout;
