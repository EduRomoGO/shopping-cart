import React from 'react';
import './App.css';
import ShoppingCart from './components/ShoppingCart/ShoppingCart.js';
import {
  BrowserRouter as Router,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <ShoppingCart />
      </Router>
    </div>
  );
}

export default App;
