import { fetchProdutos } from '../services/api_produtos'; 

export const PHP_API_URL_BASE = 'http://localhost/--Arcano_Store--/arcanostore/backend_php/produtos_bd/produtos.php'; 

const categoriesData = [
  { name: "Caneca", icon: "🍻", count: 1 },
  { name: "Manga", icon: "📚", count: 1 },
  { name: "cartinhas", icon: "🃏", count: 0 },
  { name: "Acessorios", icon: "💎", count: 1},
];

/**
 * Busca produtos em destaque (featuredProducts) dinamicamente da API e retorna junto com categorias.
 * @returns {Promise<object>} Um objeto contendo featuredProducts e categories.
 */
export const getProdutosData = async () => {
    
    const featuredProducts = await fetchProdutos();

    if (Array.isArray(featuredProducts)) {
        return {
            featuredProducts: featuredProducts,
            categories: categoriesData,
        };
    } else {
        console.error("Não foi possível carregar os produtos em destaque. Usando dados vazios.");
        return {
            featuredProducts: [],
            categories: categoriesData,
        };
    }
};

export default getProdutosData;
export { categoriesData };