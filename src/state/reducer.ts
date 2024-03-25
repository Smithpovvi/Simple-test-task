import { ActionsEnum } from "../enums.ts";
import { IAppState, ProductActions, TDispatch, TReducer } from "./types.ts";
import { productsApi } from "../api/productsApi.ts";
import * as actions from "./actions.ts";

export const initState: IAppState = {
  products: [],
  isLoading: false,
  isInit: false,
};

export const dispatchMiddleware = (dispatch: TDispatch) => {
  return (action: ProductActions) => {
    switch (action.type) {
      case ActionsEnum.FetchProductsStarted:
        dispatch(actions.switchLoader(true));
        productsApi
          .get()
          .then((products) => {
            dispatch(actions.fetchProductsSuccess(products));
          })
          .catch(() => {
            dispatch(actions.fetchProductsError());
          });
        break;
      case ActionsEnum.CreateProductStarted: {
        dispatch(actions.switchLoader(true));
        const { data } = action.payload;
        productsApi
          .create(data)
          .then((product) => {
            dispatch(actions.createProductSuccess(product));
          })
          .catch(() => {
            dispatch(actions.createProductError());
          });
        break;
      }
      case ActionsEnum.DeleteProductStarted: {
        dispatch(actions.switchLoader(true));
        const { id } = action.payload;
        productsApi
          .delete(id)
          .then((id) => {
            dispatch(actions.deleteProductSuccess(id));
          })
          .catch(() => {
            dispatch(actions.deleteProductError());
          });
        break;
      }
      default:
        return dispatch(action);
    }
  };
};

export const reducer: TReducer = (state, action) => {
  switch (action.type) {
    case ActionsEnum.FetchProductsError ||
      ActionsEnum.CreateProductError ||
      ActionsEnum.DeleteProductError:
      return { ...state, isLoading: false };
    case ActionsEnum.FetchProductsSuccess: {
      const { products } = action.payload;
      return { ...state, products, isLoading: false, isInit: true };
    }
    case ActionsEnum.CreateProductSuccess: {
      const { product } = action.payload;
      return {
        ...state,
        products: [product, ...state.products],
        isLoading: false,
      };
    }
    case ActionsEnum.DeleteProductSuccess: {
      const { id } = action.payload;
      return {
        ...state,
        products: state.products.filter((product) => product.id !== id),
        isLoading: false,
      };
    }
    case ActionsEnum.SwitchLoader: {
      const isLoading = action.payload;
      return { ...state, isLoading };
    }
    default:
      return state;
  }
};
