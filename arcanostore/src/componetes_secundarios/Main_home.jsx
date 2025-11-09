import React, { useState, useEffect } from 'react';
import getProdutosData, { categoriesData } from './Produtos'; 
import '../css/Main/Main.css';

const Main = ({ onViewProduct }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = categoriesData; 
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getProdutosData();
        
        // Mapeamento Opcional: Transforma os dados da API para o formato esperado pelo seu JSX
        const mappedProducts = data.featuredProducts.map(p => ({
            id: p.id,
            name: p.nome, // Mapeia 'nome' (PHP) para 'name' (JSX)
            price: `R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}`, // Formata preço
            image: p.image,
            category: p.category,
            // Adicione as chaves que seu JSX espera e que o PHP não retorna
            bestseller: p.e_novo === 1, // Exemplo de como definir um bestseller (usando 'e_novo' como placeholder)
            discount: p.desconto > 0 ? `${p.desconto}% OFF` : null,
            new: p.novo === 1 // Mapeia 'novo' (PHP) para 'new' (JSX)
        }));

        setFeaturedProducts(mappedProducts);

      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); 

  // (Usa o primeiro produto se nenhum for marcado como 'bestseller' no mapeamento)
  const bestSellerProduct = featuredProducts.find(p => p.bestseller) || featuredProducts[0];

  const scrollToProducts = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <div className="loading-state-main">Carregando o Universo Arcano... ✨</div>;
  }

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Seje <span className="magic-text">Bem-vindo</span> ao Arcano 🧙‍♂️
            </h1>
            <p className="hero-description">
              O ponto de encontro definitivo para todos que vivem e respiram a cultura geek!
            </p>
            <div className="hero-buttons">
              <a className="btn-primary" href='#produtos' onClick={scrollToProducts}  >
                Explorar Produtos
                <i className="fas fa-wand-sparkles"></i>
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">1k+</span>
                <span className="stat-label">Clientes Satisfeitos</span>
              </div>
              <div className="stat">
                <span className="stat-number">{categories.reduce((sum, cat) => sum + cat.count, 0)}+</span>
                <span className="stat-label">Itens Mágicos em Estoque</span>
              </div>
              <div className="stat">
                <span className="stat-number">99%</span>
                <span className="stat-label">Avaliações Positivas</span>
              </div>
            </div>
          </div>
          {/* produto mais vendido - Verifica se o produto existe antes de renderizar */}
          {bestSellerProduct && (
              <div className="hero-image">
                <div className="floating-card">
                  <img src={bestSellerProduct.image} alt={bestSellerProduct.name} />
                  <div className="card-badge">Mais Vendido</div>
                  <div className="card-info">
                    <h4>{bestSellerProduct.name}</h4>
                    <p>{bestSellerProduct.price}</p>
                  </div>
                </div>
              </div>
          )}
        </div>
      </section>

      {/* Categorias */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Categorias de Produtos ✨</h2>
            <p>Explore nossas coleções especiais</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <span className="category-count">{category.count} itens</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="produtos">
        {/* Produtos em Destaque */}
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2>Produtos em Destaque 🌟</h2>
              <p>Os itens mais procurados pelos arcanistas</p>
            </div>
            <div className="products-grid">
              {/* Renderiza apenas se houver produtos */}
              {featuredProducts.length > 0 ? (
                  featuredProducts.slice(0, 3).map(product => (

                    <div key={product.id} className="product-card">

                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        <div className="product-badges">
                          {product.discount && (
                            <span className="badge discount">{product.discount}</span>
                          )}
                          {product.bestseller && (
                            <span className="badge bestseller">Mais Vendido</span>
                          )}
                          {product.new && (
                            <span className="badge new">Novo</span>
                          )}
                        </div>
                        <button className="quick-view">
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>

                      <div className="product-info">
                        <span className="product-category">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price">{product.price}</div>
                        <div className="product-actions">
                          <button
                            className="add-to-cart"
                            onClick={() => onViewProduct(product.id)}
                          >
                            <i className="fas fa-shopping-cart"></i>
                            Ver Produto
                          </button>
                          <button className="wishlist">
                            <i className="far fa-heart"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                // Mensagem quando não há produtos
                <div className="no-products-message">Nenhum artefato mágico encontrado.</div>
              )}
            </div>

            <div className="section-actions">
              <button className="btn-outline">
                Ver Todos os Produtos
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>
      </section>

      {/* Banner Promocional (Restante do seu JSX sem alteração) */}
      <section className="promo-banner">
         <div className="container">
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Compra Segura</h3>
              <p>Pagamento 100% seguro com criptografia arcana</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Entrega Rápida</h3>
              <p>Receba seus itens mágicos em até 24h</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3>Qualidade Garantida</h3>
              <p>Todos os produtos testados e aprovados</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Suporte Mágico</h3>
              <p>Atendimento especializado 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;