export enum ActionsEnum {
  FetchProductsStarted = "FETCH_PRODUCTS_STARTED",
  FetchProductsSuccess = "FETCH_PRODUCTS_SUCCESS",
  FetchProductsError = "FETCH_PRODUCTS_ERROR",
  CreateProductStarted = "CREATE_PRODUCT_STARTED",
  CreateProductSuccess = "CREATE_PRODUCT_SUCCESS",
  CreateProductError = "CREATE_PRODUCT_ERROR",
  DeleteProductStarted = "DELETE_PRODUCT_STARTED",
  DeleteProductSuccess = "DELETE_PRODUCT_SUCCESS",
  DeleteProductError = "DELETE_PRODUCT_ERROR",
  SwitchLoader = "SWITCH_LOADER",
}

export enum ProductFormFieldsEnum {
  title = "title",
  description = "description",
}
