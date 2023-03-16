import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryString } from "../filter/types";
import { Pizza } from "./types";

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
