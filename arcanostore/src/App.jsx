// src/App.js

import React, { useState } from 'react';
import Header from './componentes_principais/Navbar';
import Footer from './componentes_principais/Footer';
import Home from './componetes_secundarios/Main_home';
import Sobre from './componentes_principais/links/sobrenos'; // Caminho ajustado com base no seu App.js

function App() {
  // Estado para rastrear a visualização ativa ('home' ou 'sobre')
  const [activeView, setActiveView] = useState('home'); 

  // Função para mudar a visualização, passada para o Navbar
  const handleNavigation = (view) => {
    setActiveView(view);
  };
    
  // Renderiza o conteúdo da página com base no estado 'activeView'
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <Home />;
      case 'sobre':
        return <Sobre />;
      // Você pode adicionar mais casos aqui, como 'contato'
      default:
        return <Home />;
    }
  };

  return (
    <div className="body">
      {/* Passa a função de navegação para o Header */}
      <Header onNavigate={handleNavigation} />
      
      {/* Renderiza o conteúdo ativo */}
      {renderContent()}
      
      <Footer/>
    </div>
  );
}

export default App;