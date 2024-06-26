import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredients';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredients = useSelector(getIngredientsSelector);
  /** TODO: взять переменную из стора */
  const ingredientData = ingredients.filter(
    (i: TIngredient) => i._id === params.id
  )[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
