import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartState {
  totalPrice: number;
  totalCount: number;
  items: CartItemType[];
}

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

export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelector =
  (id: string, size: number, type: string) => (state: RootState) =>
    state.cart.items.find(
      (obj) => obj.id === id && obj.size === size && obj.type === type
    );

export const { addItem, reduceItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
