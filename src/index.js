import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux'
import { App } from './components';
import { store } from './store';
import { ThemeProvider } from './contexts/theme.context';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <ThemeProvider>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </BrowserRouter>
), document.getElementById('root'));
