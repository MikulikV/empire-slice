import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PizzaInfo.module.scss";
import { Preloader } from "../../app/Preloader";

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
          `https://3vc5mh-8080.csb.app/items/` + id
        );
        setPizza(response.data);
      } catch (error) {
        alert("There was an error when I received the pizza");
        navigate("/");
      }
    }
    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <Preloader />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.description}>
        <img src={pizza.imageUrl} alt="Pizza" />
        <div>
          <h2 className={styles.title}>{pizza.title}</h2>
          <p>{pizza.ingridients}</p>
          <h3>
            <span>from</span> {pizza.price} $
          </h3>
          <div className={styles.rating}>Rating: {pizza.rating}</div>
        </div>
      </div>
      <Link to="/">
        <button className="button">Back to Home page</button>
      </Link>
    </div>
  );
}

export default PizzaInfo;