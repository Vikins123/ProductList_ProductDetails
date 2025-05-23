import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-image_1">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <h2>{product.title}</h2>
              <p className="price">${product.price}</p>
              <p className="category">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 