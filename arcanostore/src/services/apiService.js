// Defina UM ÚNICO BASE URL para o seu servidor PHP (Apache/XAMPP)
const PHP_SERVER_BASE = 'http://localhost'; // Sem a barra no final
const PHP_API_URL_REGISTRO = '/--Arcano_Store--/arcanostore/backend_php/login_registro/registro.php'; // Começando com a barra (/)
const PHP_API_URL_LOGIN = '/--Arcano_Store--/arcanostore/backend_php/login_registro/login.php';


// --- FUNÇÃO DE REGISTRO ---
export const registrarUsuario = async (userData) => {
    try {
const response = await fetch(`${PHP_SERVER_BASE}${PHP_API_URL_REGISTRO}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData), 
        });

        if (!response.ok) {
            const errorText = await response.text(); // 1. Lê a resposta (que é o HTML do erro PHP)
            let errorMessage = `Erro HTTP: ${response.status}`;
            try {
                 const errorData = JSON.parse(errorText); // 2. TENTA fazer PARSE do HTML como se fosse JSON
                 errorMessage = errorData.mensagem || errorMessage;
            } catch (e) {
                // 3. FALHA AQUI, pois errorText é HTML, não JSON.
            }
            throw new Error(errorMessage); // 4. Lança o erro, que o catch externo captura.
        }
        return await response.json(); // Só chega aqui se response.ok for true

    } catch (error) {
        return { sucesso: false, mensagem: error.message || "Erro de conexão com o servidor de registro." };
    }
};

// --- FUNÇÃO DE LOGIN (Mantida como estava, baseada na estrutura) ---
export const fazerLogin = async (loginData) => {
    try {
        const response = await fetch(`${PHP_SERVER_BASE}${PHP_API_URL_LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData), 
        });

        if (!response.ok) {
            const errorText = await response.text(); // 1. Lê a resposta (que é o HTML do erro PHP)
            let errorMessage = `Erro HTTP: ${response.status}`;
            try {
                 const errorData = JSON.parse(errorText); // 2. TENTA fazer PARSE do HTML como se fosse JSON
                 errorMessage = errorData.mensagem || errorMessage;
            } catch (e) {
                // 3. FALHA AQUI, pois errorText é HTML, não JSON.
            }
            throw new Error(errorMessage); // 4. Lança o erro, que o catch externo captura.
        }
        return await response.json(); // Só chega aqui se response.ok for true 

    } catch (error) {
        console.error("Erro na comunicação com o Backend de Login:", error);
        return { sucesso: false, mensagem: error.message || "Erro de conexão com o servidor de login." };
    }
}