import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protect = ({ element: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Component {...rest} />;
};

export default Protect;
