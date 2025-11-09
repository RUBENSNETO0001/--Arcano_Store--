import React, { useState } from 'react';
import '../css/Main/Main_carrinho.css';
/**
 * Componente de Carrinho de Compras com foco em finalização via PIX.
 * * @param {object} props
 * @param {Array<object>} props.itens - A lista de produtos no carrinho.
 * @param {function} props.onRemoverItem - Função para remover um item pelo ID.
 * @param {function} props.onAtualizarQuantidade - Função para mudar a quantidade.
 */
function CarrinhoPagamentoPix({ itens = [], onRemoverItem, onAtualizarQuantidade }) {
  
  const [pagamentoStatus, setPagamentoStatus] = useState('pendente'); // 'pendente', 'pix_gerado', 'pago'

  const total = itens.reduce((acc, item) => {
    // ⚠️ Importante: Converte preço para número para cálculo.
    const priceString = item.price.replace('R$', '').trim().replace(',', '.');
    const priceNum = parseFloat(priceString);
    
    const subtotal = (isNaN(priceNum) ? 0 : priceNum) * (item.quantity || 0);
    return acc + subtotal;
  }, 0);

  const totalFormatado = total.toFixed(2).replace('.', ',');

  // Simulação da geração do PIX
  const handleGerarPix = () => {
    if (itens.length > 0) {
      setPagamentoStatus('pix_gerado');
      // Na vida real: Aqui você faria uma chamada API para gerar o QR Code e o Código Copia e Cola
      alert(`PIX gerado para o valor de R$ ${totalFormatado}.`);
      
      // Simulação de confirmação de pagamento após 5 segundos
      setTimeout(() => {
        setPagamentoStatus('pago');
        alert("✅ Pagamento PIX Confirmado!");
      }, 5000); 
    }
  };

  const renderControlesItem = (item) => (
    <div className="controles-carrinho">
      <div className="quantidade-selector-carrinho">
        <button 
          onClick={() => onAtualizarQuantidade(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1} 
        >
          -
        </button>
        <span className="quantidade-valor">{item.quantity}</span>
        <button 
          onClick={() => onAtualizarQuantidade(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      
      <button 
        className="btn-remover-carrinho" 
        onClick={() => onRemoverItem(item.id)}
      >
        ❌ Remover
      </button>
    </div>
  );

  const renderSecaoPix = () => {
    const pixCode = "00020126360014BR.GOV.BCB.PIX01140000000000000"; // Código fake

    switch (pagamentoStatus) {
      case 'pendente':
        return (
          <button 
            className="btn-finalizar-carrinho" 
            onClick={handleGerarPix}
            disabled={itens.length === 0}
          >
            Pagar com PIX R$ {totalFormatado}
          </button>
        );

      case 'pix_gerado':
        return (
          <div className="pix-info-box pix-info-gerado">
            <h4>⏱️ Aguardando Pagamento PIX...</h4>
            
            <div className="pix-qr-code-placeholder">
              {/* 

[Image of PIX QR Code]
 (Simulação de QR Code) */}
              <img src="https://via.placeholder.com/150x150?text=QR+Code+PIX" alt="QR Code PIX" />
            </div>
            
            <p className="pix-code-copia">
              **Copia e Cola:** <span className="pix-code">{pixCode.substring(0, 20)}...</span>
              <button className="btn-copiar-pix" onClick={() => navigator.clipboard.writeText(pixCode)}>
                📋 Copiar
              </button>
            </p>
            <small>Este código expira em 30 minutos.</small>
          </div>
        );

      case 'pago':
        return (
          <div className="pix-info-box pix-info-pago">
            <h3>✅ Pagamento Confirmado!</h3>
            <p>Seu pedido será processado em breve. Obrigado!</p>
            <button className="btn-primary-nova-compra">Nova Compra</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="carrinho-painel">
      <h2>🛒 Seu Pedido</h2>
      
      {itens.length === 0 && pagamentoStatus !== 'pago' ? (
        <p className="carrinho-vazio-msg">Seu carrinho está vazio. Adicione um produto para pagar!</p>
      ) : (
        <div className="lista-itens-carrinho">
          {itens.map(item => {
            const priceString = item.price.replace('R$', '').trim().replace(',', '.');
            const priceNum = parseFloat(priceString);
            const subtotal = (isNaN(priceNum) ? 0 : priceNum) * (item.quantity || 0);

            return (
              <div key={item.id} className="item-carrinho-detalhe">
                <div className="info-produto-carrinho">
                  <h4>**{item.name}**</h4>
                  <p>Preço Unitário: {item.price}</p>
                  <p className="subtotal-carrinho">
                    Subtotal: **R$ {subtotal.toFixed(2).replace('.', ',')}**
                  </p>
                </div>
                
                {/* Permite modificação apenas se o pagamento ainda não foi gerado/pago */}
                {pagamentoStatus === 'pendente' && renderControlesItem(item)}
                <hr/>
              </div>
            );
          })}
        </div>
      )}

      <div className="resumo-total-carrinho">
        <h3>Total a Pagar: **R$ {totalFormatado}**</h3>
        {renderSecaoPix()}
      </div>
    </div>
  );
}

export default CarrinhoPagamentoPix;