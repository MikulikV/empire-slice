import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { ItemsState, Pizza, Status } from "./types";

const initialState: ItemsState = {
  items: [], // all pizzas sorted by selected category per one page
  xTotalCount: 0, // total count of pizzas sorted by selected category
  status: Status.LOADING,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // extraREducers for fetchPizzas on Home page
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.xTotalCount = 0;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.xTotalCount = action.payload.xTotalCount;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.xTotalCount = 0;
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
