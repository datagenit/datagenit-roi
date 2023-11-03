import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/corporate-ui-dashboard.css';
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/js/bootstrap";
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


