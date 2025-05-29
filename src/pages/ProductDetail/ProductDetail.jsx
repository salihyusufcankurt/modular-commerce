import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailWrapper from '../../components/product-detail/ProductDetailWrapper';
import { getProductById } from '../../services/product/productService';
import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Geçersiz ürün ID\'si');
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(id);
        if (!data) {
          setError('Ürün bulunamadı');
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Ürün detayı getirme hatası:', err);
        setError('Ürün detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container py-4">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
            <div className="mt-2">Ürün detayları yükleniyor...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container py-4">
          <div className="text-center">
            <div className="text-danger mb-3">{error || 'Ürün bulunamadı.'}</div>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container py-4">
        <ProductDetailWrapper product={product} />
      </div>
    </div>
  );
};

export default ProductDetail; 