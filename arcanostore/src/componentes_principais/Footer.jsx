// Footer.jsx
import React from 'react';
import '../css/Footer.css';
import Contato from './links/contato';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Seção Principal */}
        <div className="footer-main">
          <div className="footer-section1">
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
              <li><a href="/">Sobre Nós</a></li>
              <li><a href="/">Produtos</a></li>
              <li><Contato/></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Categorias</h3>
            <ul className="footer-links">
              <li><a href="/">Canecas</a></li>
              <li><a href="/">Manga</a></li>
              <li><a href="/">Cartinha</a></li>
              <li><a href="/">Acessorio</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contato</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Bairro Xavier Maia, 123</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+5568992118928</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>arcanostore01@gmail.com</span>
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
            <a href="https://drive.google.com/file/d/1d-pA2NH_wF7ztu7t3C_bj5GQjCJ8gfbU/view?usp=drive_link">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;