import { productsService, authService } from '../services';

import {
  ON_ORDER,
  PRODUCTS_LOADED,
  SECRET_PRODUCTS_LOADED,
  PRODUCTS_LOAD_ERROR,
  ON_FAVOURITE,
  ON_CART,
  LOGIN_ERROR,
  AUTHORIZED,
  TOGGLE_USER_FEEDBACK_DIALOG,
  FEEDBACK_SUBMITED
} from './actionTypes';

export function onOrder(order) {
  return { type: ON_ORDER, order };
}

export function toggleFeedback() {
  return { type: TOGGLE_USER_FEEDBACK_DIALOG };
}

export function productsLoaded(products) {
  return { type: PRODUCTS_LOADED, products };
}

export function secretProductsLoaded(products) {
  return { type: SECRET_PRODUCTS_LOADED, products };
}

export function productsLoadedError(error) {
  return { type: PRODUCTS_LOAD_ERROR, error };
}

export function onFavourite(product) {
  return { type: ON_FAVOURITE, product };
}

export function onCart(product) {
  return { type: ON_CART, product };
}

export function loginError(error) {
  return { type: LOGIN_ERROR, error };
}

export function authorized() {
  return { type: AUTHORIZED };
}

export function maybeAuthorize(username, password, redirectUrl) {
  return async (dispatch) => {
    try {
      await authService.authorize(username, password);
      dispatch(authorized());
      const secretProducts = await productsService.getProductsSecure();
      dispatch(secretProductsLoaded(secretProducts));
      window.location.history.push(redirectUrl);
    } catch (e) {
      dispatch(loginError(e.message));
    }
  }
}

export function feedbackSubmit(feedback) {
  return { type: FEEDBACK_SUBMITED, feedback };
}