import React from 'react';

const Contato = () => {
    const numeroWhatsApp = '+5568992118928';
    const mensagemInicial = "Olá, gostaria de saber mais sobre a Arcano Store.";
    
    const mensagemCodificada = encodeURIComponent(mensagemInicial);
    
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    return (
        <a href={urlWhatsApp} target="_blank" rel="noopener noreferrer" className="navbar-link">
            <i className="fab fa-whatsapp"></i> {/* Ícone do WhatsApp*/}
            Contate-nòs
        </a>
    );
};

export default Contato;