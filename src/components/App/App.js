import React from 'react';
import Loader from 'react-loader-spinner';
import {
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import queryString from 'query-string';
import validator from 'validator';
import {
  ProductsCollection,
  NavigationBar,
} from '../';
import { productsService } from '../../services';
import {
  existsInCart,
  existsInFavourites,
  getFavouritesProductIndex,
  getCartProductIndex,
  replaceProduct,
  removeProduct,
  getProductById
} from './App.utils';
import './App.css';
import ProductCard from '../ProductCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      favourites: [],
      cart: [],
      loading: true,
      error: undefined,
    };
  }

  componentDidMount() {
    productsService.getProducts()
      .then((products) => this.setState({ products }))
      .catch((err) => this.setState({ error: err.message }))
      .finally(() => this.setState({ loading: false }))
    ;
  }

  addToCart(product) {
    const { cart } = this.state;

    if (existsInCart(product, cart)) {
      const index = getCartProductIndex(product, cart);
      const currentCount = cart[index].count;
      const newProduct = { product, count: currentCount + 1 };
      this.setState({
        cart: replaceProduct(cart, index, newProduct)
      })
    } else {
      this.setState({
        cart: cart.concat({ product, count: 1 })
      });
    }
  }

  toggleFavourite(product) {
    const { favourites } = this.state;

    if (existsInFavourites(product, favourites)) {
      const favouriteIndex = getFavouritesProductIndex(product, favourites);
      this.setState({
        favourites: removeProduct(favourites, favouriteIndex)
      })
    } else {
      this.setState({
        favourites: favourites.concat(product)
      });
    }
  }
  render() {
    const {
      products,
      favourites,
      cart,
      loading,
      error,
    } = this.state;

    if (loading) {
      return <Loader type="ThreeDots" color="red" height={80} width={80} />;
    }
    if(error) {
      return <p>{error}</p>
    }

    return (
      <div className="App-container">
        <NavigationBar />

        <Switch>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>

          <Route exact path="/products" render={
            ({ location, history }) => {
              const query = queryString.parse(location.search);
              let maxPriceExists;
              try {
                maxPriceExists = validator.isNumeric(query.maxPrice);
              } catch (e) {
                maxPriceExists = false; 
              }
              const filteredProducts = maxPriceExists
                ? products.filter((product) => product.price < Number(query.maxPrice))
                : products;
              return (
                <ProductsCollection
                  products={filteredProducts}
                  onCart={(product) => this.addToCart(product)}
                  onFavourites={(product) => this.toggleFavourite(product)}
                  isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
                />
              );
            }}
          />

          <Route path="/products/:id" render={
            ({ match }) => {
              const product = getProductById(match.params.id, products);
              if (product) {
                return <ProductCard product={product} />;
              } else {
                return (
                  <div>
                    <p>{`Product ID invalid: ${match.params.id}`}</p>
                    <h3>Available products:</h3>
                    {products.map(product => (
                      <p key={product.id}><Link to={`/products/${product.id}`}>{product.id}</Link></p>
                    ))}
                  </div>
                );
              }
            }}
          />

          <Route path="/favourites">
            <ProductsCollection
              products={favourites}
              onCart={(product) => this.addToCart(product)}
              onFavourites={(product) => this.toggleFavourite(product)}
              isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
            />
          </Route>

          <Route path="/cart">
            <ProductsCollection
              products={cart.map(entry => entry.product)}
              onCart={(product) => this.addToCart(product)}
              onFavourites={(product) => this.toggleFavourite(product)}
              isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
            />
          </Route>

          <Route path="*">404</Route>
        </Switch>
      </div>
    );
  }
}

export default App;
