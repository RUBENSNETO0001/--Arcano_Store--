<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header("Access-Control-Allow-Origin: http://localhost:3000"); 

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type"); 

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    include '../conexao_banco_de_dados/conexao.php'; 
    
    if (!$conexao) {
        http_response_code(500); 
        echo json_encode(["sucesso" => false, "mensagem" => "Erro de Conexão com o Banco de Dados. Verifique o conexao.php."]);
        exit();
    }

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
    
    $resultado = $conexao->query($produtos_query);

    if (!$resultado) {
        http_response_code(500);
        echo json_encode(["sucesso" => false, "mensagem" => "Erro na Query SQL: " . $conexao->error]);
        exit();
    }
    
    $produtos = array();
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $produtos[] = $row;
        }
    }
    header('Content-Type: application/json');
    echo json_encode(["featuredProducts" => $produtos]);
?>
