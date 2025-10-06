// Footer.jsx
import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Seção Principal */}
        <div className="footer-main">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="assents/logo/logo.svg" alt="Logo" className="logo" />
              <span>Arcano Store</span>
            </div>
            <p className="footer-description">
              Sua loja de confiança para produtos mágicos e exclusivos. 
              Oferecemos qualidade e excelência em cada compra.
            </p>
            <div className="social-links">
              <a href="#!" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#!" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Links Rápidos</h3>
            <ul className="footer-links">
              <li><a href="/">Início</a></li>
              <li><a href="/sobre">Sobre Nós</a></li>
              <li><a href="/produtos">Produtos</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Categorias</h3>
            <ul className="footer-links">
              <li><a href="/categoria/livros">Canecas</a></li>
              <li><a href="/categoria/artefatos">Manga</a></li>
              <li><a href="/categoria/poções">Cartinha</a></li>
              <li><a href="/categoria/vestimentas">Acessorio</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contato</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Rua das XXXX, 123 - Centro</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+55 (68) 9214-3842</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>contato@arcanostore.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Seg - Sex: 9h às 18h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="footer-divider"></div>

        {/* Rodapé Inferior */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 ArcanoStore. Todos os direitos reservados.</p>
          </div>
          <div className="footer-legal">
            <a href="/privacidade">Política de Privacidade</a>
            <a href="/termos">Termos de Uso</a>
            <a href="/trocas">Trocas e Devoluções</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;