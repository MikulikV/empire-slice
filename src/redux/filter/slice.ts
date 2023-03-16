import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, QueryString, SortProperty } from "./types";

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

export const {
  setCategoryId,
  setSort,
  setOrder,
  setSearchValue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
