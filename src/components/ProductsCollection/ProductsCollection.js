import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ProductCard } from '../';
import './ProductsCollection.css';

const noop = () => {};

function ProductsCollection({ products, onCart, onFavourites, renderProduct, isFavourite = noop }) {
  return (
    <Grid
      container
      spacing={4}
      className="ProductsCollection-container"
    >
      {products.map(
        product => (
          <Grid item key={product.id}>
            <ProductCard
              product={product}
              onCart={() => onCart(product)}
              onFavourites={() => onFavourites(product)}
              isFavourite={isFavourite(product)}
            />
          </Grid>
        )
      )}
    </Grid>
  );
}

export default ProductsCollection;
