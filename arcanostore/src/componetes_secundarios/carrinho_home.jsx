import React, { useState, useEffect } from 'react';
import CarrinhoPagamentoPix from './CarrinhoPagamentoPix'; 
import { obterCarrinho, removerDoCarrinho, atualizarQuantidade } from '../services/system-carrinho'; 

function PaginaDoCarrinho() {
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]);

  const atualizarEstadoCarrinho = () => { 
    setItensDoCarrinho(obterCarrinho()); 
  };

  useEffect(() => {
    atualizarEstadoCarrinho();
  }, []); 

  // Funções para manipulação e atualização
  const handleRemoverItem = (produtoId) => {
    removerDoCarrinho(produtoId);
    atualizarEstadoCarrinho(); 
  };

  const handleAtualizarQuantidade = (produtoId, quantidade) => {
    atualizarQuantidade(produtoId, quantidade);
    atualizarEstadoCarrinho(); 
  };

  return (
    <div className="pagina-principal-do-carrinho">
      
      <h1>Painel de Carrinho e Pagamento</h1>

      {/* Passa o estado e as funções para o componente filho */}
      <CarrinhoPagamentoPix
        itens={itensDoCarrinho.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price, 
          // Mapeia 'quantidade' para 'quantity'
          quantity: item.quantidade, 
        }))}
        onRemoverItem={handleRemoverItem}
        onAtualizarQuantidade={handleAtualizarQuantidade}
      />
    </div>
  );
}

export default PaginaDoCarrinho; 