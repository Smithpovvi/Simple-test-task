import data from "./db/db.json";
import getRandomNumber from "../utils/getRandomNumber.ts";
import { v4 as uuid } from "uuid";

export interface ICreateProduct {
  title: string;
  description: string;
}

export interface IProduct extends ICreateProduct {
  id: string;
  price: number;
}

export interface IProductsApi {
  get: () => Promise<IProduct[]>;
  create: (data: ICreateProduct) => Promise<IProduct>;
  delete: (id: string) => Promise<string>;
}

export const productsApi: IProductsApi = {
  get() {
    const promise: Promise<IProduct[]> = new Promise((resolve) => {
      setTimeout(() => {
        const cache: IProduct[] =
          JSON.parse(localStorage.getItem("products-data") || "") || [];
        resolve(cache.length ? cache : data);
      }, 1500);
    });
    return promise;
  },
  create(data) {
    const promise: Promise<IProduct> = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: uuid(), price: getRandomNumber(3), ...data });
      }, 500);
    });
    return promise;
  },
  delete(id) {
    const promise: Promise<string> = new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
    return promise;
  },
};
