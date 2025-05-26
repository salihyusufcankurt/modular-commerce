import React from 'react';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Ürün A', price: '₺499', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Ürün B', price: '₺799', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Ürün C', price: '₺299', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Sepete Ekle</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
