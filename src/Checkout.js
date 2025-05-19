import React from 'react';

function Checkout({ cartItems, clearCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleCheckout() {
    alert('Thanks for your purchase!');
    clearCart();
  }

  return (
    <div className="checkout">
      <h2>🧾 Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} × {item.quantity} = N{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: N{total.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Complete Purchase</button>
        </>
      )}
    </div>
  );
}

export default Checkout;
