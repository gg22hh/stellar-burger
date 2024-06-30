import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getFeedsSelector } from '../../services/slices/feeds';
import { getIngredientsSelector } from '../../services/slices/ingredients';
import { getOrdersSelector } from '../../services/slices/orders';

export const OrderInfo: FC = () => {
  const params = useParams();
  const paramsNumber = params.number ? +params.number : 0;
  const location = useLocation();
  console.log(location, 'location');
  const feed = useSelector(getFeedsSelector);
  const orders = useSelector(getOrdersSelector);
  /** TODO: взять переменные orderData и ingredients из стора */
  // const orderData = orders.filter((o) => o.number === paramsNumber)[0];
  const ordersArray = location.pathname.includes('feed') ? feed.orders : orders;
  const orderData = ordersArray.find((o) => o.number === paramsNumber);
  // console.log(justForCheck, 'justForCheck');

  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
