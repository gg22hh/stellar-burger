import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients';
import { ProtectedRoute } from '../protectedRoute';
import { getUserDataSelector, getUser } from '../../services/slices/user';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUserDataSelector);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
    if (user.name) {
      navigate(location.state?.form ? location.state.from.pathname : '/');
    }
  }, []);

  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      <Routes>
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='Детали заказа' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
