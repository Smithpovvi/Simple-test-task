import "./ProductsList.css";
import ProductCard from "../../components/productCard/ProductCard.tsx";
import React, { useCallback, useContext } from "react";
import TextField from "../../components/textField/TextField.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormFieldsEnum } from "../../enums.ts";
import { AppContext } from "../../state/ContextProvider.tsx";
import { createProductStarted } from "../../state/actions.ts";

export type TProductForm = { [K in ProductFormFieldsEnum]: string };

const ProductsList: React.FC = React.memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TProductForm>({
    defaultValues: {
      [ProductFormFieldsEnum.title]: "",
      [ProductFormFieldsEnum.description]: "",
    },
    mode: "onSubmit",
  });
  const {
    state: { products, isLoading },
    dispatch,
  } = useContext(AppContext);
  const onSubmit: SubmitHandler<TProductForm> = useCallback(
    (data) => {
      dispatch(createProductStarted(data));
    },
    [dispatch],
  );
  const isSubmitDisabled = !!Object.keys(errors).length || isLoading;
  return (
    <div className="products-list">
      <h1>Fantastik Shop!</h1>
      <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Название товара"
          name={ProductFormFieldsEnum.title}
          control={control}
          rules={{
            maxLength: {
              value: 30,
              message: "Максимальное количество символов 30.",
            },
            required: true,
          }}
          style={{ width: "30%" }}
        />
        <TextField
          label="Описание товара"
          name={ProductFormFieldsEnum.description}
          control={control}
          rules={{
            maxLength: {
              value: 150,
              message: "Максимальное количество символов 150.",
            },
            required: true,
          }}
          style={{ width: "50%" }}
        />
        <button style={{ width: "18%" }} disabled={isSubmitDisabled}>
          Добавить товар
        </button>
      </form>
      <hr />
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
});

export default ProductsList;
