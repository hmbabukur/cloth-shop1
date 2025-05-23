import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClothList from './ClothList';
import Cart from './Cart';
import Checkout from './Checkout';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
            <div className="logo">
              <h1>Products Store</h1>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/checkout">Checkout</Link>
            </div>
        </nav>

        <Routes>
          <Route path="/" element={<ClothList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
