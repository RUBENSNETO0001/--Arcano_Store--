<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type"); 
    header("Access-Control-Max-Age: 86400"); 

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit(0);
    }

    header("Content-Type: application/json; charset=UTF-8");

    include '../conexao_banco_de_dados/conexao.php'; 

    class LoginDao {
        /**
         * Verifica se a senha enviada corresponde ao hash armazenado no banco.
         * @param string $password_plain Senha enviada pelo usuário (não hasheada).
         * @param string $password_hash Hash da senha armazenada no banco.
         * @return bool
         */
        
        public static function verify_password($password_plain, $password_hash) {
            return password_verify($password_plain, $password_hash);
        }

        /**
         * Tenta autenticar o usuário com base no email e senha.
         * @param mysqli $conexao_db Conexão ativa com o banco de dados.
         */
        public function authenticate($conexao_db) { 
            
            // Receber e Decodificar o JSON
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);

            if (!$data || !isset($data["email"]) || !isset($data["password"])) {
                http_response_code(400);
                echo json_encode(["sucesso" => false, "mensagem" => "Email e Senha são obrigatórios."]);
                return;
            }
            
            $email = $data["email"];
            $senha_enviada = $data["password"];
            
            // Buscar o usuário no banco pelo Email
            $stmt = $conexao_db->prepare("SELECT id, nome_completo, senha FROM usuario WHERE email = ?");
            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["sucesso" => false, "mensagem" => "Erro na preparação da query: " . $conexao_db->error]);
                return;
            }
            
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $resultado = $stmt->get_result();

            // Verificar se o usuário foi encontrado
            if ($resultado->num_rows === 0) {
                http_response_code(401); // Unauthorized
                echo json_encode(["sucesso" => false, "mensagem" => "Email ou senha inválidos."]);
                $stmt->close();
                return;
            }

            $usuario = $resultado->fetch_assoc();
            $stmt->close(); 

            // Verificar a senha
            $hash_db = $usuario["senha"];

            if (self::verify_password($senha_enviada, $hash_db)) {
                // SUCESSO NA AUTENTICAÇÃO
                
                http_response_code(200); // OK
                echo json_encode([
                    "sucesso" => true, 
                    "mensagem" => "Login realizado com sucesso!",
                    "id_usuario" => $usuario["id"],
                    "nome" => $usuario["nome_completo"]
                ]);
            } else {
                // FALHA NA VERIFICAÇÃO DA SENHA
                http_response_code(401); // Unauthorized
                echo json_encode(["sucesso" => false, "mensagem" => "Email ou senha inválidos."]);
            }
        }
    }

    if ($conexao === null || $conexao->connect_error) {
        http_response_code(500);
        echo json_encode(["sucesso" => false, "mensagem" => "Erro de conexão com o Banco de Dados." ]);
        exit(); 
    }

    $dao = new LoginDao();
    $dao->authenticate($conexao); 

    // Fecha a conexão
    $conexao->close();
?>