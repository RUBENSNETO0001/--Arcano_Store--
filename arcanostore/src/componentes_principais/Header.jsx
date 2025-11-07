import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import AuthPage from '../componetes_secundarios/Login_registro'; // Importa o modal de autenticação
import Contato from './links/contato';

const Header = ({ apenasLogin = false, onNavigate, isLoggedIn, onLogin, onLogout }) => {
    
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
    const handleLinkClick = (view) => {
        setIsMobileMenuOpen(false); // Fecha o menu mobile ao clicar em um link
        if (onNavigate) {
            onNavigate(view);
        }
    };

    const handleLoginClick = () => {
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false); // Fecha o menu mobile se estiver aberto
    };
    
    // Função chamada pelo AuthPage quando o login é bem-sucedido
    const handleLoginSuccess = () => {
        setIsAuthOpen(false); // 1. Fecha o modal
        if (onLogin) {
            // 2. Chama a função passada pelo App.js para atualizar o estado global
            onLogin(); 
        }
    };

    // --- Lógica de Renderização Condicional dos Botões ---
    const renderCTAs = (isMobile = false) => {
        const ctaClass = isMobile ? 'mobile-cta-button' : 'cta-button';
        const containerClass = isMobile ? 'mobile-cta' : 'navbar-cta';

        if (isLoggedIn) {
            // Se logado, mostra o botão do carrinho (navbar-cta2)
            return (
                <div className={containerClass}>
                    <button id="navbar-cta2" className={ctaClass}>
                        <i className="fas fa-shopping-cart"></i> Carrinho
                    </button>
                    {isMobile && onLogout && (
                        // Adiciona botão Sair no mobile
                        <button className={ctaClass} onClick={onLogout} style={{ marginTop: '10px' }}>
                            <i className="fas fa-sign-out-alt"></i> Sair
                        </button>
                    )}
                </div>
            );
        } else {
            // Se não logado, mostra o botão de login
            return (
                <div className={containerClass}>
                    <button id="navbar-cta" className={ctaClass} onClick={handleLoginClick}> 
                        Login 
                    </button>
                </div>
            );
        }
    };


    return (
        <>
            {/* Navbar Principal */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <button className='navbar-logo-button' onClick={() => handleLinkClick('home')}>
                            <img src="assents/logo/logo.svg" alt="logo" className='logo' />
                            <span>Arcano Store</span>
                        </button>
                    </div>

                    {/* Menu Desktop */}
                    {!apenasLogin && (
                        <ul className="navbar-menu">
                            <li className="navbar-item"><button className="navbar-link" onClick={() => handleLinkClick('home')}>Início</button></li>
                            <li className="navbar-item"><button className="navbar-link" onClick={() => handleLinkClick('sobre')}>Sobre Nós</button></li>
                            <li className="navbar-item"><Contato /></li>
                        </ul>
                    )}

                    {/* Botões de Ação Desktop */}
                    {renderCTAs()}

                    {/* Menu mobile toggle */}
                    {!apenasLogin && (
                        <div className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    )}
                </div>
            </nav>

            {/* ----------------------------------------------------------- */}
            {/* CORREÇÃO CRUCIAL: ESTRUTURA E LÓGICA DO MENU MOBILE (JSX) */}
            {/* ----------------------------------------------------------- */}

            {/* 1. O OVERLAY (fundo escuro opcional) */}
            {isMobileMenuOpen && (
                <div className="mobile-overlay active" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}
            
            {/* 2. O MENU LATERAL */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="mobile-menu-title">Menu</span>
                    <button 
                        className="mobile-close-btn" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                    >
                        &times;
                    </button>
                </div>
                <ul className="mobile-menu-list">
                    <li className="mobile-item">
                        <button className="mobile-link" onClick={() => handleLinkClick('home')}>
                            <i className="fas fa-home"></i> Início
                        </button>
                    </li>
                    <li className="mobile-item">
                        <button className="mobile-link" onClick={() => handleLinkClick('sobre')}>
                            <i className="fas fa-info-circle"></i> Sobre Nós
                        </button>
                    </li>
                    <li className="mobile-item">
                        {/* Como Contato é um componente, ele é renderizado diretamente */}
                        <Contato /> 
                    </li>
                </ul>
                
                {/* Botões de Ação Mobile (Login/Carrinho) */}
                {/* Se você quiser o CTA no footer do menu, remova a div anterior e use esta: */}
                {renderCTAs(true)}
                
            </div>
            
            {isAuthOpen && (
                <div className="modal-overlay active">
                    <AuthPage 
                        onClose={() => setIsAuthOpen(false)} 
                        onLoginSuccess={handleLoginSuccess}
                    /> 
                </div>
            )}
        </>
    );
};

export default Header;