<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // <-- THIS IS KEY
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type"); 
header("Access-Control-Max-Age: 86400"); 

// Check if it's the preflight request (OPTIONS) and exit
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Respond OK to the preflight request
    exit(0); // <-- THIS IS CRITICAL
}
// Inclui a conexão. A variável $conexao virá deste include.
// OBSERVAÇÃO: O seu código original dependia de um include que eu removi/substituí pela conexão direta acima para simplificar.
// Se você mantiver o include, garanta que ele define $conexao corretamente.
include '../conexao_banco_de_dados/conexao.php'; 


class RegistroDao {
    
    public static function verify_password($a, $b) {
        // Usamos estritamente para garantir que as senhas sejam idênticas antes de hashear
        if ($a === $b) return 1;
        return 2;
    }
    
    public static function hash_password($a) {
        // Usa a constante recomendada
        return password_hash($a, PASSWORD_DEFAULT);
    }

    public function save($conexao_db) { 
        
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Dados JSON inválidos."]);
            return;
        }
        
        // Extração dos dados do JSON
        $nome = $data["full_name"] ?? null;
        $email = $data["email"] ?? null;
        $data_nasc = $data["date_nas"] ?? null; // Corresponde ao 'date_nas' do JS
        $number_tele = $data["telefone"] ?? null;
        $cpf = $data["cpf"] ?? null;
        $senha = $data["password"] ?? null;
        $senha_confirmada = $data["confirm_password"] ?? null;
        
        if (!$nome || !$email || !$senha || !$senha_confirmada) {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Todos os campos obrigatórios devem ser preenchidos."]);
            return;
        }

        if (self::verify_password($senha, $senha_confirmada) == 1) {
            $hash_senha = self::hash_password($senha);

            // *** CORREÇÃO CRÍTICA: Nomes de colunas ajustados para corresponder ao SQL ***
            $stmt = $conexao_db->prepare("INSERT INTO usuario(nome_completo, data_nascimento, cpf, email, telefone, senha) VALUES(?, ?, ?, ?, ?, ?)");
            
            // Ordem das variáveis deve corresponder à ordem das colunas acima:
            // nome_completo ($nome), data_nascimento ($data_nasc), cpf ($cpf), email ($email), telefone ($number_tele), senha ($hash_senha)
            $stmt->bind_param("ssssss", $nome, $data_nasc, $cpf, $email, $number_tele, $hash_senha);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["sucesso" => true, "mensagem" => "Usuário registrado com sucesso."]);
            } else {
                // Se houver erro aqui (ex: CPF duplicado se houvesse UNIQUE constraint)
                http_response_code(500);
                echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar no banco de dados: " . $conexao_db->error]);
            }

            $stmt->close();
            
        } else {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Senha não confere, tente novamente!"]);
        }
    }
}


// *** EXECUÇÃO DA API ***

// 1. Verifica se a conexão foi bem-sucedida (Se $conexao é null ou tem erro de conexão)
if ($conexao === null || $conexao->connect_error) {
    if (!headers_sent()) {
        header("Content-Type: application/json; charset=UTF-8");
    }
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro de conexão com o Banco de Dados." ]);
    exit(); // Interrompe TUDO aqui.
}

// 2. Instancia a classe e chama o método 'save', passando a conexão
$dao = new RegistroDao();
$dao->save($conexao); 

// 3. Fecha a conexão
$conexao->close();
?>