import { createStore } from 'redux';
import { productsService } from '../services';
import { cartReducer, favouritesReducer } from './reducers';

const INITIAL_STATE = {
  products: [],
  favourites: [],
  cart: [],
  loading: true,
  error: undefined
}

function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'PRODUCTS_LOADED':
      return {
        ...state,
        products: action.products,
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
    default:
      return state;
  }
}

const store = createStore(rootReducer);
productsService.getProducts()
  .then(products => store.dispatch({ type: 'PRODUCTS_LOADED', products }))
  .catch(error => store.dispatch({ type: 'PRODUCTS_LOAD_ERROR', error }))

export { store };
