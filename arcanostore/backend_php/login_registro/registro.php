<?php
include 'conexao.php';
// 1. Configurar o Header para que o React saiba que estamos enviando JSON e para permitir a comunicação (CORS)
header("Access-Control-Allow-Origin: *"); // Mude para o domínio do seu React em produção
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// ==============================================================================
// **IMPORTANTE: Você precisa ter o objeto de conexão com o banco ($mysqli ou $pdo) definido em algum lugar antes de chamar esta classe.**
// Como não temos o código da conexão, vou deixá-lo como um placeholder.
// Exemplo: $conexao_db = new mysqli("localhost", "user", "password", "database");
// ==============================================================================

class RegistroDao {
    
    // CORREÇÃO 1 & 2: Sintaxe correta para métodos estáticos em PHP
    public static function verify_password($a, $b) {
        if ($a === $b) {
            return 1; // Senhas coincidem
        } else {
            return 2; // Senhas não coincidem
        }
    }
    
    // CORREÇÃO 3: Sintaxe e remoção do loop inútil
    public static function hash_password($a) {
        return password_hash($a, PASSWORD_DEFAULT);
    }

    // A função save agora precisa ser chamada, mas ela precisa do objeto de conexão.
    // Vamos passá-lo como argumento.
    public function save($conexao_db) { 
        
        // CORREÇÃO 4: Ler dados do corpo JSON da requisição do React
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        if (!$data) {
            http_response_code(400); // Bad Request
            echo json_encode(["sucesso" => false, "mensagem" => "Dados JSON inválidos."]);
            return;
        }
        
        $nome = $data["full_name"] ?? null;
        $email = $data["email"] ?? null;
        $data_nasc = $data["date_nas"] ?? null;
        $number_tele = $data["telefone"] ?? null;
        $cpf = $data["cpf"] ?? null;
        $senha = $data["password"] ?? null;
        $senha_confirmada = $data["confirm_password"] ?? null;
        
        // Validação básica se algum campo crucial veio nulo
        if (!$nome || !$email || !$senha || !$senha_confirmada) {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Todos os campos obrigatórios devem ser preenchidos."]);
            return;
        }

        // Verificação de senha (usando self:: para chamar o método estático)
        if (self::verify_password($senha, $senha_confirmada) == 1) {
            $hash_senha = self::hash_password($senha);

            // CORREÇÃO 5: Usando a conexão passada ($conexao_db)
            // Nota: Usei 'mysqli' aqui, mas PDO é geralmente preferido para APIs.
            $stmt = $conexao_db->prepare("INSERT INTO usuario(nome, data_nacimento, cpf, email, telefone, senha) VALUES(?, ?, ?, ?, ?, ?)");
            
            // CORREÇÃO: O bind_param espera que as variáveis sejam passadas por referência
            $stmt->bind_param("ssssss", $nome, $data_nasc, $cpf, $email, $number_tele, $hash_senha);

            // CORREÇÃO 6: Usando execute() e retornando JSON, não redirecionando
            if ($stmt->execute()) {
                http_response_code(201); // Created
                echo json_encode(["sucesso" => true, "mensagem" => "Usuário registrado com sucesso."]);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar no banco de dados: " . $conexao_db->error]);
            }

            $stmt->close();
            
        } else {
            // Senha não confere
            http_response_code(400); // Bad Request, pois os dados não são válidos
            echo json_encode(["sucesso" => false, "mensagem" => "Senha não confere, tente novamente!"]);
        }
    }
}

?>