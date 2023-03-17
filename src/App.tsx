import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import { Header } from "./components";
import { Preloader } from "./app/Preloader";
import ErrorBoundary from "./app/ErrorBoundary";

const Home = React.lazy(() => import(/* webpackChunkName: "Home"*/ './pages/Home'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/'./pages/Cart'))
const PizzaInfo = React.lazy(() => import(/* webpackChunkName: "PizzaInfo"*/ './pages/PizzaInfo'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'))

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <ErrorBoundary>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizza/:id" element={<PizzaInfo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>

  );
}

export default App;
