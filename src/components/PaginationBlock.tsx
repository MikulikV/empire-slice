import React from "react";
import { ThemeConfig } from "../config/Theme.config";
import { Pagination } from "@mui/material";

type PagintionPropsType = {
  currentPage: number
  count: number
  changePage: (page: number) => void
};

export const PaginationBlock: React.FC<PagintionPropsType> = ({ currentPage, count, changePage }) => {
  return (
    <ThemeConfig>
      <Pagination
        page={currentPage}
        count={count}
        onChange={(e, page) => changePage(page)}
        color="primary"
        shape="rounded"
        size="large"
      />
    </ThemeConfig>
  );
}
