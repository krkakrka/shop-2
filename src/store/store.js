import { createStore } from 'redux';
import { productsService } from '../services';
import { cartReducer, favouritesReducer, ordersReducer } from './reducers';

const INITIAL_STATE = {
  products: [],
  secretProducts: [],
  favourites: [],
  cart: [],
  orders: [],
  isAuthorized: false,
  loading: true,
  error: undefined,
  loginError: undefined
}

function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'PRODUCTS_LOADED':
      return {
        ...state,
        products: action.products,
        loading: false
      };
    case 'SECRET_PRODUCTS_LOADED':
      return {
        ...state,
        secretProducts: action.products,
        loading: false
      };
    case 'PRODUCTS_LOAD_ERROR':
      return {
        ...state,
        error: 'Product loading failed'
      };
    case 'ON_FAVOURITE':
      return {
        ...state,
        favourites: favouritesReducer(state.favourites, action)
      };
    case 'ON_CART':
      return {
        ...state,
        cart: cartReducer(state.cart, action)
      };
    case 'ON_ORDER':
      return {
        ...state,
        cart: cartReducer(state.cart, action),
        orders: ordersReducer(state.orders, action)
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: action.error
      };
    case 'AUTHORIZED':
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
productsService.getProducts()
  .then(products => store.dispatch({ type: 'PRODUCTS_LOADED', products }))
  .catch(error => store.dispatch({ type: 'PRODUCTS_LOAD_ERROR', error }))

export { store };
