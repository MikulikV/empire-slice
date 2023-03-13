import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortProperty = "rating" | "price" | "title";
export type QueryString = {
  page: string;
  category: string;
  sortBy: SortProperty;
  order: "desc" | "asc";
  search?: string;
};
interface FilterState {
  categoryId: number;
  sort: SortProperty;
  order: "desc" | "asc";
  searchValue: string;
  currentPage: number;
}

const initialState: FilterState = {
  categoryId: 0,
  sort: "rating",
  order: "desc",
  searchValue: "",
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      state.currentPage = 1;
    },
    setSort(state, action: PayloadAction<SortProperty>) {
      state.sort = action.payload;
      state.currentPage = 1;
    },
    setOrder(state, action: PayloadAction<FilterState["order"]>) {
      state.order = action.payload;
      state.currentPage = 1;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<QueryString>) {
      state.currentPage = Number(action.payload.page);
      state.categoryId = Number(action.payload.category);
      state.sort = action.payload.sortBy;
      state.order = action.payload.order;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const searchValueSelector = (state: RootState) =>
  state.filter.searchValue;

export const {
  setCategoryId,
  setSort,
  setOrder,
  setSearchValue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
