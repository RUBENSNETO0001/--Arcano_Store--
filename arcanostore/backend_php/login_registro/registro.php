<?php
// Arquivo: registro.php

// 1. CONFIGURAÇÃO DE DEBUG E CORS
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Cabeçalhos CORS e de Método
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type"); 
header("Access-Control-Max-Age: 86400"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Garante que a resposta será JSON - ESSA LINHA DEVE SER EXECUTADA COM SUCESSO
header("Content-Type: application/json; charset=UTF-8"); 

// 2. INCLUI O CONECTOR USANDO CAMINHO RELATIVO ROBUSTO
// Assumindo que registro.php está em /login_registro/ e conexao.php está em /conexao_banco_de_dados/
$caminho_conexao = dirname(__DIR__) . '/conexao_banco_de_dados/conexao.php';

if (!file_exists($caminho_conexao)) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro Fatal: Arquivo de conexão não encontrado. Caminho testado: " . $caminho_conexao ]);
    exit(); 
}

include $caminho_conexao;


// ====================================================================
// 3. LÓGICA DE REGISTRO (DAO)
// ====================================================================

class RegistroDao {
    
    public static function verify_password($a, $b) {
        if ($a === $b) return 1;
        return 2;
    }
    
    public static function hash_password($a) {
        return password_hash($a, PASSWORD_DEFAULT);
    }

    public function save($conexao_db) { 
        
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        if (!$data) {
            http_response_code(400);
            return json_encode(["sucesso" => false, "mensagem" => "Dados JSON inválidos."]);
        }
        
        // Extração dos dados do JSON
        $nome = $data["full_name"] ?? null;
        $email = $data["email"] ?? null;
        $data_nasc = $data["date_nas"] ?? null;
        $number_tele = $data["telefone"] ?? null;
        $cpf = $data["cpf"] ?? null;
        $senha = $data["password"] ?? null;
        $senha_confirmada = $data["confirm_password"] ?? null;
        
        // VALIDAÇÃO CORRIGIDA: Agora usa $senha_confirmada
        if (!$nome || !$email || !$senha || !$senha_confirmada) { 
            http_response_code(400);
            return json_encode(["sucesso" => false, "mensagem" => "Todos os campos obrigatórios devem ser preenchidos."]);
        }

        if (self::verify_password($senha, $senha_confirmada) == 1) {
            $hash_senha = self::hash_password($senha);

            $stmt = $conexao_db->prepare("INSERT INTO usuario(nome_completo, data_nascimento, cpf, email, telefone, senha) VALUES(?, ?, ?, ?, ?, ?)");
            
            if ($stmt === false) {
                http_response_code(500);
                return json_encode(["sucesso" => false, "mensagem" => "Erro interno na preparação do SQL."]);
            }

            $stmt->bind_param("ssssss", $nome, $data_nasc, $cpf, $email, $number_tele, $hash_senha);

            if ($stmt->execute()) {
                http_response_code(201);
                $stmt->close();
                return json_encode(["sucesso" => true, "mensagem" => "Usuário registrado com sucesso."]);
            } else {
                http_response_code(500);
                $stmt->close();
                return json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar no banco de dados. (Verifique CPF duplicado ou restrições)" ]);
            }
            
        } else {
            http_response_code(400);
            return json_encode(["sucesso" => false, "mensagem" => "Senha não confere, tente novamente!"]);
        }
    }
}


// 4. EXECUÇÃO FINAL
if ($conexao === null) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro de conexão com o Banco de Dados. Verifique o log." ]);
    exit(); 
}

$dao = new RegistroDao();
$response = $dao->save($conexao); 

$conexao->close();

echo $response;
// NADA ABAIXO DESTA LINHA.