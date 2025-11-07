<?php
// detalhe_produto.php (Localizado em /arcanostore/backend_php/produtos_bd/detalhe_produto.php)

// CORREÇÃO CORS E CONFIGURAÇÃO
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

// 1. INCLUSÃO DE ARQUIVOS NECESSÁRIOS (Assumindo que define $conexao)
include '../conexao_banco_de_dados/conexao.php'; 

// 2. TESTE DE CONEXÃO (Usando $conexao, como no seu login.php)
if (!isset($conexao) || $conexao->connect_error) {
    http_response_code(500); 
    echo json_encode(["sucesso" => false, "mensagem" => "Erro de Conexão com o Banco de Dados."]);
    exit();
}


// 3. CAPTURAR E VALIDAR O ID DA REQUISIÇÃO GET
if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["sucesso" => false, "mensagem" => "ID do produto não fornecido."]);
    $conexao->close();
    exit();
}

$produto_id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

if ($produto_id === false) {
    http_response_code(400); 
    echo json_encode(["sucesso" => false, "mensagem" => "ID inválido fornecido."]);
    $conexao->close();
    exit();
}


// 4. QUERY SQL COM PREPARED STATEMENT
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
    WHERE
        p.id_produto = ?
";

$stmt = $conexao->prepare($produtos_query);

if (!$stmt) {
    http_response_code(500);
    // CORREÇÃO: Usar $conexao->error
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na preparação da Query: " . $conexao->error]);
    $conexao->close();
    exit();
}

$stmt->bind_param("i", $produto_id); // 'i' para inteiro
$stmt->execute();
$resultado = $stmt->get_result();


// 5. PROCESSAMENTO E RETORNO DE DADOS
if ($resultado->num_rows === 1) { 
    $produto = $resultado->fetch_assoc();
    
    header('Content-Type: application/json');
    // Retorno formatado como {"produtoDetalhe": {...}}
    echo json_encode(["produtoDetalhe" => $produto]); 
} else {
    http_response_code(404); // Not Found
    echo json_encode(["sucesso" => false, "mensagem" => "Produto com ID {$produto_id} não encontrado."]);
}

$stmt->close();
$conexao->close();
?>