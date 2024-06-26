import React from 'react';
import { useSelector } from '../../services/store';
import { getUserDataSelector } from '../../services/slices/user';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(getUserDataSelector);

  if (!user.name) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
