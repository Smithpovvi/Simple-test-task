import { ActionsEnum } from "../enums.ts";
import { ICreateProduct, IProduct } from "../api/productsApi.ts";
import { Dispatch } from "react";

export interface IAppState {
  products: IProduct[];
  isLoading: boolean;
  isInit: boolean;
}

export interface IAction<Type, Payload> {
  type: Type;
  payload: Payload;
}

export type TActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? IAction<Key, undefined>
    : IAction<Key, M[Key]>;
};

export type TActionPayload = {
  [ActionsEnum.FetchProductsSuccess]: { products: IProduct[] };
  [ActionsEnum.FetchProductsStarted]: undefined;
  [ActionsEnum.FetchProductsError]: undefined;
  [ActionsEnum.CreateProductStarted]: { data: ICreateProduct };
  [ActionsEnum.CreateProductSuccess]: { product: IProduct };
  [ActionsEnum.CreateProductError]: undefined;
  [ActionsEnum.DeleteProductStarted]: { id: string };
  [ActionsEnum.DeleteProductSuccess]: { id: string };
  [ActionsEnum.DeleteProductError]: undefined;
  [ActionsEnum.SwitchLoader]: boolean;
};

export type ProductActions =
  TActionMap<TActionPayload>[keyof TActionMap<TActionPayload>];

export type TReducer = (state: IAppState, action: ProductActions) => IAppState;

export type TDispatch = Dispatch<ProductActions>;
