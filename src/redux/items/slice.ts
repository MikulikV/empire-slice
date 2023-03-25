import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { ItemsState, Pizza, Status } from "./types";

const initialState: ItemsState = {
  items: [],
  xTotalCount: 0,
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
