<?php
    class registroDao{
        const verify_passaword = ($a, $b) =>{
            if($a === $b){
                return 1;
            }
            else{
                return 2;
            }
        }
        const hash_password = ($a){
            for($i = 0; $i < 100; $i++ ){
                $hash = password_hash($a, PASSWORD_DEFAULT);
                return $hash;
            }
        }
        function save(){
            $nome = $_POST["full_name"];
            $email = $_POST["email"];
            $data = $_POST["date_nas"];
            $number_tele = $_POST["telefone"];
            $cpf = $_POST["cpf"];
            $senha = $_POST["password"];
            $senha_confirmada = $_POST["confirm_password"];
            
            if(verify_password($senha, $senha_confirmada) === 1){
                $hash_senha = hash_password($senha_confirmada);

                $stmt = $mysqli -> prepare("INSERT INTO usuario(nome, data_nacimento,cpf, email, telefone, senha) values()");
                $stmt->bind_param($nome, $data, $cpf, $email, $number_tele, $hash_senha);

                // finalização do codigo
                $stmt->executar();
                $stmt->close();
                header('Location: http://localhost/--ARCANO_STORE--/arcanostore');
            }
        }
    }
?>