export type SortProperty = "rating" | "price" | "title";

export type QueryString = {
  page: string;
  category: string;
  sortBy: SortProperty;
  order: "desc" | "asc";
  search?: string;
  pageSize?: string;
};

export interface FilterState {
  categoryId: number;
  sort: SortProperty;
  order: "desc" | "asc";
  searchValue: string;
  currentPage: number;
  pageSize: number;
}
