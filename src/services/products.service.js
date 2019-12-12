const PRODUCTS_URL = 'https://blooming-cove-33093.herokuapp.com/food-shop/products';

async function getProducts() {
  const response = await window.fetch(PRODUCTS_URL);
  if (response.status !== 200) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}

export { getProducts };
