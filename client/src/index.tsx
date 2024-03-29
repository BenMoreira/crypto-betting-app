import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <Router>
        <Auth0Provider
          domain="dev-taqde1wo0e85onle.us.auth0.com"
          clientId="UfCO40es2GYzsdqBjbeF3uHNibL1hELG"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
          useRefreshTokens
          cacheLocation="localstorage"
        >
          <App />
        </Auth0Provider>
      </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
