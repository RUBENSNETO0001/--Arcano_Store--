import React, { useState, useEffect } from 'react';
import '../css/Main/Main_CompraProduto.css';
import { featuredProductsData } from './Produtos';

const ProductDetailPage = ({ productId = 1 }) => { 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(''); // Para a imagem principal

  useEffect(() => {
    setLoading(true);

    const foundProduct = featuredProductsData.find(p => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image); 
    } else {
      setProduct(null); 
    }
    setLoading(false);
  }, [productId]); // Executa a busca sempre que o ID mudar

  const handleQuantityChange = (e) => {
    // Garante que a quantidade seja pelo menos 1
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      alert(`Adicionado ${quantity}x ${product.name} ao carrinho!`);
      // Lógica real: adicionar ao contexto do carrinho/Redux/etc.
    }
  };

  // --- Renderização de Status ---
  if (loading) {
    return <div className="loading-state">Carregando Detalhes do Produto...</div>;
  }

  if (!product) {
    return <div className="error-state">Produto Não Encontrado. 😥</div>;
  }

  // --- Renderização do Conteúdo ---
  return (
    <div className="product-detail-page container">
      <div className="product-detail-layout">

        {/* Coluna 1: Imagens */}
        <div className="product-images">

          {/* Imagem Principal */}
          <div className="main-image-container">
            <img
              src={mainImage}
              alt={product.name}
              className="main-product-image"
            />
          </div>

          {/* Galeria de Thumbnails (opcional - usa o array de images, se existir) */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="thumbnail-gallery">
              {product.gallery.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  className={`thumbnail ${imgUrl === mainImage ? 'active' : ''}`}
                  onClick={() => setMainImage(imgUrl)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Coluna 2: Informações e Compra */}
        <div className="product-info-panel">

          <span className="product-category-detail">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>

          {/* Preço e Desconto (se houver) */}
          <div className="product-price-detail">
            <span className="current-price">{product.price}</span>
            {product.discount && (
              <span className="discount-badge">{product.discount} OFF</span>
            )}
          </div>

          {/* Descrição */}
          <div className="product-description-full">
            <h2>Descrição do Item</h2>
            <p>{product.description || "Este item é uma relíquia mágica e seu poder transcende a necessidade de uma descrição detalhada."}</p>
            {/* Adicione mais detalhes técnicos ou especificações aqui */}
          </div>

          <hr />

          {/* Ações de Compra */}
          <div className="product-purchase-actions">

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <button
              className="btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
            >
              <i className="fas fa-cart-plus"></i> Adicionar ao Carrinho
            </button>

            <button className="btn-secondary wishlist-btn">
              <i className="far fa-heart"></i> Adicionar à Lista de Desejos
            </button>

          </div>

          {/* Badges Adicionais (Entrega Rápida, etc.) */}
          <div className="shipping-info">
            <i className="fas fa-shipping-fast"></i> Entrega Rápida em todo o Reino!
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;