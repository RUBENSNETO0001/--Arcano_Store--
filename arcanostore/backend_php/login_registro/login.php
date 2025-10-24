<?php
// ------------------------------------------------------------------
// 1. CONFIGURAÇÕES DE CORS (Cross-Origin Resource Sharing)
// Permite que seu frontend (localhost:3000) acesse esta API
// ------------------------------------------------------------------
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type"); 
header("Access-Control-Max-Age: 86400"); 

// Trata a requisição de preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Define o tipo de conteúdo da resposta
header("Content-Type: application/json; charset=UTF-8");

// Inclui a conexão com o banco de dados
// ATENÇÃO: Certifique-se que este include define a variável $conexao
include '../conexao_banco_de_dados/conexao.php'; 

// ------------------------------------------------------------------
// 2. CLASSE DE AUTENTICAÇÃO (DAO)
// ------------------------------------------------------------------
class LoginDao {
    
    /**
     * Verifica se a senha enviada corresponde ao hash armazenado no banco.
     * @param string $password_plain Senha enviada pelo usuário (não hasheada).
     * @param string $password_hash Hash da senha armazenada no banco.
     * @return bool
     */
    public static function verify_password($password_plain, $password_hash) {
        // Função nativa do PHP recomendada para comparar senhas hasheadas
        return password_verify($password_plain, $password_hash);
    }

    /**
     * Tenta autenticar o usuário com base no email e senha.
     * @param mysqli $conexao_db Conexão ativa com o banco de dados.
     */
    public function authenticate($conexao_db) { 
        
        // 1. Receber e Decodificar o JSON
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        if (!$data || !isset($data["email"]) || !isset($data["password"])) {
            http_response_code(400);
            echo json_encode(["sucesso" => false, "mensagem" => "Email e Senha são obrigatórios."]);
            return;
        }
        
        $email = $data["email"];
        $senha_enviada = $data["password"];
        
        // 2. Buscar o usuário no banco pelo Email
        // Usamos prepared statements para evitar SQL Injection
        $stmt = $conexao_db->prepare("SELECT id, nome_completo, senha FROM usuario WHERE email = ?");
        if (!$stmt) {
             http_response_code(500);
             echo json_encode(["sucesso" => false, "mensagem" => "Erro na preparação da query: " . $conexao_db->error]);
             return;
        }
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        // 3. Verificar se o usuário foi encontrado
        if ($resultado->num_rows === 0) {
            // NOTA DE SEGURANÇA: Retornar uma mensagem genérica (ex: "Credenciais inválidas")
            // é melhor do que dizer "Usuário não encontrado", para não dar dicas a atacantes.
            http_response_code(401); // Unauthorized
            echo json_encode(["sucesso" => false, "mensagem" => "Email ou senha inválidos."]);
            $stmt->close();
            return;
        }

        $usuario = $resultado->fetch_assoc();
        $stmt->close(); // Fecha o primeiro statement

        // 4. Verificar a senha
        $hash_db = $usuario["senha"];

        if (self::verify_password($senha_enviada, $hash_db)) {
            // *** SUCESSO NA AUTENTICAÇÃO ***
            
            // Aqui você adicionaria a lógica de Sessão ou Geração de Token JWT (para APIs RESTful)
            // Por simplicidade, retornamos o ID e o nome.
            
            http_response_code(200); // OK
            echo json_encode([
                "sucesso" => true, 
                "mensagem" => "Login realizado com sucesso!",
                "id_usuario" => $usuario["id"],
                "nome" => $usuario["nome_completo"]
                // Em um cenário real, você retornaria um TOKEN de autenticação aqui.
            ]);
        } else {
            // *** FALHA NA VERIFICAÇÃO DA SENHA ***
            http_response_code(401); // Unauthorized
            echo json_encode(["sucesso" => false, "mensagem" => "Email ou senha inválidos."]);
        }
    }
}

// ------------------------------------------------------------------
// 3. EXECUÇÃO DA API
// ------------------------------------------------------------------

// Verifica se a conexão foi bem-sucedida
if ($conexao === null || $conexao->connect_error) {
    http_response_code(500);
    echo json_encode(["sucesso" => false, "mensagem" => "Erro de conexão com o Banco de Dados." ]);
    exit(); 
}

// Instancia a classe e chama o método 'authenticate'
$dao = new LoginDao();
$dao->authenticate($conexao); 

// Fecha a conexão
$conexao->close();
?>