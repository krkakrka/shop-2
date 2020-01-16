import {
  LOGIN_ERROR
} from '../actionTypes';


export default function loginErrorReducer(error, action) {
  switch(action.type) {
    case LOGIN_ERROR:
      return action.error;
    default:
      return error;
  }
}
