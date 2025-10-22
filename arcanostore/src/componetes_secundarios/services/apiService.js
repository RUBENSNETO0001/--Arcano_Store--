// **ATENÇÃO:** Ajuste esta URL para onde seu servidor PHP (rodando Apache/Nginx/php -S) está acessível.
const PHP_API_URL_REGISTRO = '../../backend_php/login_registro/registro.php'; 
const PHP_API_URL_LOGIN = '#!'; 

// --- FUNÇÃO DE REGISTRO ---
export const registrarUsuario = async (userData) => {
    try {
        const response = await fetch(PHP_API_URL_REGISTRO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensagem || `Erro HTTP: ${response.status}`);
        }
        return await response.json(); 

    } catch (error) {
        console.error("Erro na comunicação com o Backend de Registro:", error);
        return { sucesso: false, mensagem: error.message || "Erro de conexão com o servidor de registro." };
    }
};

// --- FUNÇÃO DE LOGIN (Sugestão para o LoginForm) ---
export const fazerLogin = async (loginData) => {
    try {
        const response = await fetch(PHP_API_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensagem || `Erro HTTP: ${response.status}`);
        }
        return await response.json(); 

    } catch (error) {
        console.error("Erro na comunicação com o Backend de Login:", error);
        return { sucesso: false, mensagem: error.message || "Erro de conexão com o servidor de login." };
    }
}