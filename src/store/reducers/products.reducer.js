import {
  PRODUCTS_LOADED,
} from '../actionTypes';

export default function productsReducer(products = [], action) {
  switch(action.type) {
    case PRODUCTS_LOADED:
      return action.products;
    default:
      return products;
  }
}
