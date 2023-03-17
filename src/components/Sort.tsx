import React from "react";
import { useAppDispatch } from "../app/hooks/hooks";
import { setOrder } from "../redux/filter/slice";
import { SortProperty } from "../redux/filter/types";

type SortPropsType = {
  value: SortProperty
  changeSort: (sortProperty: SortProperty) => void
};
type SortType = {
  name: string
  sortProperty: SortProperty
};

const sortList: SortType[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

export const Sort: React.FC<SortPropsType> = React.memo(({ value, changeSort }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch()
  const selectedSort = sortList.find((obj) => obj.sortProperty === value);

  const onChangeSortProperty = (sortProperty: SortProperty) => {
    changeSort(sortProperty);
    setOpen(false);
  };

  return (
    <div
      className="sort"
      tabIndex={1}
      onBlur={() => setOpen(false)}
    >
      <div className="sort__label">
        <svg
          className={open ? "active" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => setOpen(!open)}
        >
          {selectedSort && selectedSort.name}
        </span>
        <button
          value="По возрастанию"
          onClick={() => dispatch(setOrder("asc"))}
        >
          ↑
        </button>
        <button
          value="По убыванию"
          onClick={() => dispatch(setOrder("desc"))}
        >
          ↓
        </button>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={value === obj.sortProperty ? "active" : ""}
                onClick={() => onChangeSortProperty(obj.sortProperty)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})