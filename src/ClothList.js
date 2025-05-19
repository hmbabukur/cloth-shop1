import React from 'react';
import Gown from './assets/Resources/gown.jpg';
import Knitted from './assets/Resources/knitted.jpg';
import Pajamas from './assets/Resources/pajamas.jpg';

function ClothList({ addToCart }) {
  const products = [
    { id: 1, name: 'Elegant Gown', price: 5000, Resources: Gown },
    { id: 2, name: 'Knitted Sweater', price: 4000, Resources: Knitted },
    { id: 3, name: 'Pajamas', price: 3000, Resources: Pajamas }
    
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <div className="card" key={product.id}>
          <img src={product.Resources} alt={product.name} />
          <h3>{product.name}</h3>
          <p>N{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ClothList;
