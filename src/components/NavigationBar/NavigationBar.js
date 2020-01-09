import React from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import {
  Link,
  useLocation
} from 'react-router-dom';

const PATH_TO_TAB = [
  '/products',
  '/secret-products',
  '/favourites',
  '/cart',
  '/login'
];

function NavigationBar({ productsCount, secretProductsCount, favouritesCount, cartCount }) {
  const location = useLocation();
  const tabIndex = PATH_TO_TAB.indexOf(location.pathname);
  const currentTab =  tabIndex === -1 ? false : tabIndex;
  
  return (
    <AppBar position="static">
      <Tabs value={currentTab} centered>
        <Tab label={`Products ${productsCount}`} component={Link} to="/products" />
        <Tab label={`Secret Products ${secretProductsCount}`} component={Link} to="/secret-products" />
        <Tab label={`Favourites ${favouritesCount}`} component={Link} to="/favourites" />
        <Tab label={`Cart ${cartCount}`} component={Link} to="/cart" />
        <Tab label="Login" component={Link} to="/login" />
      </Tabs>
    </AppBar>
  );
}

function mapStateToProps(state) {
  return {
    productsCount: state.products.length,
    secretProductsCount: state.secretProducts.length,
    favouritesCount: state.favourites.length,
    cartCount: state.cart.length
  };
}

export default connect(mapStateToProps)(NavigationBar);
