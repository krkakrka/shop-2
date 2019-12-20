import React from 'react';
import { compose } from 'redux';
import Loader from 'react-loader-spinner';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import queryString from 'query-string';
import validator from 'validator';
import {
  ProductsCollection,
  NavigationBar,
  ProductsLinkList,
  ProductCard,
  Login
} from '../';
import { productsService, authService } from '../../services';
import {
  getProductById
} from './App.utils';
import './App.css';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      secretProducts: [],
      isAuthorized: false,
    };
  }

  async handleLogin(username, password) {
    try {
      const { location, history } = this.props;
      await authService.authorize(username, password);
      const query = queryString.parse(location.search);
      const redirectUrl = query.redirectedFrom || '/';
      const secretProducts = await productsService.getProductsSecure();
      this.setState(
        { isAuthorized: true, secretProducts },
        () => history.push(redirectUrl)
      );
    } catch(e) {
      this.setState({ loginError: e.message });
    }
  }

  render() {
    const {
      products,
      favourites,
      cart,
      onFavourite,
      onCart,
      loading,
      error,
    } = this.props;
    const {
      secretProducts,
      isAuthorized,
      loginError,
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
                  onCart={onCart}
                  onFavourites={onFavourite}
                  isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
                />
              );
            }}
          />

          <Route path="/secret-products" render={
            ({ location }) => (
              isAuthorized
              ? <ProductsCollection
                products={secretProducts}
                onCart={onCart}
                onFavourites={onFavourite}
                isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
              />
              : <Redirect to={`/login?redirectedFrom=${location.pathname}`} />
            )
          }>
          </Route>

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
              onCart={onCart}
              onFavourites={onFavourite}
              isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
            />
          </Route>

          <Route path="/cart">
            <ProductsCollection
              products={cart.map(entry => entry.product)}
              onCart={onCart}
              onFavourites={onFavourite}
              isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
            />
          </Route>
          
          <Route path="/login">
            <Login onSubmit={(username, password) => this.handleLogin(username, password)} error={loginError} />
          </Route>

          <Route path="*">404</Route>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
    favourites: state.favourites,
    loading: state.loading,
    error: state.error
  };
}

function mapDispatchToProps(dispath) {
  return {
    onFavourite: (product) => dispath({ type: 'ON_FAVOURITE', product }),
    onCart: (product) => dispath({ type: 'ON_CART', product })
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
