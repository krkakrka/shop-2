import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ProductCard } from '../';
import './ProductsCollection.css';

function ProductsCollection({ products }) {
  return (
    <GridList
      className="ProductsCollection-container"
      cellHeight={160}
      cols={4}
      spacing={20}
    >
      {products.map(
        product => (
          <GridListTile
            key={product.id}
            cols={1}
            rows={3}
          >
            <ProductCard product={product} />
          </GridListTile>
        )
      )}
    </GridList>
  );
}

export default ProductsCollection;
