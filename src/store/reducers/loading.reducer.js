import {
  PRODUCTS_LOADED,
  SECRET_PRODUCTS_LOADED
} from '../actionTypes';

export default function loadingReducer(loading, action) {
  switch(action.type) {
    case PRODUCTS_LOADED:
      return false;
    case SECRET_PRODUCTS_LOADED:
      return false;
    default:
      return loading;
  }
}
