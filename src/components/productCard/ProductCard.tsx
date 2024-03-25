import "./ProductCard.css";
import React, { useCallback, useContext } from "react";
import trashIcon from "../../assets/icons/trash.svg";
import { IProduct } from "../../api/productsApi.ts";
import { AppContext } from "../../state/ContextProvider.tsx";
import { deleteProductStarted } from "../../state/actions.ts";

const ProductCard: React.FC<IProduct> = React.memo(
  ({ title, description, price, id }) => {
    const { dispatch } = useContext(AppContext);
    const deleteHandler = useCallback(
      () => dispatch(deleteProductStarted(id)),
      [dispatch, id],
    );
    return (
      <div className="product-card">
        <h3>{title}</h3>
        <div className="description">
          <label>Описание товара:</label>
          <p>{description}</p>
        </div>
        <span>
          Стоимость: <b>{price}$</b>
        </span>
        <img
          className="delete-button"
          src={trashIcon}
          alt="trashIcon"
          onClick={deleteHandler}
        />
      </div>
    );
  },
);

export default ProductCard;
