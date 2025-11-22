-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 22/11/2025 às 21:29
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `arcanostore`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nome_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nome_categoria`) VALUES
(1, 'Manga'),
(2, 'Caneca'),
(3, 'Acessorios');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id_produto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nome_produto` varchar(255) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `desconto_percentual` decimal(5,2) DEFAULT 0.00,
  `e_novo` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `id_categoria`, `nome_produto`, `preco`, `desconto_percentual`, `e_novo`) VALUES
(1, 1, 'Gachiakuta Volume 01', 50.90, 25.00, 1),
(2, 2, 'Caneca do pico', 40.90, 0.00, 0),
(3, 3, 'Pulseira One piece', 30.90, 5.00, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_itens`
--

CREATE TABLE `produto_itens` (
  `id_prod_item` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `imagem_url` varchar(2048) NOT NULL,
  `descricao_detalhada` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto_itens`
--

INSERT INTO `produto_itens` (`id_prod_item`, `id_produto`, `imagem_url`, `descricao_detalhada`) VALUES
(1, 1, 'https://img.assinaja.com/assets/tZ/099/img/512813_520x520.png', 'O jovem Rudo habita em um gueto de descendentes de criminosos e vive recolhendo lixo e sendo discriminado, até que certo dia, ele é acusado injustamente de um crime que não cometeu e como punição é enviado a um local em que todos temem! Lá, o rapaz conhece conhece Enjin e acaba tendo um vislumbre de toda a verdade sobre o mundo e também começa a manifestar a sua habilidade: Dar vida às coisas! Assim, começa a jornada de Rudo e seu objetivo de mudar por completo o mundo de merda em que vive!!'),
(2, 2, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrjob0f7BpjcXVOAylOww7zjT_-boZ0YYFTQ88rj9xLyDxwsCbi8MHePkgATWRTUD_suN88eAAV6PNH2W1-jq_vgWAbpRXKXTtgO5vH6kqkRrCH-jg2H8FXA', 'Um caneco com design minimalista, traços limpos e arte moderna inspirada no universo anime. Perfeito para quem curte estilo, personalidade e aquela vibe única que mistura elegância com cultura otaku. Feito para quem bebe com classe.'),
(3, 3, 'https://m.media-amazon.com/images/I/410jh8W1t8S._SY1000_.jpg', 'Um bracelete inspirado na grandiosa jornada de One Piece, combinando detalhes náuticos e símbolos icônicos dos Piratas do Chapéu de Palha. Feito para quem carrega a coragem, a aventura e a liberdade no pulso.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome_completo` varchar(120) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cpf` varchar(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome_completo`, `data_nascimento`, `cpf`, `email`, `telefone`, `senha`) VALUES
(3, 'admin da silva', '0001-01-01', '00000000000', 'admin@gmail.com', '000000000000', '$2y$10$TyWwa2u46L2CAWayYXxM6eSRKCKMar/4QXfYAjyca0mqrP.lAKKXK'),
(4, 'RUBENS NETO MARTINS SUAREZ', '2006-01-23', '00000000000', 'rubensnetomartinssuarezneto@outlook.com', '68992402349', '$2y$10$lXSA7YVL5Y.AnygJBPTDW.hp5W1f2zkR84TA8Gu3SdcPY8jAksp.y'),
(5, 'Jose', '2025-10-01', '070.335.962', 'josegaymes@hotmail.com', '68992402349', '$2y$10$VrDG0Pf.603EifJyrhXRjOC/ILcC9zuYtMzaAATS7rluzgN9ZlkLe'),
(6, 'flavio do pneu', '2204-01-01', '12121212121', 'flaviodopeneu@gmail.com', '121212121212', '$2y$10$.LJpXWAy.IH6HhHH8gokuO1p3OuLun/qfxITfkkNYIhIpWUzizgdC');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Índices de tabela `produto_itens`
--
ALTER TABLE `produto_itens`
  ADD PRIMARY KEY (`id_prod_item`),
  ADD KEY `id_produto` (`id_produto`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `produto_itens`
--
ALTER TABLE `produto_itens`
  MODIFY `id_prod_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Restrições para tabelas `produto_itens`
--
ALTER TABLE `produto_itens`
  ADD CONSTRAINT `produto_itens_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
