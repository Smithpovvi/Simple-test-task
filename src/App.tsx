import "./App.css";
import ProductsList from "./pages/productsList/ProductsList.tsx";
import { useContext, useEffect } from "react";
import { AppContext } from "./state/ContextProvider.tsx";
import { fetchProductsStarted } from "./state/actions.ts";

const App = () => {
  const {
    selectors: { isLoading, products, isInit },
    dispatch,
  } = useContext(AppContext);
  const fetchProducts = () => dispatch(fetchProductsStarted());

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isInit) {
      localStorage.setItem("products-data", JSON.stringify(products));
    }
  }, [isInit, products]);

  return (
    <div className="main-container">
      {isLoading && <div className="loader"></div>}
      <ProductsList />
    </div>
  );
};

export default App;
