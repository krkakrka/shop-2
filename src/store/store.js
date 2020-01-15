import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsService } from '../services';
import actionRecorder from './middlewares/actionRecorder';
import { cartReducer, favouritesReducer, ordersReducer } from './reducers';
import {
  ON_ORDER,
  TOGGLE_PROMO,
  PRODUCTS_LOADED,
  SECRET_PRODUCTS_LOADED,
  PRODUCTS_LOAD_ERROR,
  ON_FAVOURITE,
  ON_CART,
  LOGIN_ERROR,
  AUTHORIZED
} from './actionTypes';

const INITIAL_STATE = {
  products: [],
  secretProducts: [],
  favourites: [],
  cart: [],
  orders: [],
  isAuthorized: false,
  loading: true,
  error: undefined,
  loginError: undefined,
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
  switch(action.type) {
    case TOGGLE_PROMO:
      return {
        ...state,
        promoVisible: !state.promoVisible
      };
    case PRODUCTS_LOADED:
      return {
        ...state,
        products: action.products,
        loading: false
      };
    case SECRET_PRODUCTS_LOADED:
      return {
        ...state,
        secretProducts: action.products,
        loading: false
      };
    case PRODUCTS_LOAD_ERROR:
      return {
        ...state,
        error: 'Product loading failed'
      };
    case ON_FAVOURITE:
      return {
        ...state,
        favourites: favouritesReducer(state.favourites, action)
      };
    case ON_CART:
      return {
        ...state,
        cart: cartReducer(state.cart, action)
      };
    case ON_ORDER:
      return {
        ...state,
        cart: cartReducer(state.cart, action),
        orders: ordersReducer(state.orders, action)
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error
      };
    case AUTHORIZED:
      return {
        ...state,
        isAuthorized: true
      };
    default:
      return state;
  }
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
