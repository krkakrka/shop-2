function getFavouritesProductIndex(product, favourites) {
  return favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id);
}

function existsInFavourites(product, favouriteProducts) {
  const favouritesIndex = getFavouritesProductIndex(product, favouriteProducts);
  const existsInFavourties = favouritesIndex !== -1;
  return existsInFavourties;
}

function removeProduct(products, index) {
  return [
    ...products.slice(0, index),
    ...products.slice(index + 1),
  ];
}

function toggleFavourite(product, favourites) {
  if (existsInFavourites(product, favourites)) {
    const favouriteIndex = getFavouritesProductIndex(product, favourites);
    return removeProduct(favourites, favouriteIndex)
  } else {
    return favourites.concat(product);
  }
}

function favouritesReducer(favourites, action) {
  switch (action.type) {
    case 'ON_FAVOURITE': {
      return toggleFavourite(action.product, favourites);
    }
    default:
      return favourites;
  }
}

export default favouritesReducer;
