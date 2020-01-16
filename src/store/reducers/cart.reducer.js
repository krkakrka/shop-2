import {
  ON_CART,
  ON_ORDER
} from '../actionTypes';

function getCartProductIndex(product, cart) {
  return cart.findIndex((cartProduct) => cartProduct.product.id === product.id);
}

function existsInCart(product, cartProducts) {
  const cartIndex = getCartProductIndex(product, cartProducts);
  const existsInCart = cartIndex !== -1;
  return existsInCart;
}

function replaceProduct(products, index, newProduct) {
  return [
    ...products.slice(0, index),
    newProduct,
    ...products.slice(index + 1),
  ];
}

function addToCart(product, cart) {
  if (existsInCart(product, cart)) {
    const index = getCartProductIndex(product, cart);
    const currentCount = cart[index].count;
    const newProduct = { product, count: currentCount + 1 };
    return replaceProduct(cart, index, newProduct);
  } else {
    return cart.concat({ product, count: 1 });
  }
}

function cartReducer(cart = [], action) {
  switch(action.type) {
    case ON_CART:
      return addToCart(action.product, cart);
    case ON_ORDER:
      return [];
    default:
      return cart;
  }
}

export default cartReducer;
