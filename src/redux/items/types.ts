export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  ingridients?: string;
  rating?: number;
};

export interface FetchResponse {
  data: Pizza[];
  xTotalCount: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ItemsState {
  items: Pizza[];
  xTotalCount: number;
  status: Status;
}
