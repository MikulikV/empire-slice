import { RootState } from "./../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryString } from "./filterSlice";

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface ItemsState {
  items: Pizza[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<Pizza[], QueryString>(
  "items/fetchByIdStatus",
  async (params, thunkAPI) => {
    const { search, page, category, sortBy, order } = params;
    const response = await axios.get<Pizza[]>(
      `https://63fb1dd12027a45d8d60512e.mockapi.io/items?${search}&page=${page}&limit=6&${category}&sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  }
);

const initialState: ItemsState = {
  items: [],
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
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const itemsSelector = (state: RootState) => state.items;

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
