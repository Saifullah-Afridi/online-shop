import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
