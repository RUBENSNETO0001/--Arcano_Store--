/**
 * Adiciona um produto ao carrinho ou incrementa sua quantidade.
 * @param {object} produto - O objeto do produto (deve incluir `id`).
 * @param {number} [quantidade=1] - A quantidade a ser adicionada.
 */
export const adicionarAoCarrinho = (produto, quantidade = 1) => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade; 
    } else {
        carrinho.push({ ...produto, quantidade: quantidade }); 
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

/**
 * Remove um produto pelo ID do carrinho.
 * @param {string|number} produtoId - O ID do produto a ser removido.
 */
export const removerDoCarrinho = (produtoId) => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.id !== produtoId);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

/**
 * Atualiza a quantidade de um produto específico no carrinho.
 * Remove o produto se a quantidade for <= 0.
 * @param {string|number} produtoId - O ID do produto a ser atualizado.
 * @param {number} quantidade - A nova quantidade.
 */
export const atualizarQuantidade = (produtoId, quantidade) => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produto = carrinho.find(item => item.id === produtoId);

    if (produto) {
        produto.quantidade = quantidade;
        if (produto.quantidade <= 0) {
            // Se a quantidade for zero ou negativa, remove o item
            carrinho = carrinho.filter(item => item.id !== produtoId);
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
};

/**
 * Retorna o array de itens do carrinho.
 * @returns {Array} - O carrinho ou um array vazio.
 */
export const obterCarrinho = () => {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
};
export const limparCarrinho = () => {
    localStorage.removeItem('carrinho');
};