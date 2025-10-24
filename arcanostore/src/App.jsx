import React, { useState } from 'react';
import Header from './componentes_principais/Navbar';
import Footer from './componentes_principais/Footer';
import Home from './componetes_secundarios/Main_home';
import Sobre from './componentes_principais/links/sobrenos';
// Renomeando Sdd para ProductDetailPage para maior clareza
import ProductDetailPage from './componetes_secundarios/Main_comprar'; 

function App() {
    // Estado para rastrear a visualização principal ('home', 'sobre', 'product')
    const [activeView, setActiveView] = useState('home'); 
    
    // NOVO ESTADO: Armazena o ID do produto a ser visualizado
    const [selectedProductId, setSelectedProductId] = useState(null); 

    // Função para navegação no Navbar (Home, Sobre)
    const handleNavigation = (view) => {
        setActiveView(view);
        setSelectedProductId(null); // Reseta o ID ao navegar para Home/Sobre
    };

    // NOVA FUNÇÃO: Recebe o ID do produto clicado na Home e muda a visualização
    const handleViewProduct = (productId) => {
        setSelectedProductId(productId);
        setActiveView('product'); // Define a visualização como 'product'
        window.scrollTo(0, 0); // Volta ao topo da página
    };

    // Função para voltar para a Home a partir da página do produto
    const handleBackToHome = () => {
        setActiveView('home');
        setSelectedProductId(null);
        window.scrollTo(0, 0);
    };
    
    // Renderiza o conteúdo da página com base no estado 'activeView'
    const renderContent = () => {
        switch (activeView) {
            case 'home':
                // Passa a função handleViewProduct para que a Home possa mudar a tela
                return <Home onViewProduct={handleViewProduct} />; 
            case 'sobre':
                return <Sobre />;
            case 'product':
                // Renderiza o ProductDetailPage, passando o ID e a função de voltar
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
            <Header onNavigate={handleNavigation} />
            {renderContent()}
            <Footer/>
        </div>
    );
}

export default App;