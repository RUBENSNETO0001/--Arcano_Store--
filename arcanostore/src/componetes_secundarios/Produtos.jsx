//fazer uma tabela no banco para esse serviço
// objeto dos produtos
const featuredProductsData = [
  {
    id: 1,
    name: "Gachiakuta Volume 01",
    price: "R$ 50,90",
    image: "https://img.assinaja.com/assets/tZ/099/img/512813_520x520.png",
    category: "Manga",
    discount: "25% OFF",
    new: true,
    description : "O jovem Rudo habita em um gueto de descendentes de criminosos e vive recolhendo lixo e sendo discriminado, até que certo dia, ele é acusado injustamente de um crime que não cometeu e como punição é enviado a um local em que todos temem! Lá, o rapaz conhece conhece Enjin e acaba tendo um vislumbre de toda a verdade sobre o mundo e também começa a manifestar a sua habilidade: Dar vida às coisas! Assim, começa a jornada de Rudo e seu objetivo de mudar por completo o mundo de merda em que vive!!"
  },
  {
    id: 2,
    name: "Caneca do pico",
    price: "R$ 40,90",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrjob0f7BpjcXVOAylOww7zjT_-boZ0YYFTQ88rj9xLyDxwsCbi8MHePkgATWRTUD_suN88eAAV6PNH2W1-jq_vgWAbpRXKXTtgO5vH6kqkRrCH-jg2H8FXA",
    category: "caneta",
  },
  {
    id: 3,
    name: "Pulseira One piece",
    price: "R$ 30,90",
    image: "https://m.media-amazon.com/images/I/410jh8W1t8S._SY1000_.jpg",
    category: "Acessorios",
    discount: "5% OFF",
  },
  {
    id: 4,
    name: "Pulseira One piece",
    price: "R$ 30,90",
    image: "https://m.media-amazon.com/images/I/410jh8W1t8S._SY1000_.jpg",
    category: "Acessorios",
    discount: "5% OFF",
  },
];

// categotias
const categoriesData = [
  { name: "Caneca", icon: "🍻", count: 6 },
  { name: "Manga", icon: "📚", count: 5 },
  { name: "cartinhas", icon: "🃏", count: 15 },
  { name: "Acessórios", icon: "💎", count: 40 },
];

/**
 * @returns {object} 
 */

export const produtos = () => {
  return {
    featuredProducts: featuredProductsData,
    categories: categoriesData,
  };
};

export default produtos;

export { featuredProductsData, categoriesData };