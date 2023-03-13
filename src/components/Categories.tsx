import React from "react";

type CategoriesPropsType = {
  value: number
  changeCategory: (idx: number) => void
}

const categories: Array<string> = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Ассорти",
];

const Categories: React.FC<CategoriesPropsType> = React.memo(({ value, changeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => {
          return (
            <li
              key={index}
              className={value === index ? "active" : ""}
              onClick={() => changeCategory(index)}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </div>
  );
})

export default Categories;
