import React, { useEffect, useState } from 'react';

function ClothList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', thumbnail: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', price: '' });

  //  READ/VIEW: Fetch products
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products.slice(0, 12)); // limit to 12
        setLoading(false);
      });
  }, []);

  // CREATE: Add new product
  function handleCreate(e) {
    e.preventDefault();
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(created => {
        setProducts(prev => [created, ...prev]);
        setNewProduct({ title: '', price: '' });
        alert('Product created!');
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  }

  // DELETE: Remove a product
  function handleDelete(id) {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert('Product deleted!');
      });
  }

  // UPDATE: Start editing
  function handleEdit(product) {
    setEditingProduct(product);
    setEditForm({ title: product.title, price: product.price });
  }

  function handleUpdate(e) {
    e.preventDefault();
    fetch(`https://dummyjson.com/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(res => res.json())
      .then(updated => {
        setProducts(prev =>
          prev.map(p => (p.id === updated.id ? updated : p))
        );
        setEditingProduct(null);
        alert('Product updated!');
      });
  }

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='form-container'>
      {/* Create Form */}
      <h2>Create New Product</h2>
      <form onSubmit={handleCreate}>
        <input
          name="title"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={e => handleChange(e, setNewProduct)}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={e => handleChange(e, setNewProduct)}
        />
        <input
          name="thumbnail"
          placeholder="Image URL"
          value={newProduct.thumbnail}
          onChange={e => handleChange(e, setNewProduct)}
        />
        <button type="submit" id='addproductbtn'>Add Product</button>
      </form>

      {/* Product List */}
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="card" key={product.id}>
            <img
              src={product.thumbnail || 'https://via.placeholder.com/150'}
              alt={product.title}
              style={{ width: '100%', height: 150, objectFit: 'cover' }}
            />
            <h3>{product.title}</h3>
            <p>N{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button><br />
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Update Form */}
      {editingProduct && (
        <div>
          <h3>Editing: {editingProduct.title}</h3>
          <form onSubmit={handleUpdate}>
            <input
              name="title"
              value={editForm.title}
              onChange={e => handleChange(e, setEditForm)}
            />
            <input
              name="price"
              type="number"
              value={editForm.price}
              onChange={e => handleChange(e, setEditForm)}
            />
            <button type="submit" id='addproductbtn'>Update</button>
            <button type="button" id='addproductbtn' onClick={() => setEditingProduct(null)}>
              Cancel  
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ClothList;
