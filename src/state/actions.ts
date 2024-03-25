import { IAction, TActionPayload } from "./types.ts";
import { ActionsEnum } from "../enums.ts";
import { ICreateProduct, IProduct } from "../api/productsApi.ts";

export const actionCreator = <Type extends keyof TActionPayload>(
  type: Type,
  payload: TActionPayload[Type],
): IAction<Type, TActionPayload[Type]> => ({
  type,
  payload,
});

export const fetchProductsStarted = () =>
  actionCreator(ActionsEnum.FetchProductsStarted, undefined);
export const fetchProductsSuccess = (products: IProduct[]) =>
  actionCreator(ActionsEnum.FetchProductsSuccess, { products });
export const fetchProductsError = () =>
  actionCreator(ActionsEnum.FetchProductsError, undefined);

export const createProductStarted = (data: ICreateProduct) =>
  actionCreator(ActionsEnum.CreateProductStarted, { data });
export const createProductSuccess = (product: IProduct) =>
  actionCreator(ActionsEnum.CreateProductSuccess, { product });
export const createProductError = () =>
  actionCreator(ActionsEnum.CreateProductError, undefined);

export const deleteProductStarted = (id: string) =>
  actionCreator(ActionsEnum.DeleteProductStarted, { id });
export const deleteProductSuccess = (id: string) =>
  actionCreator(ActionsEnum.DeleteProductSuccess, { id });
export const deleteProductError = () =>
  actionCreator(ActionsEnum.DeleteProductError, undefined);

export const switchLoader = (value: boolean) =>
  actionCreator(ActionsEnum.SwitchLoader, value);
