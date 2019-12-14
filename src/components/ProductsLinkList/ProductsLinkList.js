import React from 'react';
import {
  Link,
} from 'react-router-dom';

function ProductsLinkList({ products, invalidProductId }) {
  return (
    <div>
      <p>{`Product ID invalid: ${invalidProductId}`}</p>
      <h3>Available products:</h3>
      {products.map(product => (
        <p key={product.id}><Link to={`/products/${product.id}`}>{product.id}</Link></p>
      ))}
    </div>
  );
}

export default ProductsLinkList;
