import React from "react";

export const ErrorMessage: React.FC = () => {
  return (
    <div className="content__error-info">
      <h2>Something went wrong 😕</h2>
      <p>
        We are already dealing with this problem
        <br />
        Try again later
      </p>
    </div>
  );
}
