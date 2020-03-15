import React from 'react';
import { render } from 'react-dom';
import './style/index.css';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from './Store';

render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>,
  document.getElementById('root')
);
