import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeConfig } from "./config/Theme.config";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeConfig>
          <App />
        </ThemeConfig>
      </PersistGate>
    </Provider>
  </HashRouter>
);
