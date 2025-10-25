export const atualizarInterfaceAposLogin = () => {
    const botaoLogin = document.getElementById('navbar-cta');
    const botaoCarrinho = document.getElementById('navbar-cta2');

    if (botaoLogin) {
        botaoLogin.style.display = 'none';
    }

    if (botaoCarrinho) {
        botaoCarrinho.style.display = 'block';
    }

    localStorage.setItem('usuarioLogado', 'true');
};

export const verificarEstadoInicial = () => {
    if (localStorage.getItem('usuarioLogado') === 'true') {
        atualizarInterfaceAposLogin();
    } else {
        const botaoCarrinho = document.getElementById('navbar-cta2');
        if (botaoCarrinho) {
            botaoCarrinho.style.display = 'none';
        }
    }
};