import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoute = ({ redirectTo = "/auth/login", children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  if (isAuthenticated) {
    return children ? children : <Outlet />
  }
  return <Navigate to={redirectTo} />
};

export default AdminRoute;

