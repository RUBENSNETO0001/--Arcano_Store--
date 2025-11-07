<?php
// produtos.php (Localizado em /arcanostore/backend_php/produtos_bd/produtos.php)

    // ***************************************************************
    // CORREÇÃO CORS: ESSENCIAL
    // ***************************************************************
    
    // Permite acesso APENAS da origem do servidor React (porta 3000)
    header("Access-Control-Allow-Origin: http://localhost:3000"); 

    // Métodos e Headers permitidos
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type"); 

    // Trata a requisição OPTIONS (pré-voo do CORS)
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    // ------------------------------------------------------------------   
    // 1. INCLUSÃO DE ARQUIVOS NECESSÁRIOS
    // ------------------------------------------------------------------
    // O caminho deve ser relativo ao produtos.php
    include '../../conexao_banco_de_dados/conexao.php'; 
    
    // ------------------------------------------------------------------   
    // 2. TESTE DE CONEXÃO (Se falhar, retorna erro 500 para o React)
    // ------------------------------------------------------------------
    if (!$conexao_db) {
        http_response_code(500); 
        echo json_encode(["sucesso" => false, "mensagem" => "Erro de Conexão com o Banco de Dados. Verifique o conexao.php."]);
        exit();
    }


    // ------------------------------------------------------------------   
    // 3. QUERY SQL E EXECUÇÃO
    // ------------------------------------------------------------------
    // Sua query para buscar dados de produto, categoria e itens
    $produtos_query = "
        SELECT
            p.id_produto AS id,
            p.nome_produto AS nome,
            p.preco,
            p.desconto_percentual AS desconto,
            p.e_novo AS novo,
            c.nome_categoria AS category,
            pi.imagem_url AS image,
            pi.descricao_detalhada AS description
        FROM
            produto p
        JOIN
            categoria c ON p.id_categoria = c.id_categoria
        LEFT JOIN 
            produto_itens pi ON p.id_produto = pi.id_produto
    ";
    
    $resultado = $conexao_db->query($produtos_query);

    // TESTE DE QUERY
    if (!$resultado) {
        http_response_code(500);
        echo json_encode(["sucesso" => false, "mensagem" => "Erro na Query SQL: " . $conexao_db->error]);
        exit();
    }
    
    $produtos = array();

    // ------------------------------------------------------------------   
    // 4. PROCESSAMENTO E RETORNO DE DADOS
    // ------------------------------------------------------------------
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $produtos[] = $row;
        }
    }
    
    // Retorna o resultado como JSON
    header('Content-Type: application/json');
    echo json_encode(["featuredProducts" => $produtos]);
?>