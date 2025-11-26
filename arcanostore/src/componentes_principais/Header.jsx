import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import AuthPage from '../componetes_secundarios/Login_registro'; 
import Contato from './links/contato';
import { obterCarrinho } from '../services/system-carrinho'; 

const Header = ({ apenasLogin = false, onNavigate, isLoggedIn, onLogin, onLogout }) => {
    
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [itemCount, setItemCount] = useState(0); 

    const updateItemCount = () => {
        const carrinho = obterCarrinho();
        const total = carrinho.reduce((sum, item) => sum + (item.quantidade || 0), 0);
        setItemCount(total);
    };

    useEffect(() => {
        updateItemCount(); 
        window.addEventListener('storage', updateItemCount);
        return () => {
            window.removeEventListener('storage', updateItemCount);
        };
    }, []); 

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (view) => {
        setIsMobileMenuOpen(false); 
        if (onNavigate) {
            onNavigate(view);
        }
    };

    const handleLoginClick = () => {
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false); 
    };
    
    const handleLoginSuccess = () => {
        setIsAuthOpen(false); 
        if (onLogin) {
            onLogin(); 
        }
    };

    const renderCTAs = (isMobile = false) => {
        const ctaClass = isMobile ? 'mobile-cta-button' : 'cta-button';
        const containerClass = isMobile ? 'mobile-cta' : 'navbar-cta';

        const badgeStyle = {
            position: 'absolute',
            top: '-5px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            lineHeight: '1',
            pointerEvents: 'none', 
        };
        
        if (isLoggedIn) {
            return (
                <div className={containerClass}>
                    <button 
                        id="navbar-cta2" 
                        className={ctaClass}
                        onClick={() => handleLinkClick('carrinho')} 
                        style={{ position: 'relative' }} 
                    >
                        <i className="fas fa-shopping-cart"></i> Carrinho
                        {itemCount > 0 && <span style={badgeStyle}>{itemCount}</span>}
                    </button>
                    {isMobile && onLogout && (
                        <button className={ctaClass} onClick={onLogout} style={{ marginTop: '10px' }}>
                            <i className="fas fa-sign-out-alt"></i> Sair
                        </button>
                    )}
                </div>
            );
        } else {
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
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <button className='navbar-logo-button' onClick={() => handleLinkClick('home')}>
                            <img src="assents/logo/logo.svg" alt="logo" className='logo' />
                            <span>Arcano Store</span>
                        </button>
                    </div>

                    {!apenasLogin && (
                        <ul className="navbar-menu">
                            <li className="navbar-item"><button className="navbar-link" onClick={() => handleLinkClick('home')}>Início</button></li>
                            <li className="navbar-item"><button className="navbar-link" onClick={() => handleLinkClick('sobre')}>Sobre Nós</button></li>
                            <li className="navbar-item"><Contato /></li>
                        </ul>
                    )}

                    {renderCTAs()}

                    {!apenasLogin && (
                        <div className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    )}
                </div>
            </nav>
            {isMobileMenuOpen && (
                <div className="mobile-overlay active" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}
            
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
                        <Contato /> 
                    </li>
                </ul>
                
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