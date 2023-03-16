import { CartItemType, CartState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      // Checking: is the item already in the list?
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count++;
      } else {
        // else add the item in the list as new one with count = 1
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
      state.totalCount += 1;
    },
    reduceItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count--;
        state.totalPrice -= action.payload.price;
        state.totalCount -= 1;
      }
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
      );
      state.totalPrice -= action.payload.price * action.payload.count;
      state.totalCount -= action.payload.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, reduceItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
