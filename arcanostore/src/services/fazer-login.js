import { fazerLogin } from './sua-api-service.js'; // Importa fazerLogin
import { atualizarInterfaceAposLogin } from './controle-botoes.js'; // Importa a função de UI

async function handleFormSubmission(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email').value;
    const senhaInput = document.getElementById('senha').value;

    const loginData = { email: emailInput, senha: senhaInput };
    
    // Chama a função de login
    const resultado = await fazerLogin(loginData);

    if (resultado.sucesso) {
        atualizarInterfaceAposLogin(); 
        
        alert("Login realizado com sucesso!");
        // Redirecionar o usuário para a página principal/loja
        window.location.href = '#!'; // Mude para sua página inicial
    } else {
        // Tratar erro
        alert(resultado.mensagem);
    }
}

// Certifique-se de que a função de verificação inicial também é chamada ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Isso garante que se o usuário já logou em outra página e navegou para cá, os botões já estejam certos
    // Você precisará importar 'verificarEstadoInicial' aqui também, se estiver em um módulo.
    // Ex: import { verificarEstadoInicial } from './controle-botoes.js';
    // verificarEstadoInicial(); 
});