import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type IInitialState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: IInitialState = {
  bun: null,
  ingredients: []
};

const burgerIngredientSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: window.crypto.randomUUID() },
        meta: {},
        error: null
      }),
      reducer: (state, action) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients?.filter(
        (ing) => ing.id !== action.payload
      );
    },
    replaceIngredients: (state, { payload }) => {
      const { index1, index2 } = payload;
      const newItems = state.ingredients.slice(); // Создаем копию массива

      // Меняем элементы местами в копии массива
      let temp = newItems[index1];
      newItems[index1] = newItems[index2];
      newItems[index2] = temp;

      console.log(newItems, 'newItems');
      state.ingredients = newItems;
    }
  },
  selectors: {
    getBurgerIngredient: (state) => state
  }
});

export const { addIngredient, removeIngredient, replaceIngredients } =
  burgerIngredientSlice.actions;
export const { getBurgerIngredient } = burgerIngredientSlice.selectors;
export const reducer = burgerIngredientSlice.reducer;
