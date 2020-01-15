import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import Dialog from '@material-ui/core/Dialog';
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
  Login,
  ProductsCartSummary,
} from '../';
import {
  getProductById
} from './App.utils';
import {
  onFavourite,
  onCart,
  togglePromo,
  maybeAuthorize
} from '../../store/actionCreators';
import './App.css';

function App(props) {
  const {
    products,
    secretProducts,
    favourites,
    isAuthorized,
    onFavourite,
    onCart,
    loading,
    error,
    loginError,
    onCredentialsSubmit,
    promoVisible,
    onDialogClose
  } = props;

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
      <Dialog open={promoVisible} onClose={onDialogClose}>
        DIALOG
      </Dialog>

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
          <ProductsCartSummary />
        </Route>
        
        <Route path="/login">
          <Login onSubmit={onCredentialsSubmit} error={loginError} />
        </Route>

        <Route path="*">404</Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    secretProducts: state.secretProducts,
    isAuthorized: state.isAuthorized,
    favourites: state.favourites,
    loading: state.loading,
    error: state.error,
    loginError: state.loginError,
    promoVisible: state.promoVisible
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onFavourite: (product) => dispatch(onFavourite(product)),
    onCart: (product) => dispatch(onCart(product)),
    onDialogClose: () => dispatch(togglePromo()),
    onCredentialsSubmit: (username, password) => {
      const { location } = ownProps;
      const query = queryString.parse(location.search);
      const redirectUrl = query.redirectedFrom || '/';
      dispatch(maybeAuthorize(username, password, redirectUrl))
    }
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
