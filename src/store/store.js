import { createStore, applyMiddleware, combineReducers } from 'redux';
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

function schedulePromo(timeout) {
  return (dispatch, getState) => {
    window.setTimeout(() => {
      dispatch({ type: TOGGLE_PROMO });
    }, timeout);
  };
}

const rootReducer = combineReducers({
  products: productsReducer,
  secretProducts: secretProductsReducer,
  favourites: favouritesReducer,
  cart: cartReducer,
  orders: ordersReducer,
  isAuthorized: isAuthorizedReducer,
  loginError: loginErrorReducer,
  loading: loadingReducer,
  error: errorReducer,
  promoVisible: promoVisibleReducer
});

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
