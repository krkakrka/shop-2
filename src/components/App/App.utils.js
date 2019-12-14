function getCartProductIndex(product, cart) {
  return cart.findIndex((cartProduct) => cartProduct.product.id === product.id);
}

function existsInCart(product, cartProducts) {
  const cartIndex = getCartProductIndex(product, cartProducts);
  const existsInCart = cartIndex !== -1;
  return existsInCart;
}

function getFavouritesProductIndex(product, favourites) {
  return favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id);
}

function existsInFavourites(product, favouriteProducts) {
  const favouritesIndex = getFavouritesProductIndex(product, favouriteProducts);
  const existsInFavourties = favouritesIndex !== -1;
  return existsInFavourties;
}

function replaceProduct(products, index, newProduct) {
  return [
    ...products.slice(0, index),
    newProduct,
    ...products.slice(index + 1),
  ];
}

function removeProduct(products, index) {
  return [
    ...products.slice(0, index),
    ...products.slice(index + 1),
  ];
}

function getProductById(id, products) {
  return products.find((product) => product.id === id);
}

export {
  getCartProductIndex,
  existsInCart,
  getFavouritesProductIndex,
  existsInFavourites,
  replaceProduct,
  removeProduct,
  getProductById
}
