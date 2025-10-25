import React, { useState, useEffect } from 'react';
import Header from './componentes_principais/Navbar';
import Footer from './componentes_principais/Footer';
import Home from './componetes_secundarios/Main_home';
import Sobre from './componentes_principais/links/sobrenos';
import ProductDetailPage from './componetes_secundarios/Main_comprar'; 
import { verificarEstadoInicial, atualizarInterfaceAposLogin } from './services/button-login-carrinho';
import { fazerLogin } from './services/apiService'; 

document.addEventListener('DOMContentLoaded', verificarEstadoInicial);

function App() {
    const [activeView, setActiveView] = useState('home'); 
    const [selectedProductId, setSelectedProductId] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('usuarioLogado') === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleNavigation = (view) => {
        setActiveView(view);
        setSelectedProductId(null);
    };

    const handleViewProduct = (productId) => {
        setSelectedProductId(productId);
        setActiveView('product');
        window.scrollTo(0, 0);
    };

    const handleBackToHome = () => {
        setActiveView('home');
        setSelectedProductId(null);
        window.scrollTo(0, 0);
    };

    const handleLoginProcess = async (loginData) => {
        const resultado = await fazerLogin(loginData);

        if (resultado.sucesso) {
            setIsLoggedIn(true);
            // Chama a função de controle do DOM para ocultar o botão de login instantaneamente
            atualizarInterfaceAposLogin(); 
            
            alert("Login realizado com sucesso!");
            window.location.href = '/index.html';
        } else {
            alert(resultado.mensagem);
        }
    };
    
    const renderContent = () => {
        switch (activeView) {
            case 'home':
                return <Home onViewProduct={handleViewProduct} />; 
            case 'sobre':
                return <Sobre />;
            case 'product':
                return (
                    <ProductDetailPage 
                        productId={selectedProductId}
                        onBack={handleBackToHome}
                    />
                );
            default:
                return <Home onViewProduct={handleViewProduct} />;
        }
    };

    return (
        <div className="body">
            <Header 
                onNavigate={handleNavigation} 
                isLoggedIn={isLoggedIn}
                onLogin={handleLoginProcess}
            />
            {renderContent()}
            <Footer/>
        </div>
    );
}

export default App;