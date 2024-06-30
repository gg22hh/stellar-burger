import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';
import { get } from 'http';

type IInitialState = {
  isIngrediendsLoading: boolean;
  ingredients: any;
};

const initialState: IInitialState = {
  isIngrediendsLoading: true,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngrediendsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngrediendsLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIsIngrediendsLoading: (state) => state.isIngrediendsLoading,
    getIngredientsSelector: (state) => state.ingredients
  }
});

export const { getIsIngrediendsLoading, getIngredientsSelector } =
  ingredientsSlice.selectors;
export const reducer = ingredientsSlice.reducer;
