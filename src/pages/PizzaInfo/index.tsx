import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PizzaInfo.module.scss";

type PizzaType = {
  imageUrl: string
  title: string
  ingridients: string
  price: number
  rating: number
}

const PizzaInfo: React.FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<PizzaType>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await axios.get<PizzaType>(
          `https://63fb1dd12027a45d8d60512e.mockapi.io/items/` + id
        );
        setPizza(response.data);
      } catch (error) {
        alert("Произошла ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <div className={styles.description}>Loading ...</div>;
  }

  return (
    <div className={styles.description}>
      <img src={pizza.imageUrl} alt="Pizza" />
      <div>
        <h2 className={styles.title}>{pizza.title}</h2>
        <p>{pizza.ingridients}</p>
        <h3>
          <span>от</span> {pizza.price} ₽
        </h3>
        <div className={styles.rating}>Рейтинг: {pizza.rating}</div>
      </div>
    </div>
  );
}

export default PizzaInfo;