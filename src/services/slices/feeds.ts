import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type IInitialState = {
  feeds: {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
  };
};

const initialState: IInitialState = {
  feeds: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
  }
};

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state.feeds
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload;
    });
  }
});

export const { getFeedsSelector } = feedsSlice.selectors;
export const reducer = feedsSlice.reducer;
