<?php
// fiz assim pelo oque eu me lhor try e igual ao if e catch e o else se não me engano kkkkkkkkk
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    
    try{
        // conexao do codigo ao banco de dados
        $conexao = new mysqli('localhost', 'root', '', 'arcanostore');
        
        echo"Conexão feita com sucesso!!";
    }
    catch (mysqli_sql_exception $e){
        error_log('Falha ao conectar'. $e->getMessage()); 
        
        die('Falha na conexao do banco de dados'. $e-> getMessage());
    }
?>
<!-- nunca mexer na conexão do banco -->