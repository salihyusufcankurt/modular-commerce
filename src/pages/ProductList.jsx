import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CardWrapper from '../components/card/CardWrapper';
import { getProducts } from '../services/product/productService';
import '../style/pages/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        let filteredProducts = categoryId
          ? data.filter(product => product.categories.includes(categoryId))
          : data;
        
        // Sort products by sellCount in descending order
        filteredProducts = filteredProducts.sort((a, b) => b.sellCount - a.sellCount);
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="product-list-page">
        <div className="container">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-page">
        <div className="container">
          <div className="text-center text-danger">{error}</div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list-page">
        <div className="container">
          <div className="text-center">Bu kategoride ürün bulunamadı.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <CardWrapper
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.images[0]}
              salePrice={product.price.base || product.price.current}
              oldPrice={product.price.old}
              rating={product.rating}
              reviewCount={product.reviewCount}
              shipping={product.shipping}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
