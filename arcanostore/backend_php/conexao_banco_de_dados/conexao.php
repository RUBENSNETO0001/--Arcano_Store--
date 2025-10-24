<?php
// Arquivo: conexao.php

// Configurações do Banco de Dados (AJUSTE SE NECESSÁRIO)
$DB_HOST = 'localhost'; 
$DB_USER = 'root';
$DB_PASS = ''; // Senha vazia no XAMPP padrão
$DB_NAME = 'arcanostore'; // O nome exato do seu banco de dados

$conexao = null;

try {
    // Força o MySQL a lançar exceções em caso de erro
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    
    // A conexão é tentada.
    $conexao = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    
}
catch (mysqli_sql_exception $e) {
    // Loga o erro detalhado no log do servidor (não envia para o cliente)
    error_log('Erro de Conexão SQL no Conector: ' . $e->getMessage()); 
    // $conexao permanece null
}
catch (Exception $e) {
    error_log('Erro Geral ao criar a conexão: ' . $e->getMessage());
}
// NADA DEVE ESTAR ABAIXO DESTA LINHA.