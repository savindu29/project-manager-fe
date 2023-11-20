import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;