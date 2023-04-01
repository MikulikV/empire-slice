import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PizzaInfo.module.scss";
import { Preloader } from "../../app/Preloader";
import { Pizza } from "../../redux/items/types";
import { Alert, AlertTitle } from "@mui/material";

const PizzaInfo: React.FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<Pizza>();
  const [open, setOpen] = React.useState<boolean>(false); // Alert window

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await axios.get<Pizza>(
          `https://3vc5mh-8080.csb.app/items/` + id
        );
        setPizza(response.data);
      } catch (error) {
        setOpen(true)
      }
    }
    fetchPizza();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!pizza) {
    return open ?
      <Alert severity="error" sx={{ alignItems: "center" }} onClose={() => { setOpen(false); navigate("/") }}>
        <AlertTitle>Error</AlertTitle>
        There was an error when I received the pizza
      </Alert>
      : <Preloader />;
  } else {
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
}

export default PizzaInfo;