import {
  AUTHORIZED
} from '../actionTypes';

export default function isAuthorizedReducer(isAuthorized = false, action) {
  switch(action.type) {
    case AUTHORIZED:
      return true;
    default:
      return isAuthorized;
  }
}
