import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ isAuthenticated, outlet, authPath }) =>
  isAuthenticated ? outlet : <Navigate to={authPath} />;

export default PrivateRoute;
