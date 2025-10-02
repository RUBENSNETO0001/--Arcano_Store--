const featuredProductsData = [
  {
    id: 1,
    name: "boku no hero",
    price: "R$ 149,90",
    image: "/produtos/orbe-cristalino.jpg",
    category: "Artefatos",
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Caneca do Deku",
    price: "R$ 149,90",
    image: "/produtos/orbe-cristalino.jpg",
    category: "Artefatos",
    bestseller: true,
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