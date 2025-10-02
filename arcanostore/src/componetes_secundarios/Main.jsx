// Main.jsx
import React from 'react';
import '../css/Main/Main.css';

// -----------------------------------------------------------
// ⚡️ ALTERAÇÃO CHAVE AQUI ⚡️
// Assumindo que você exportou os arrays como 'featuredProductsData' e 'categoriesData'
// do seu arquivo de dados (e que o arquivo de dados foi renomeado para 'data.js' ou similar,
// mas vou manter './Produtos' para seguir sua estrutura, alterando o que é importado).
// -----------------------------------------------------------

// Se você exportou as variáveis brutas:
import { featuredProductsData, categoriesData } from './Produtos';

// Renomeando para facilitar a leitura no JSX:
const featuredProducts = featuredProductsData;
const categories = categoriesData;

// Se você tivesse usado a exportação default da função `produtos`, o código seria assim:
/*
// import produtosModule from './Produtos';
// const { featuredProducts, categories } = produtosModule();
*/

const Main = () => {

  // Encontrando o produto mais vendido para a Hero Section
  const bestSellerProduct = featuredProducts.find(p => p.bestseller) || featuredProducts[0];

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
              <button className="btn-primary">
                Explorar Produtos
                <i className="fas fa-wand-sparkles"></i>
              </button>
              <button className="btn-secondary">
                <i className="fas fa-play"></i>
                Ver Demonstração
              </button>
            </div>
            <div className="hero-stats">
              {/* O seu componente estava usando '20+' para Produtos Geek, vou usar o count real */}
              <div className="stat">
                <span className="stat-number">1k+</span>
                <span className="stat-label">Clientes Satisfeitos</span>
              </div>
              <div className="stat">
                {/* Calcula o total de itens contando todos nas categorias */}
                <span className="stat-number">{categories.reduce((sum, cat) => sum + cat.count, 0)}+</span>
                <span className="stat-label">Itens Mágicos em Estoque</span>
              </div>
              <div className="stat">
                <span className="stat-number">99%</span>
                <span className="stat-label">Avaliações Positivas</span>
              </div>
            </div>
          </div>
          {/* produto mais vendido - Agora populado dinamicamente! */}
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
        </div>
      </section>

      ---

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

      ---

      {/* Produtos em Destaque */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque 🌟</h2>
            <p>Os itens mais procurados pelos arcanistas</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
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
                    <button className="add-to-cart">
                      <i className="fas fa-shopping-cart"></i>
                      Adicionar
                    </button>
                    <button className="wishlist">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-actions">
            <button className="btn-outline">
              Ver Todos os Produtos
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      ---

      {/* Banner Promocional */}
      <section className="promo-banner">
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <h2>Oferta Especial do Mês 🏷️</h2>
              <p>Desconto de 30% em todos os artefatos lendários</p>
              <div className="countdown">
                <div className="countdown-item">
                  <span>02</span>
                  <small>Dias</small>
                </div>
                <div className="countdown-item">
                  <span>12</span>
                  <small>Horas</small>
                </div>
                <div className="countdown-item">
                  <span>45</span>
                  <small>Minutos</small>
                </div>
              </div>
            </div>
            <button className="btn-primary">
              Aproveitar Oferta
              <i className="fas fa-bolt"></i>
            </button>
          </div>
        </div>
      </section>

      ---

      {/* Benefícios */}
      <section className="benefits-section">
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