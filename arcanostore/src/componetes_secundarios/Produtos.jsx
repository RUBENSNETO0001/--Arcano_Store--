import { fetchProdutos } from '../services/api_produtos'; 

// Esta URL agora está EXPORTADA e com o protocolo CORRIGIDO (http://).
// Se for usada apenas dentro de 'api_produtos.js', você deve movê-la para lá.
export const PHP_API_URL_BASE = 'http://localhost/--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php'; 

// NOTA: Para um projeto completo, você faria uma chamada API separada para buscar estas categorias.
const categoriesData = [
  { name: "Caneca", icon: "🍻", count: 6 },
  { name: "Manga", icon: "📚", count: 5 },
  { name: "cartinhas", icon: "🃏", count: 15 },
  { name: "Acessorios", icon: "💎", count: 40 }, // Ajustado para 'Acessorios' para bater com o DB
];

/**
 * Busca produtos em destaque (featuredProducts) dinamicamente da API e retorna junto com categorias.
 * @returns {Promise<object>} Um objeto contendo featuredProducts e categories.
 */
export const getProdutosData = async () => {
    
    // Chama a função que fará a requisição HTTP.
    const featuredProducts = await fetchProdutos();

    if (Array.isArray(featuredProducts)) {
        // Se a resposta for um array de produtos, retorna o sucesso.
        return {
            featuredProducts: featuredProducts,
            categories: categoriesData,
        };
    } else {
        // Se a API retornou um erro (ex: { sucesso: false, mensagem: ... }) ou um valor inesperado.
        console.error("Não foi possível carregar os produtos em destaque. Usando dados vazios.");
        return {
            featuredProducts: [],
            categories: categoriesData,
        };
    }
};

// Exporta a função principal para ser chamada no componente/página
export default getProdutosData;

// Exporta os dados estáticos caso ainda sejam usados em outro lugar
export { categoriesData };