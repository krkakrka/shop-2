import React from 'react';
import Loader from 'react-loader-spinner';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import queryString from 'query-string';
import validator from 'validator';
import {
  ProductsCollection,
  NavigationBar,
  ProductsLinkList,
  ProductCard
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
      return (
        <Loader
          className="App-container"
          type="ThreeDots"
          color="red"
          height={80}
          width={80}
        />
      );
    }
    if(error) {
      return <p className="App-container">{error}</p>
    }

    return (
      <div className="App-container">
        <NavigationBar />

        <Switch>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>

          <Route exact path="/products" render={
            ({ location }) => {
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
                  <ProductsLinkList products={products} invalidProductId={match.params.id} />
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
