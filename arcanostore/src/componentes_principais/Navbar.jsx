// src/componentes_principais/Navbar.jsx

import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import AuthPage from '../componetes_secundarios/login_registro';
import Contato from './links/contato';

// O componente principal agora recebe as props de navegação E de autenticação
const Navbar = ({ apenasLogin = false, onNavigate, isLoggedIn, onLogin, onLogout }) => {
    // onLogout será necessário para um botão de sair
    
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
        setIsMobileMenuOpen(false);
        if (onNavigate) {
            onNavigate(view);
        }
    };

    const handleLoginClick = () => {
        // Abre o modal de autenticação (Login/Registro)
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false);
    };
    
    // Supondo que você precise passar a função de login para o modal AuthPage
    const handleLoginSuccess = (loginData) => {
        // Fecha o modal
        setIsAuthOpen(false);
        // Chama a função de login do App.js para atualizar o estado global
        if (onLogin) {
            onLogin(loginData);
        }
    };

    // --- Lógica de Renderização Condicional dos Botões ---
    const renderCTAs = () => {
        if (isLoggedIn) {
            // Se logado, mostra o botão do carrinho (navbar-cta2)
            return (
                <>
                    {/* Botão Carrinho Desktop */}
                    <div className="navbar-cta">
                        <button id="navbar-cta2" className="cta-button">
                            <i className="fas fa-shopping-cart"></i> Carrinho
                        </button>
                    </div>
                    {/* Botão Sair (Opcional) */}
                    {/* <button onClick={onLogout}>Sair</button> */}
                </>
            );
        } else {
            // Se não logado, mostra o botão de login (navbar-cta)
            return (
                <div className="navbar-cta">
                    <button id="navbar-cta" className="cta-button" onClick={handleLoginClick}> 
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
                            <li className="navbar-item">
                                <button className="navbar-link" onClick={() => handleLinkClick('home')}>Início</button>
                            </li>
                            <li className="navbar-item">
                                <button className="navbar-link" onClick={() => handleLinkClick('sobre')}>Sobre Nós</button>
                            </li>
                            <li className="navbar-item"><Contato /></li>
                        </ul>
                    )}

                    {/* Botões de Ação (Login/Carrinho) */}
                    {renderCTAs()}

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

                {/* Menu mobile (Ajuste a lógica condicional aqui também se precisar) */}
                {/* Você pode reutilizar renderCTAs() para o mobile ou criar uma versão separada */}
                {/* ... (Seu código de menu mobile continua aqui) ... */}
                
            </nav>

            {/* O MODAL DE AUTENTICAÇÃO */}
            {isAuthOpen && (
                <div className="modal-overlay active">
                    {/* Importante: Passe a função de sucesso de login para o modal */}
                    <AuthPage 
                        onClose={() => setIsAuthOpen(false)} 
                        onLoginSuccess={handleLoginSuccess}
                    /> 
                </div>
            )}
        </>
    );
};

export default Navbar; // Exportação ÚNICA e CORRETA