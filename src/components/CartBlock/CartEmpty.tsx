import React from "react";
import { Link } from "react-router-dom";
import emptyCartImg from "../../assets/img/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Cart is empty <span>😕</span></h2>
        <p>
          You probably haven't ordered a pizza yet
          <br />
          To order a pizza, go to the Home page
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Back to Home page</span>
        </Link>
      </div>
    </div>
  );
}