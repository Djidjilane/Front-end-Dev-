import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ redirectTo = "/auth/login", children  }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
   }
   return children ? children : <Outlet />
};

export default PrivateRoute;