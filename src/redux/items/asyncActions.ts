import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryString } from "../filter/types";
import { FetchResponse } from "./types";

export const fetchPizzas = createAsyncThunk<FetchResponse, QueryString>(
  "items/fetchByIdStatus",
  async (params, thunkAPI) => {
    const { search, page, category, sortBy, order, pageSize } = params;
    const response = await axios.get(
      `https://3vc5mh-8080.csb.app/items?_page=${page}&_limit=${pageSize}&${category}&_sort=${sortBy}&_order=${order}&${search}`
    );
    console.log(response.headers["x-total-count"]);
    return {
      data: response.data,
      xTotalCount: response.headers["x-total-count"],
    };
  }
);
