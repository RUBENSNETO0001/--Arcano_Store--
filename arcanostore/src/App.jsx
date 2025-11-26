import React, { useState, useEffect } from 'react';
import Header from './componentes_principais/Header';
import Footer from './componentes_principais/Footer';
import Home from './componetes_secundarios/Main_home';
import Sobre from './componentes_principais/links/sobrenos';
import ProductDetailPage from './componetes_secundarios/Main_comprar'; 
import { fazerLogin } from './services/apiService'; 
import Carrinho from './componetes_secundarios/carrinho_home';

function App() {
    const [activeView, setActiveView] = useState('home'); 
    const [selectedProductId, setSelectedProductId] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    // Efeito para verificar o estado de login ao carregar (lendo o localStorage)
    useEffect(() => {
        if (localStorage.getItem('usuarioLogado') === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleNavigation = (view) => {
        setActiveView(view);
        setSelectedProductId(null);
        window.scrollTo(0, 0); // Rola para o topo ao mudar de view
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

    // FUNÇÃO DE LOGIN
    const handleLoginProcess = async (loginData) => {
        const resultado = await fazerLogin(loginData);

        if (resultado.sucesso) {
            localStorage.setItem('usuarioLogado', 'true');
            setIsLoggedIn(true); 
            
            alert("Login realizado com sucesso!");
            
            // Redirecionamento após o login
            window.location.href = '/index.html'; 
        } else {
            alert(resultado.mensagem);
        }
    };
    
    // FUNÇÃO DE LOGOUT (NOVA LÓGICA)
    const handleLogout = () => {
        localStorage.removeItem('usuarioLogado');
        setIsLoggedIn(false);
        alert("Você saiu da sua conta.");
        handleNavigation('home'); // Volta para a página inicial após o logout
    };
    
    // RENDERIZAÇÃO CONDICIONAL DO CONTEÚDO (INCLUINDO 'carrinho')
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
            case 'carrinho':
                // O componente que criamos (PaginaDoCarrinho)
                return <Carrinho />;
            default:
                return <Home onViewProduct={handleViewProduct} />;
        }
    };

    return (
        <div className="body">
            <Header 
                onNavigate={handleNavigation} 
                isLoggedIn={isLoggedIn} 
                onLogin={handleLoginProcess} // Chamado ao clicar em Login no modal
                onLogout={handleLogout}       // Passa a função de Logout
            />
            {renderContent()}
            <Footer/>
        </div>
    );
}

export default App;