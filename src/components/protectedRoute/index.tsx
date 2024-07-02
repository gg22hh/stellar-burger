import React from 'react';
import { useSelector } from '../../services/store';
import {
  getIsUserAuthSelector,
  getUserDataSelector
} from '../../services/slices/user';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isUserAuth = useSelector(getIsUserAuthSelector);
  const user = useSelector(getUserDataSelector);
  const location = useLocation();

  if (!isUserAuth) {
    return <Preloader />;
  }

  if (!user.name) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
