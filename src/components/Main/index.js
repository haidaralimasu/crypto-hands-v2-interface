import React from "react";
import Choice from "../Choice";

const Main = () => {
  return (
    <div className="d-flex wrap  flex-column justify-content-center align-items-center">
      <h2 className="my-4">Choose Any From Below</h2>
      <Choice />
    </div>
  );
};

export default Main;
