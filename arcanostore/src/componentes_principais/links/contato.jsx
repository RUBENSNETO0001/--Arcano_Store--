import React from 'react';

const Contato = () => {
    const numeroWhatsApp = '5568999806290';
    const mensagemInicial = "Olá, gostaria de saber mais sobre a Arcano Store.";
    
    const mensagemCodificada = encodeURIComponent(mensagemInicial);
    
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    return (
        <a 
            href={urlWhatsApp} 
            target="_blank" // Abre o link em uma nova aba/janela
            rel="noopener noreferrer" // Boa prática de segurança
            className="navbar-link"
        >
            <i className="fab fa-whatsapp"></i> {/* Ícone do WhatsApp (requer Font Awesome) */}
            Contato
        </a>
    );
};

export default Contato;