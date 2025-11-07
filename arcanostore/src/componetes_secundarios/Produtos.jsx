const PHP_API_URL_BASE = 'http/localhost/--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php'; 
// ^^^ ESTE CAMINHO ESTÁ CORRETO? ^^^
import { fetchProdutos } from '../services/api_produtos';
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
    
    // Chama a função da API e aguarda os produtos
    const featuredProducts = await fetchProdutos();

    // Verifica se a API retornou um array de produtos ou um objeto de erro
    if (Array.isArray(featuredProducts)) {
        // Se for um array, os dados estão prontos para serem usados
        
        // Opcional: Aqui você pode fazer qualquer transformação final nos dados se necessário.
        // Por exemplo, formatar preço, etc. (O PHP já faz boa parte disso).

        return {
            featuredProducts: featuredProducts,
            categories: categoriesData,
        };
    } else {
        // Se a API retornou um erro (o objeto { sucesso: false, mensagem: ... })
        console.error("Não foi possível carregar os produtos em destaque. Usando dados vazios.");
        return {
            featuredProducts: [], // Retorna um array vazio em caso de erro
            categories: categoriesData,
        };
    }
};

// Exporta o novo nome da função para ser chamada no componente/página
export default getProdutosData;

// Exporta os dados estáticos caso ainda sejam usados em outro lugar
export { categoriesData };

// O array featuredProductsData fica vazio ou é removido, 
// pois agora os dados vêm da API.
// const featuredProductsData = [];