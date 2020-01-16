import {
  SECRET_PRODUCTS_LOADED,
} from '../actionTypes';

export default function secretProductsReducer(products = [], action) {
  switch(action.type) {
    case SECRET_PRODUCTS_LOADED:
      return action.products;
    default:
      return products;
  }
}
