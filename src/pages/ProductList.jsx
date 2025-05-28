import React, { useState, useEffect } from 'react';
import CardWrapper from '../components/card/CardWrapper';
import { getProducts } from '../services/product/productService';
import '../style/pages/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-list-page">
        <div className="container py-4">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-page">
        <div className="container py-4">
          <div className="text-center text-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <div className="container py-4">
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <CardWrapper
                id={product.id}
                title={product.title}
                image={product.images[0]}
                salePrice={product.price.base || product.price.current}
                oldPrice={product.price.old}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
