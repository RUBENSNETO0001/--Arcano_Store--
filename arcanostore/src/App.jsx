import React, { useState, useEffect } from 'react';
import Header from './componentes_principais/Navbar';
import Footer from './componentes_principais/Footer';
import Home from './componetes_secundarios/Main_home';
import Sobre from './componentes_principais/links/sobrenos';
import ProductDetailPage from './componetes_secundarios/Main_comprar'; 
import { fazerLogin } from './services/apiService'; 

function App() {
    const [activeView, setActiveView] = useState('home'); 
    const [selectedProductId, setSelectedProductId] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para o login

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
            localStorage.setItem('usuarioLogado', 'true');
            setIsLoggedIn(true); 
            
            alert("Login realizado com sucesso!");
            
            // Redirecionamento (Pode ser removido se o login for um modal na mesma página)
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
                isLoggedIn={isLoggedIn} // Passa o estado para o Header
                onLogin={handleLoginProcess}
            />
            {renderContent()}
            <Footer/>
        </div>
    );
}

export default App;