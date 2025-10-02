// Navbar.jsx - APENAS O CÓDIGO REACT
import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="." onClick={handleLinkClick}>
            <img src="assents/logo/logo.svg" alt="logo" className='logo'/>
            <span>Arcano Store</span>
          </a>
        </div>

        {/* Menu para desktop */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#home" className="navbar-link">Início</a>
          </li>
          <li className="navbar-item">
            <a href="#about" className="navbar-link">Sobre</a>
          </li>
          <li className="navbar-item">
            <a href="#services" className="navbar-link">Serviços</a>
          </li>
          <li className="navbar-item">
            <a href="#portfolio" className="navbar-link">Portfólio</a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link">Contato</a>
          </li>
        </ul>

        {/* Botão de ação */}
        <div className="navbar-cta">
          <button className="cta-button">Começar</button>
        </div>

        {/* Menu mobile toggle */}
        <div 
          className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-menu-list">
          <li className="mobile-item">
            <a href="#home" className="mobile-link" onClick={handleLinkClick}>
              <i className="fas fa-home"></i>
              Início
            </a>
          </li>
          <li className="mobile-item">
            <a href="#about" className="mobile-link" onClick={handleLinkClick}>
              <i className="fas fa-user"></i>
              Sobre
            </a>
          </li>
          <li className="mobile-item">
            <a href="#services" className="mobile-link" onClick={handleLinkClick}>
              <i className="fas fa-cog"></i>
              Serviços
            </a>
          </li>
          <li className="mobile-item">
            <a href="#portfolio" className="mobile-link" onClick={handleLinkClick}>
              <i className="fas fa-briefcase"></i>
              Portfólio
            </a>
          </li>
          <li className="mobile-item">
            <a href="#contact" className="mobile-link" onClick={handleLinkClick}>
              <i className="fas fa-envelope"></i>
              Contato
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;