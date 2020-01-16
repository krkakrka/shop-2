import {
  ON_ORDER
} from '../actionTypes';

function ordersReducer(orders, action) {
  switch(action.type) {
    case ON_ORDER:
      return orders.concat(action.order);
    default:
      return orders;
  }
}

export default ordersReducer;