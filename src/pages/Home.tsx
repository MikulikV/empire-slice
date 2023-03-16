import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { useDebounce } from "../app/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId, setCurrentPage, setFilters, setSort } from "../redux/filter/slice";
import { QueryString, SortProperty } from "../redux/filter/types";
import { selectItems } from "../redux/items/selectors";
import { fetchPizzas } from "../redux/items/asyncActions";
import { Status } from "../redux/items/types";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort, order, searchValue, currentPage } =
    useAppSelector(selectFilter);
  const { items, status } = useAppSelector(selectItems);
  const debouncedSearchValue = useDebounce(searchValue, 250); // Значение из поиска с задержкой в 250 мс

  // Логика запроса пицц с бэкенда
  const [searchParams, setSearchParams] = useSearchParams();
  const isQuery = React.useRef<boolean>(false); // Есть ли запрос сейчас
  const isMounted = React.useRef<boolean>(false); // Был ли первый render
  const getPizzas = () => {
    const category = categoryId ? `category=${categoryId}` : "";
    const search = debouncedSearchValue ? `title=${debouncedSearchValue}` : "";
    dispatch(
      fetchPizzas({
        search: search,
        page: String(currentPage),
        category: category,
        sortBy: sort,
        order: order,
      })
    );
  };

  // Если изменили параметры и был первый render
  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        page: String(currentPage),
        category: String(categoryId),
        sortBy: sort,
        order: order,
      };
      setSearchParams(params);
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryId, sort, order, currentPage]);

  // Если был первый render, то проверяем URL параметры и сохраняем их в redux
  React.useEffect(() => {
    if (
      searchParams.has("page") &&
      searchParams.toString() !==
      "page=1&category=0&sortBy=rating&order=desc" // Data from filterSlice initial state
    ) {
      const params = Object.fromEntries([...searchParams]) as QueryString;
      dispatch(setFilters(params));
      isQuery.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Если был первый render, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isQuery.current) {
      getPizzas();
    }
    isQuery.current = false;
    // eslint-disable-next-line
  }, [debouncedSearchValue, currentPage, categoryId, sort, order]);

  const changeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
    // eslint-disable-next-line 
  }, []);
  const changeSort = React.useCallback((sortProperty: SortProperty) => {
    dispatch(setSort(sortProperty));
    // eslint-disable-next-line 
  }, []);
  const changePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} changeCategory={changeCategory} />
        <Sort value={sort} changeSort={changeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <ErrorMessage />
      ) : (
        <div className="content__items">
          {status === Status.LOADING ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} changePage={changePage} />
    </>
  );
};

export default Home;
