import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
      <Link to="/">
        <button className="button">Вернуться на главную</button>
      </Link>
    </div>
  );
}

export default NotFoundBlock;
