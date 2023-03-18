import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { selectCartItem } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";
import { Pizza } from "../../redux/items/types";

const typeNames: string[] = ["thin crust", "original"];

export const PizzaBlock: React.FC<Pizza> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(
    selectCartItem(id, sizes[activeSize], typeNames[activeType])
  );

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price: price + 1 * activeSize,
      imageUrl,
      size: sizes[activeSize],
      type: typeNames[activeType],
      count: 0
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              className={activeType === type ? "active" : ""}
              onClick={() => setActiveType(type)}
            >
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              className={activeSize === i ? "active" : ""}
              onClick={() => setActiveSize(i)}
            >
              {size} inch
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price + 1 * activeSize} $</div>
        <button
          className="button button--outline button--add"
          onClick={onClickAdd}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add to cart</span>
          {cartItem && <i>{cartItem.count}</i>}
        </button>
      </div>
    </div>
  );
};
