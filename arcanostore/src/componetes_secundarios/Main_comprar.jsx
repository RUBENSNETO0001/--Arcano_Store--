import React, { useState, useEffect } from 'react';
import { fetchProdutoPorId } from '../services/api_produtos'; 
import '../css/Main/Main_CompraProduto.css';
import { adicionarAoCarrinho } from '../services/system-carrinho';

const ProductDetailPage = ({ productId = 1 }) => { 
  // O componente pode receber o 'productId' via props ou via URL (se você usar React Router)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
        if (!productId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const data = await fetchProdutoPorId(productId); 
            
            if (data && data.id) { 
                const productFromAPI = {
                    id: data.id,
                    name: data.nome,
                    price: `R$ ${parseFloat(data.preco).toFixed(2).replace('.', ',')}`, 
                    category: data.category,
                    discount: parseFloat(data.desconto) > 0 ? `${parseFloat(data.desconto).toFixed(0)}% OFF` : null,
                    image: data.image, 
                    description: data.description,};

                setProduct(productFromAPI);
                setMainImage(productFromAPI.image);
            } else {
                setProduct(null);
            }
        } catch (error) {
            console.error("Falha catastrófica ao carregar produto:", error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    loadProduct();
    
  }, [productId]); 

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      adicionarAoCarrinho({
        id: product.id,
        name: product.name,
        price: product.price, 
        quantidade: quantity 
      }); 
      
      alert(`Adicionado ${quantity}x ${product.name} ao carrinho!`);
    }
  };

  if (loading) {
    return <div className="loading-state">Carregando Detalhes do Produto...</div>;
  }

  if (!product) {
    return <div className="error-state">Produto Não Encontrado. 😥 Verifique se a **API** e o **ID do Produto** estão corretos!</div>;
  }

  return (
    <div className="product-detail-page container">
      <div className="product-detail-layout">

        {/* Coluna 1: Imagens */}
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={mainImage}
              alt={product.name}
              className="main-product-image"
            />
          </div>
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
        <div className="product-info-panel">

          <span className="product-category-detail">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-detail">
            <span className="current-price">**{product.price}**</span>
            {product.discount && (
              <span className="discount-badge">{product.discount}</span>
            )}
          </div>

          {/* Descrição */}
          <div className="product-description-full">
            <h2>Descrição do Item</h2>
            <p>{product.description || "Este item é uma relíquia mágica e seu poder transcende a necessidade de uma descrição detalhada."}</p>
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

          <div className="shipping-info">
            <i className="fas fa-shipping-fast"></i> Entrega Rápida em todo o Reino!
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;