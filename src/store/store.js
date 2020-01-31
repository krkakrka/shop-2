import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsService } from '../services';
import actionRecorder from './middlewares/actionRecorder';
import { cacheStateToLocalStorage, getCachedStateFromLocalStorate } from '../services';
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
  feedbackVisibleReducer,
  userFeedbackReducer
} from './reducers';
import {
  TOGGLE_USER_FEEDBACK_DIALOG,
  PRODUCTS_LOADED,
  PRODUCTS_LOAD_ERROR,
} from './actionTypes';

function scheduleFeedback(timeout) {
  return (dispatch, getState) => {
    window.setTimeout(() => {
      dispatch({ type: TOGGLE_USER_FEEDBACK_DIALOG  });
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
  feedbackVisible: feedbackVisibleReducer,
  userFeedback: userFeedbackReducer
});

const store = createStore(
  rootReducer,
  getCachedStateFromLocalStorate(),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      actionRecorder
    )
  )
);

store.subscribe(() => cacheStateToLocalStorage(store.getState()));

if (store.getState().products.length === 0) {
  productsService.getProducts()
    .then(products => store.dispatch({ type: PRODUCTS_LOADED, products }))
    .catch(error => store.dispatch({ type: PRODUCTS_LOAD_ERROR, error }));
}

store.dispatch(scheduleFeedback(1000));

export { store };
