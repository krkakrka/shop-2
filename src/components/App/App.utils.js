function getProductById(id, products) {
  return products.find((product) => product.id === id);
}

export {
  getProductById
};
