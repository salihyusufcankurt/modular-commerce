import React from 'react';
import CardWrapper from '../components/card/CardWrapper';
import '../style/pages/ProductList.css';

const ProductList = () => {
  // Örnek ürün verileri
  const products = [
    {
      id: 1,
      title: "Dekoratif Cam Mumluk",
      image: "https://picsum.photos/id/1/400/400",
      salePrice: "119.90",
      oldPrice: "269.49"
    },
    {
      id: 2,
      title: "Kristal Cam Mumluk",
      image: "https://picsum.photos/id/2/400/400",
      salePrice: "149.90",
      oldPrice: "299.49"
    },
    {
      id: 3,
      title: "Vintage Mumluk Seti",
      image: "https://picsum.photos/id/3/400/400",
      salePrice: "199.90",
      oldPrice: "399.49"
    },
    {
      id: 4,
      title: "Modern Cam Mumluk",
      image: "https://picsum.photos/id/4/400/400",
      salePrice: "89.90",
      oldPrice: "179.49"
    },
    {
      id: 5,
      title: "Altın Rengi Mumluk",
      image: "https://picsum.photos/id/5/400/400",
      salePrice: "169.90",
      oldPrice: "339.49"
    },
    {
      id: 6,
      title: "Dekoratif LED Mum",
      image: "https://picsum.photos/id/6/400/400",
      salePrice: "79.90",
      oldPrice: "159.49"
    },
    {
      id: 7,
      title: "Gümüş Mumluk Set",
      image: "https://picsum.photos/id/7/400/400",
      salePrice: "229.90",
      oldPrice: "459.49"
    },
    {
      id: 8,
      title: "Antik Mumluk",
      image: "https://picsum.photos/id/8/400/400",
      salePrice: "139.90",
      oldPrice: "279.49"
    },
    {
      id: 9,
      title: "Mermer Desenli Mumluk",
      image: "https://picsum.photos/id/9/400/400",
      salePrice: "189.90",
      oldPrice: "379.49"
    },
    {
      id: 10,
      title: "Seramik Mumluk",
      image: "https://picsum.photos/id/10/400/400",
      salePrice: "159.90",
      oldPrice: "319.49"
    },
    {
      id: 11,
      title: "Geometrik Mumluk",
      image: "https://picsum.photos/id/11/400/400",
      salePrice: "129.90",
      oldPrice: "259.49"
    },
    {
      id: 12,
      title: "Ahşap Detaylı Mumluk",
      image: "https://picsum.photos/id/12/400/400",
      salePrice: "179.90",
      oldPrice: "359.49"
    },
    {
      id: 13,
      title: "Kristal Mumluk Set",
      image: "https://picsum.photos/id/13/400/400",
      salePrice: "249.90",
      oldPrice: "499.49"
    },
    {
      id: 14,
      title: "Modern Tasarım Mumluk",
      image: "https://picsum.photos/id/14/400/400",
      salePrice: "144.90",
      oldPrice: "289.49"
    },
    {
      id: 15,
      title: "Vintage Cam Mumluk",
      image: "https://picsum.photos/id/15/400/400",
      salePrice: "134.90",
      oldPrice: "269.49"
    },
    {
      id: 16,
      title: "El Yapımı Mumluk",
      image: "https://picsum.photos/id/16/400/400",
      salePrice: "199.90",
      oldPrice: "399.49"
    }
  ];

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="row g-custom">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <CardWrapper
                title={product.title}
                image={product.image}
                salePrice={product.salePrice}
                oldPrice={product.oldPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
