// api_produtos.js

// Ajuste o caminho base para a localização da sua API PHP no servidor local (Apache/XAMPP)
const PHP_API_URL_BASE = '/--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php';

// ***************************************************************
// 1. FUNÇÃO CORRETA PARA BUSCAR TODOS OS PRODUTOS
//    (Usada pelo Produtos.jsx/Main_home.jsx)
// ***************************************************************
/**
 * Busca a lista COMPLETA de todos os produtos da API (sem ID).
 * @returns {Promise<Array|Object>} Array de produtos (ou um objeto de erro).
 */
export const fetchProdutos = async () => {
    try {
        // A URL não inclui parâmetro de ID
        const url = `http://localhost${PHP_API_URL_BASE}`;
        console.log("-> 🔎 URL de API PHP (LISTA) sendo testada:", url); 

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        // O PHP agora deve retornar um array ou { featuredProducts: [...] }
        return data.featuredProducts || data; 

    } catch (error) {
        console.error("❌ Erro ao buscar lista de produtos:", error);
        return { sucesso: false, mensagem: "Erro ao buscar a lista de produtos. Verifique o servidor." }; 
    }
}


// ***************************************************************
// 2. FUNÇÃO CORRETA PARA BUSCAR UM PRODUTO POR ID
//    (Usada pelo Main_comprar.jsx/ProductDetailPage.jsx)
// ***************************************************************
/**
 * Busca um produto específico pelo seu ID.
 * @param {number} produtoId - O ID do produto a ser buscado.
 * @returns {Promise<Object>} O objeto do produto ou objeto de erro.
 */
export const fetchProdutoPorId = async (produtoId) => {
    try {
        // A URL inclui o parâmetro de ID
        const url = `http://localhost${PHP_API_URL_BASE}?id=${produtoId}`;
        console.log("-> 🔎 URL de API PHP (ID) sendo testada:", url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Se a API retornar um array (como o PHP faz), retorna o primeiro item.
        return data.featuredProducts ? (data.featuredProducts[0] || null) : (data[0] || null);

    } catch (error) {
        console.error(`❌ Erro ao buscar produto ID ${produtoId}:`, error);
        return { sucesso: false, mensagem: "Erro ao buscar produto por ID." }; 
    }
}

// Opcional: Adicionar a função buscarProdutosPorCategoria aqui também.