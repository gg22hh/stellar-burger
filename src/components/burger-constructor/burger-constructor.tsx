import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBurgerIngredient } from '../../services/slices/burgerIngredients';
import {
  addOrder,
  deleteOrderModalData,
  getOrderModalDataSelector,
  getOrderRequestSelector
} from '../../services/slices/orders';
import { getUserDataSelector } from '../../services/slices/user';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const user = useSelector(getUserDataSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const constructorItems = useSelector(getBurgerIngredient);
  const dispatch = useDispatch();

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = useSelector(getOrderModalDataSelector);

  const onOrderClick = () => {
    if (!user.name) {
      // return <Navigate to='/login' state={{ from: location }} />;
      navigate('/login', { state: { from: location } });
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(addOrder(constructorItems.ingredients.map((ing) => ing._id)));
  };
  const closeOrderModal = () => {
    dispatch(deleteOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
