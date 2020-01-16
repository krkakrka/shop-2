import {
  TOGGLE_PROMO
} from '../actionTypes';

export default function promoVisibleReducer(promoVisible = false, action) {
  switch(action.type) {
    case TOGGLE_PROMO:
      return !promoVisible;
    default:
      return promoVisible;
  }
}
