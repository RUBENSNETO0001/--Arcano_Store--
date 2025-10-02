const featuredProductsData = [
  {
    id: 1,
    name: "Orbe Cristalino",
    price: "R$ 149,90",
    image: "/produtos/orbe-cristalino.jpg",
    category: "Artefatos",
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Livro das Sombras",
    price: "R$ 89,90",
    image: "/produtos/livro-sombras.jpg",
    category: "Livros",
    bestseller: true,
  },
  {
    id: 3,
    name: "Poção de Energia",
    price: "R$ 45,90",
    image: "/produtos/pocao-energia.jpg",
    category: "Poções",
  },
  {
    id: 4,
    name: "Capa do Arcanista",
    price: "R$ 299,90",
    image: "/produtos/capa-arcanista.jpg",
    category: "Vestimentas",
    new: true,
  },
];

const categoriesData = [
  { name: "Caneca", icon: "📚", count: 6 },
  { name: "Manga", icon: "⚱️", count: 5 },
  { name: "cartinhas", icon: "🧪", count: 15 },
  { name: "Acessórios", icon: "💎", count: 40 },
];

// --- Funções de Exportação ---

/**
 * Função principal que pode retornar todos os dados ou ser usada como
 * um módulo de agregação.
 * @returns {object} Um objeto contendo os dados de produtos e categorias.
 */

export const produtos = () => {
  return {
    featuredProducts: featuredProductsData,
    categories: categoriesData,
  };
};

export default produtos;

export { featuredProductsData, categoriesData };