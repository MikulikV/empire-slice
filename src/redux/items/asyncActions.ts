import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryString } from "../filter/types";
import { FetchResponse } from "./types";

// Запрос всех пицц выбранной категории на главную страницу
export const fetchPizzas = createAsyncThunk<FetchResponse, QueryString>(
  "items/fetchByCategory",
  async (params, thunkAPI) => {
    const { search, page, category, sortBy, order, pageSize } = params;
    const response = await axios.get(
      `https://my-json-server.typicode.com/MikulikV/react-pizza-database/items?_page=${page}&_limit=${pageSize}&${category}&_sort=${sortBy}&_order=${order}&${search}`
    );
    return {
      // возвращается массив пицц на одну страницу
      data: response.data,
      // вовзращается общее количество пицц выбранной категории
      xTotalCount: response.headers["x-total-count"],
    };
  }
);
