import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check login status by checking cookies or localStorage
  const isAuthenticated = localStorage.getItem("username"); // or use cookies for better security

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
