import React from 'react';
import { useSelector } from '../../services/store';
import { getUserDataSelector } from '../../services/slices/user';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(getUserDataSelector);
  const location = useLocation();

  if (!user.name) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
