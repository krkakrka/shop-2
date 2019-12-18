import React from 'react';
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

function NavigationBar() {
  const location = useLocation();
  const tabIndex = PATH_TO_TAB.indexOf(location.pathname);
  const currentTab =  tabIndex === -1 ? false : tabIndex;
  
  return (
    <AppBar position="static">
      <Tabs value={currentTab} centered>
        <Tab label="Products" component={Link} to="/products" />
        <Tab label="Secret products" component={Link} to="/secret-products" />
        <Tab label="Favourites" component={Link} to="/favourites" />
        <Tab label="Cart" component={Link} to="/cart" />
        <Tab label="Login" component={Link} to="/login" />
      </Tabs>
    </AppBar>
  );
}

export default NavigationBar;
