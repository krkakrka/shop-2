import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsService } from '../services';
import actionRecorder from './middlewares/actionRecorder';
import {
  productsReducer,
  secretProductsReducer,
  favouritesReducer,
  cartReducer,
  ordersReducer,
  isAuthorizedReducer,
  loginErrorReducer,
  loadingReducer,
  errorReducer,
  promoVisibleReducer
} from './reducers';
import {
  TOGGLE_PROMO,
  PRODUCTS_LOADED,
  PRODUCTS_LOAD_ERROR,
} from './actionTypes';

const INITIAL_STATE = {
  products: [],
  secretProducts: [],
  favourites: [],
  cart: [],
  orders: [],
  isAuthorized: false,
  loginError: undefined,
  loading: true,
  error: undefined,
  promoVisible: false
}

function schedulePromo(timeout) {
  return (dispatch, getState) => {
    window.setTimeout(() => {
      dispatch({ type: TOGGLE_PROMO });
    }, timeout);
  };
}

function rootReducer(state = INITIAL_STATE, action) {
  return {
    products: productsReducer(state.products, action),
    secretProducts: secretProductsReducer(state.secretProducts, action),
    favourites: favouritesReducer(state.favourites, action),
    cart: cartReducer(state.cart, action),
    orders: ordersReducer(state.orders, action),
    isAuthorized: isAuthorizedReducer(state.isAuthorized, action),
    loginError: loginErrorReducer(state.loginError, action),
    loading: loadingReducer(state.loading, action),
    error: errorReducer(state.error, action),
    promoVisible: promoVisibleReducer(state.promo, action)
  };
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      actionRecorder
    )
  )
);

productsService.getProducts()
  .then(products => store.dispatch({ type: PRODUCTS_LOADED, products }))
  .catch(error => store.dispatch({ type: PRODUCTS_LOAD_ERROR, error }));

store.dispatch(schedulePromo(5000));

export { store };
