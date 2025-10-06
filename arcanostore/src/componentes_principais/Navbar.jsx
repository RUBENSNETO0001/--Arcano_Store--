import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import AuthPage from '../componente_sistema/login_registro'; // Garanta que este caminho está correto
import Contato from './links/contato';

const Navbar = ({ apenasLogin = false }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // EFEITO: Controla o scroll do body para o modal
    useEffect(() => {
        if (isAuthOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isAuthOpen]);

    // EFEITO: Controla a rolagem da Navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // FUNÇÕES DE MANUSEIO
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLoginClick = () => {
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false); // Boa prática: fechar o menu mobile ao abrir o modal
    };

    return (
        <>
            {/* Navbar Principal */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">

                    {/* Logo */}
                    <div className="navbar-logo">
                        <a href="." onClick={handleLinkClick}>
                            <img src="assents/logo/logo.svg" alt="logo" className='logo' />
                            <span>Arcano Store</span>
                        </a>
                    </div>

                    {/* Menu Desktop */}
                    {!apenasLogin && (
                        <ul className="navbar-menu">
                            <li className="navbar-item"><a href="#home" className="navbar-link">Início</a></li>
                            <li className="navbar-item"><a href="#about" className="navbar-link">Sobre</a></li>
                            <li className="navbar-item"><a href="#services" className="navbar-link">Serviços</a></li>
                            <li className="navbar-item"><a href="#portfolio" className="navbar-link">Portfólio</a></li>
                            <li className="navbar-item"><Contato /></li>
                        </ul>
                    )}

                    {/* Botão de Login Desktop */}
                    <div className="navbar-cta"> {/* Envolva o botão CTA em uma div para manter o alinhamento CSS */}
                        <button className="cta-button" onClick={handleLoginClick}> Login </button>
                    </div>

                    {/* Menu mobile toggle */}
                    {!apenasLogin && (
                        <div
                            className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    )}
                </div>

                {/* Menu mobile (Renderizado dentro da nav, mas fora do container) */}
                {!apenasLogin && (
                    <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                        <ul className="mobile-menu-list">
                            {/* ... Seus itens de menu mobile aqui ... */}
                            <li className="mobile-item"><a href="#home" className="mobile-link" onClick={handleLinkClick}><i className="fas fa-home"></i>Início</a></li>
                            <li className="mobile-item"><a href="#about" className="mobile-link" onClick={handleLinkClick}><i className="fas fa-user"></i>Sobre</a></li>
                            <li className="mobile-item"><a href="#services" className="mobile-link" onClick={handleLinkClick}><i className="fas fa-cog"></i>Serviços</a></li>
                            <li className="mobile-item"><a href="#portfolio" className="mobile-link" onClick={handleLinkClick}><i className="fas fa-briefcase"></i>Portfólio</a></li>
                            <li className="mobile-item"><a href="#contact" className="mobile-link" onClick={handleLinkClick}><i className="fas fa-envelope"></i>Contato</a></li>
                        </ul>
                        {/* Botão de Login no CTA Mobile */}
                        <div className="mobile-cta">
                            <button className="mobile-cta-button" onClick={handleLoginClick}>
                                <i className="fas fa-sign-in-alt"></i> Entrar
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* 2. O MODAL DE AUTENTICAÇÃO */}
            {isAuthOpen && (
                <div className="modal-overlay active"> {/* Adicione 'active' aqui para o CSS funcionar */}
                    <AuthPage />
                </div>
            )}
        </>
    );
};

export default Navbar;