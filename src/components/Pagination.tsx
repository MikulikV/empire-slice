import React from "react";
import { ThemeConfig } from "../config/Theme.config";
import { Pagination } from "@mui/material";

type PagintionPropsType = {
  currentPage: number
  changePage: (page: number) => void
};

const PaginationBlock: React.FC<PagintionPropsType> = ({ currentPage, changePage }) => {
  return (
    <ThemeConfig>
      <Pagination
        page={currentPage}
        count={4}
        onChange={(e, page) => changePage(page)}
        color="primary"
        shape="rounded"
        size="large"
      />
    </ThemeConfig>
  );
}

export default PaginationBlock;
