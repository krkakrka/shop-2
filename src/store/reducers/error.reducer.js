import {
  PRODUCTS_LOAD_ERROR
} from '../actionTypes';

const ERROR = 'Product loading failed';

export default function errorReducer(error = null, action) {
  switch(action.type) {
    case PRODUCTS_LOAD_ERROR:
      console.log(action.error);
      return ERROR;
    default:
      return error;
  }
}
