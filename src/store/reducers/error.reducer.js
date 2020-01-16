import {
  PRODUCTS_LOAD_ERROR
} from '../actionTypes';

const ERROR = 'Product loading failed';

export default function errorReducer(error, action) {
  switch(action.type) {
    case PRODUCTS_LOAD_ERROR:
      return ERROR;
    default:
      return error;
  }
}
