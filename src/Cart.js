import React from 'react';

function Cart({ cartItems, removeFromCart }) {
  return (
    <div className="cart">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail} alt={item.name} />
            <div>
              <h4>{item.title}</h4>
              <p>N{item.price} × {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
