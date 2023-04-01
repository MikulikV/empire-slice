import React from "react";
import { Pagination } from "@mui/material";

type PagintionPropsType = {
  currentPage: number
  count: number
  changePage: (page: number) => void
};

export const PaginationBlock: React.FC<PagintionPropsType> = ({ currentPage, count, changePage }) => {
  return (
    <Pagination
      page={currentPage}
      count={count}
      onChange={(e, page) => changePage(page)}
      color="primary"
      shape="rounded"
      size="large"
    />
  );
}
