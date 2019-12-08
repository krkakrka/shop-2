import React from 'react';
import { ProductsCollection } from '../';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    window.fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products')
      .then((response) => response.json())
      .then((products) => this.setState({ products }));
  }
  render() {
    const { products } = this.state;
    return <ProductsCollection products={products} />;
  }
}

export default App;
