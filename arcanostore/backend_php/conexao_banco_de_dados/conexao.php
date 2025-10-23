<?php
// *** CONEXÃO (Incluído, assumindo que este arquivo está em /arcano_store/backend_php/login_registro/) ***
// **IMPORTANTE:** Ajuste o caminho se o seu arquivo de conexão for diferente.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conexao = null; // Inicializa a variável de conexão

try{
    // Este arquivo deve ser o seu 'conexao.php' ou você deve incluir o seu arquivo de conexão real aqui
    $conexao = new mysqli('localhost', 'root', '', 'arcanostore'); 
    // NENHUM ECHO AQUI!
}
catch (mysqli_sql_exception $e){
    error_log('Falha ao conectar: '. $e->getMessage()); 
    // $conexao permanece null
}?>