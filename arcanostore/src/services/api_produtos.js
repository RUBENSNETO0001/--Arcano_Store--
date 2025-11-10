const API_BASE_URL = `http://localhost/--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php`;
const API_PRODUTOS_ID = `http://localhost/--Arcano_Store--/arcanostore/backend_php/produtos_bd/detalhe_produto.php`;

export const fetchProdutos = async () => {
    try {
        const url = API_BASE_URL;
        console.log("-> 🔎 URL de API PHP (LISTA) sendo testada:", url); 

        const response = await fetch(url);
        
        if (!response.ok) {
            const status = response.status;
            const statusText = response.statusText || 'Erro desconhecido do servidor';
            throw new Error(`Erro HTTP ${status}: ${statusText}`);
        }
        
        const data = await response.json();
        
        return data.featuredProducts || data; 

    } catch (error) {
        console.error("❌ Erro ao buscar lista de produtos:", error.message);
        return { 
            sucesso: false, 
            mensagem: `Falha na comunicação com o servidor. (Detalhe: ${error.message})` 
        }; 
    }
}

/**
 * Busca um produto específico pelo seu ID.
 * @param {number} produtoId - O ID do produto a ser buscado.
 * @returns {Promise<Object>} O objeto do produto ou objeto de erro.
 */
export const fetchProdutoPorId = async (produtoId) => {
    try {
        // *** CORREÇÃO AQUI: Usa a URL correta (API_PRODUTOS_ID) ***
        const url = `${API_PRODUTOS_ID}?id=${produtoId}`;
        console.log(`-> 🔎 URL de API PHP (ID=${produtoId}) sendo testada:`, url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        const produto = data.produtoDetalhe; 
        
        if (!produto) {
             throw new Error(`Resposta da API inválida. Nenhum objeto de produto encontrado.`);
        }
        
        return produto; // Retorna o objeto único
        
    } catch (error) {
        console.error(`❌ Erro ao buscar produto ID ${produtoId}:`, error.message);
        return { 
            sucesso: false, 
            mensagem: `Falha ao carregar detalhes do produto ${produtoId}.` 
        }; 
    }
}

export const fetchProdutosPorCategoria = async (categoria) => {
    try {
        const url = `${API_BASE_URL}?categoria=${categoria}`;
        console.log(`-> 🔎 URL de API PHP (CATEGORIA=${categoria}) sendo testada:`, url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP ao buscar categoria: ${response.status}`);
        }
        
        const data = await response.json();
        
        return data.produtosCategoria || data; 

    } catch (error) {
        console.error(`❌ Erro ao buscar produtos da categoria ${categoria}:`, error.message);
        return { sucesso: false, mensagem: `Erro ao carregar produtos da categoria ${categoria}.` }; 
    }
}