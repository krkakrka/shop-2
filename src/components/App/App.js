import React from 'react';
import Loader from 'react-loader-spinner';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import {
  Switch,
  Link,
  Route,
  withRouter
} from 'react-router-dom';
import { ProductsCollection } from '../';
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
    window.fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((products) => this.setState({ products }))
      .catch((err) => this.setState({ error: err.message }))
      .finally(() => this.setState({ loading: false }))
    ;
  }

  addToCart(product) {
    const { cart } = this.state;
    const cartIndex = cart.findIndex((cartProduct) => cartProduct.product.id === product.id);
    const existsInCart = cartIndex !== -1;

    if (existsInCart) {
      const currentCount = cart[cartIndex].count;
      this.setState({
        cart: [
          ...cart.slice(0, cartIndex),
          { product, count: currentCount + 1 },
          ...cart.slice(cartIndex + 1),
        ]
      })
    } else {
      this.setState({
        cart: cart.concat({ product, count: 1 })
      });
    }
  }

  toggleFavourite(product) {
    const { favourites } = this.state;
    const favouritesIndex = favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id);
    const existsInFavourties = favouritesIndex !== -1;

    if (existsInFavourties) {
      this.setState({
        favourites: [
          ...favourites.slice(0, favouritesIndex),
          ...favourites.slice(favouritesIndex + 1),
        ]
      })
    } else {
      this.setState({
        favourites: favourites.concat(product)
      });
    }
  }
  render() {
    const { location } = this.props;
    const {
      products,
      favourites,
      cart,
      loading,
      error,
    } = this.state;

    const pathToTab = {
      '/': 0,
      '/favourites': 1,
      '/cart': 2
    };
    const currentTab = pathToTab[location.pathname] === undefined
      ? false
      : pathToTab[location.pathname];

    if (loading) {
      return <Loader type="ThreeDots" color="red" height={80} width={80} />;
    }
    if(error) {
      return <p>{error}</p>
    }
    return (
      <div className="App-container">
        <AppBar position="static">
          <Tabs value={currentTab} centered>
            <Tab label="Products" component={Link} to="/" />
            <Tab label="Favourites" component={Link} to="/favourites" />
            <Tab label="Cart" component={Link} to="/cart" />
          </Tabs>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <ProductsCollection
              products={products}
              onCart={(product) => this.addToCart(product)}
              onFavourites={(product) => this.toggleFavourite(product)}
              isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
            />
          </Route>

          <Route path="/favourites">
            <ProductsCollection products={favourites}
              onCart={(product) => this.addToCart(product)}
              onFavourites={(product) => this.toggleFavourite(product)}
              isFavourite={(product) => favourites.findIndex((favouriteProduct) => favouriteProduct.id === product.id) !== -1}
            />
          </Route>

          <Route path="/cart">
            <ProductsCollection products={cart.map(entry => entry.product)}
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

export default withRouter(App);
