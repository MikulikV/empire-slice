import React from "react";

export const ErrorMessage: React.FC = () => {
  return (
    <div className="content__error-info">
      <h2>Что-то пошло не так 😕</h2>
      <p>
        Мы уже занимаемся решением данной проблемы
        <br />
        Попробуйте повторить попытку позже
      </p>
    </div>
  );
}
