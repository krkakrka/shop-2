import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { App } from './components';
import { Provider as StoreProvider } from 'react-redux'
import { store } from './store';

ReactDOM.render((
  <BrowserRouter>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>
), document.getElementById('root'));
