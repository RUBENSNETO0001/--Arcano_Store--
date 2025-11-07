// api_produtos.js

/**
 * ARCANO STORE - Módulo de Comunicação com a API de Produtos (Backend PHP)
 * * ATENÇÃO: Erros HTTP 500 vêm do servidor PHP. 
 * Use as instruções anteriores para verificar o arquivo:
 * /--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php
 */

// ----------------------------------------------------------------
// CONFIGURAÇÃO BASE
// ----------------------------------------------------------------

// Ajuste este caminho se a estrutura do seu servidor mudar.
const BASE_PATH = '/--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php';
const API_BASE_URL = `http://localhost${BASE_PATH}`;


// ----------------------------------------------------------------
// 1. FUNÇÃO PARA BUSCAR TODOS OS PRODUTOS (LISTA GERAL)
// ----------------------------------------------------------------
/**
 * Busca a lista COMPLETA de todos os produtos da API (sem ID).
 * @returns {Promise<Array|Object>} Array de produtos (ou um objeto de erro na falha).
 */
export const fetchProdutos = async () => {
    try {
        const url = API_BASE_URL;
        console.log("-> 🔎 URL de API PHP (LISTA) sendo testada:", url); 

        const response = await fetch(url);
        
        // Verifica se o status HTTP é 2xx (Sucesso)
        if (!response.ok) {
            // Captura o status (e.g., 500) e lança um erro
            const status = response.status;
            const statusText = response.statusText || 'Erro desconhecido do servidor';
            throw new Error(`Erro HTTP ${status}: ${statusText}`);
        }
        
        const data = await response.json();
        
        // Lógica para retornar o array principal, seja ele direto ou aninhado
        return data.featuredProducts || data; 

    } catch (error) {
        // Este bloco captura erros de rede OU o erro lançado acima
        console.error("❌ Erro ao buscar lista de produtos:", error.message);
        return { 
            sucesso: false, 
            mensagem: `Falha na comunicação com o servidor. (Detalhe: ${error.message})` 
        }; 
    }
}


// ----------------------------------------------------------------
// 2. FUNÇÃO PARA BUSCAR UM PRODUTO POR ID
// ----------------------------------------------------------------
/**
 * Busca um produto específico pelo seu ID.
 * @param {number} produtoId - O ID do produto a ser buscado.
 * @returns {Promise<Object>} O objeto do produto ou objeto de erro.
 */
export const fetchProdutoPorId = async (produtoId) => {
    try {
        const url = `${API_BASE_URL}?id=${produtoId}`;
        console.log(`-> 🔎 URL de API PHP (ID=${produtoId}) sendo testada:`, url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Adaptação para o formato de resposta esperado (array com 1 item ou objeto direto)
        const produto = data.featuredProducts ? (data.featuredProducts[0] || null) : (data[0] || null);
        
        if (!produto) {
             throw new Error(`Nenhum produto encontrado com o ID ${produtoId}.`);
        }
        
        return produto;

    } catch (error) {
        console.error(`❌ Erro ao buscar produto ID ${produtoId}:`, error.message);
        return { 
            sucesso: false, 
            mensagem: `Falha ao carregar detalhes do produto ${produtoId}.` 
        }; 
    }
}


// ----------------------------------------------------------------
// 3. FUNÇÃO PARA BUSCAR PRODUTOS POR CATEGORIA (Placeholder/Extensão)
// ----------------------------------------------------------------
/**
 * Busca produtos filtrados por uma categoria específica.
 * @param {string} categoria - O nome da categoria (ex: 'eletronicos').
 * @returns {Promise<Array|Object>} Array de produtos ou objeto de erro.
 */
export const fetchProdutosPorCategoria = async (categoria) => {
    try {
        const url = `${API_BASE_URL}?categoria=${categoria}`;
        console.log(`-> 🔎 URL de API PHP (CATEGORIA=${categoria}) sendo testada:`, url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP ao buscar categoria: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Assume que o PHP retorna um array ou um objeto com 'produtosCategoria'
        return data.produtosCategoria || data; 

    } catch (error) {
        console.error(`❌ Erro ao buscar produtos da categoria ${categoria}:`, error.message);
        return { sucesso: false, mensagem: `Erro ao carregar produtos da categoria ${categoria}.` }; 
    }
}

// Fim do arquivo api_produtos.js - Total de linhas aproximado: 100