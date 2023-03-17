import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p className={styles.description}>
        Unfortunately, this page is not available in our online store
      </p>
      <Link to="/">
        <button className="button">Back to Home page</button>
      </Link>
    </div>
  );
}

