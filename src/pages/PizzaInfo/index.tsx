import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PizzaInfo.module.scss";
import { Preloader } from "../../app/Preloader";
import { Pizza } from "../../redux/items/types";
import { Alert, AlertTitle } from "@mui/material";
import { StyledRating } from "../../config/Theme.config";

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
      <Alert severity="error" sx={{ alignItems: "center", fontSize: "16px" }} onClose={() => { setOpen(false); navigate("/") }}>
        <AlertTitle sx={{ fontSize: "22px" }}>Error</AlertTitle>
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
            <StyledRating
              name="half-rating-read"
              defaultValue={pizza.rating ? pizza.rating / 2 : 0}
              precision={0.5}
              size={"large"}
              readOnly />
          </div>
        </div>
        <button className="button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }
}

export default PizzaInfo;