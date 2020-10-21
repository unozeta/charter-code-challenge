import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


