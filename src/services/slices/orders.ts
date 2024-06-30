import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type IInitialState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: IInitialState = {
  orders: [],
  orderRequest: false,
  orderModalData: null
};

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(addOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(addOrder.fulfilled, (state, { payload }) => {
      state.orderRequest = false;
      state.orderModalData = payload.order;
    });
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData
  }
});

export const { deleteOrderModalData } = ordersSlice.actions;
export const {
  getOrdersSelector,
  getOrderModalDataSelector,
  getOrderRequestSelector
} = ordersSlice.selectors;
export const reducer = ordersSlice.reducer;
