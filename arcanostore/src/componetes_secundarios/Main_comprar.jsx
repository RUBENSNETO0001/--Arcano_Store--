import React, { useState, useEffect } from 'react';
import '../css/Main/Main_CompraProduto.css';

// 1. Importação Essencial:
// Certifique-se de que esta função está exportada em 'api_produtos.js'
import { fetchProdutoPorId } from '../services/api_produtos'; 


const ProductDetailPage = ({ productId = 1 }) => { 
  // O componente pode receber o 'productId' via props ou via URL (se você usar React Router)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    // Função assíncrona para buscar o produto
    const loadProduct = async () => {
        // Verifica se há um ID para buscar
        if (!productId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // Chama a API com o ID
            const data = await fetchProdutoPorId(productId); 
            
            // Verifica se a API retornou dados válidos (o PHP deve retornar o objeto)
            // Se o fetchProdutoPorId retornar null ou um objeto de erro, isso será tratado aqui.
            if (data && data.id) { 
                
                // Mapeamento dos dados da API (SQL) para o formato do seu componente
                // As chaves no 'data' (API) são baseadas nos AS da sua query PHP
                const productFromAPI = {
                    id: data.id,
                    name: data.nome,
                    // Formatação de Preço: Garante 2 casas decimais e usa vírgula
                    price: `R$ ${parseFloat(data.preco).toFixed(2).replace('.', ',')}`, 
                    category: data.category, // 'category' veio do JOIN na query
                    
                    // O desconto vem como porcentagem (ex: 10.00)
                    discount: parseFloat(data.desconto) > 0 ? `${parseFloat(data.desconto).toFixed(0)}% OFF` : null, 
                    
                    // A URL da imagem principal
                    image: data.image, 
                    description: data.description,
                    // Note: gallery não está vindo do seu PHP atual, mas o código abaixo já suporta se você adicionar depois.
                };

                setProduct(productFromAPI);
                setMainImage(productFromAPI.image);
            } else {
                setProduct(null); // Produto não encontrado ou ID inválido
            }
        } catch (error) {
            console.error("Falha catastrófica ao carregar produto:", error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    loadProduct();
    
  }, [productId]); // Executa a busca sempre que o ID mudar

  const handleQuantityChange = (e) => {
    // Garante que a quantidade seja no mínimo 1
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      alert(`Adicionado ${quantity}x ${product.name} ao carrinho!`);
      // Lógica real de adicionar ao carrinho (Redux/Context API/localStorage) viria aqui
    }
  };

  // --- Renderização de Status ---
  if (loading) {
    return <div className="loading-state">Carregando Detalhes do Produto...</div>;
  }

  if (!product) {
    return <div className="error-state">Produto Não Encontrado. 😥 Verifique se a **API** e o **ID do Produto** estão corretos!</div>;
  }

  // --- Renderização do Conteúdo ---
  return (
    <div className="product-detail-page container">
      <div className="product-detail-layout">

        {/* Coluna 1: Imagens */}
        <div className="product-images">
          <div className="main-image-container">
            {/* 

[Image of ${product.name}]
 (Aqui você pode usar um tag de imagem se quisesse um diagrama) */}
            <img
              src={mainImage}
              alt={product.name}
              className="main-product-image"
            />
          </div>
          {/* Se houver galeria (imagens adicionais), renderiza as miniaturas */}
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