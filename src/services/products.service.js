import { authorizeHeaders } from './auth.service';

const DOMAIN = 'https://blooming-cove-33093.herokuapp.com/food-shop';

async function getProducts() {
  const response = await window.fetch(`${DOMAIN}/products`);
  if (response.status !== 200) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}

async function getProductsSecure() {
  const response = await window.fetch(
    `${DOMAIN}/products/secure`,
    { headers: authorizeHeaders() }
  );
  if (response.status !== 200) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}

export { getProducts, getProductsSecure };
