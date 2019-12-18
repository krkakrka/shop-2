let authToken;

function getAuthToken() {
  return authToken;
}

function generateToken(username, password) {
  return window.btoa(`${username}:${password}`);
}

async function authorize(username, password) {
  const token = generateToken(username, password);
  const response = await fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products/secure', {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
  const tokenValid = response.ok;
  if (tokenValid) {
    authToken = token;
  } else {
    throw new Error('Invalid username and/or password');
  }
}

function authorizeHeaders(headers = {}) {
  return {
    ...headers,
    Authorization: `Basic ${authToken}`
  };
}

export {
  authorize,
  getAuthToken,
  authorizeHeaders
};
