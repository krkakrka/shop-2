import {
  AUTHORIZED
} from '../actionTypes';

export default function isAuthorizedReducer(error, action) {
  switch(action.type) {
    case AUTHORIZED:
      return true;
    default:
      return error;
  }
}
