// src/componentes_principais/Navbar.js

import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import AuthPage from '../componetes_secundarios/login_registro';
import Contato from './links/contato';

// 👈 Agora aceita 'onNavigate' como prop
const Navbar = ({ apenasLogin = false, onNavigate }) => { 
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
    // Função unificada para links de navegação (Home, Sobre)
    const handleLinkClick = (view) => {
        setIsMobileMenuOpen(false);
        // Chama a função do App.js para mudar a visualização
        if (onNavigate) {
            onNavigate(view); 
        }
    };

    const handleLoginClick = () => {
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false);
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
                            <li className="navbar-item">
                               
                                <button className="navbar-link" onClick={() => handleLinkClick('home')}>
                                    Início
                                </button>
                            </li>
                            <li className="navbar-item">
                                <button className="navbar-link" onClick={() => handleLinkClick('sobre')}>
                                    Sobre Nós
                                </button>
                            </li>
                            <li className="navbar-item"><Contato /></li>
                        </ul>
                    )}

                    {/* Botão de Login Desktop */}
                    <div className="navbar-cta">
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
                            
                            {/* Início Mobile (TROCADO PARA BOTÃO) */}
                            <li className="mobile-item">
                                <button className="mobile-link" onClick={() => handleLinkClick('home')}>
                                    <i className="fas fa-home"></i>Início
                                </button>
                            </li>
                            {/* Sobre Mobile (TROCADO PARA BOTÃO) */}
                            <li className="mobile-item">
                                <button className="mobile-link" onClick={() => handleLinkClick('sobre')}>
                                    <i className="fas fa-user"></i>Sobre
                                </button>
                            </li>
                            {/* Mantenha o resto como estava (se não forem links de navegação principal) */}
                            <li className="mobile-item"><a href="#services" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}><i className="fas fa-cog"></i>Serviços</a></li>
                            <li className="mobile-item"><a href="#portfolio" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}><i className="fas fa-briefcase"></i>Portfólio</a></li>
                            <li className="mobile-item"><a href="#contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}><i className="fas fa-envelope"></i>Contato</a></li>
                            
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

            {/* O MODAL DE AUTENTICAÇÃO */}
            {isAuthOpen && (
                <div className="modal-overlay active">
                    <AuthPage onClose={() => setIsAuthOpen(false)} /> {/* Adicione uma prop onClose ao AuthPage */}
                </div>
            )}
        </>
    );
};

export default Navbar;