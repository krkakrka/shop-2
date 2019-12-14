import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import {
  Link,
  useLocation
} from 'react-router-dom';

const PATH_TO_TAB = {
  '/products': 0,
  '/favourites': 1,
  '/cart': 2
};

function NavigationBar() {
  const location = useLocation();
  const currentTab = PATH_TO_TAB[location.pathname] === undefined
    ? false
    : PATH_TO_TAB[location.pathname];

  return (
    <AppBar position="static">
      <Tabs value={currentTab} centered>
        <Tab label="Products" component={Link} to="/products" />
        <Tab label="Favourites" component={Link} to="/favourites" />
        <Tab label="Cart" component={Link} to="/cart" />
      </Tabs>
    </AppBar>
  );
}

export default NavigationBar;
