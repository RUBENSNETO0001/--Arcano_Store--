import { fazerLogin } from './apiService.js'; 
import { atualizarInterfaceAposLogin } from './button-login-carrinho.js'; 

async function handleFormSubmission(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email').value;
    const senhaInput = document.getElementById('senha').value;

    const loginData = { email: emailInput, senha: senhaInput };
    
    const resultado = await fazerLogin(loginData);

    if (resultado.sucesso) {
        atualizarInterfaceAposLogin(); 
        
        alert("Login realizado com sucesso!");
    } else {
        alert(resultado.mensagem);
    }
}
document.addEventListener('DOMContentLoaded', async () => { // Torna o listener async
    const loginForm = document.getElementById('loginForm'); 
    if (loginForm) {
        loginForm.addEventListener('submit', handleFormSubmission); 
    }
    const { verificarEstadoInicial } = await import('./button-login-carrinho.js');
    verificarEstadoInicial();
});