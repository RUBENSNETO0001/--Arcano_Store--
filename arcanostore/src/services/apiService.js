// Defina UM ÚNICO BASE URL para o seu servidor PHP (Apache/XAMPP)
const PHP_SERVER_BASE = 'http://localhost'; // A porta 80 é implícita 

// ASSUMA que seu servidor web está servindo a pasta 'backend_php' (ou onde você colocou o registro.php)
const PHP_API_URL_REGISTRO = '/--ARCANO_STORE--/arcanostore/backend_php/login_registro/registro.php'; 
const PHP_API_URL_LOGIN = '/--ARCANO_STORE--/arcanostore/backend_php/login_registro/login.php';


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
            const errorText = await response.text();
            let errorMessage = `Erro HTTP: ${response.status}`;
            try {
                 const errorData = JSON.parse(errorText);
                 errorMessage = errorData.mensagem || errorMessage;
            } catch (e) {
                // Se não for JSON, mantemos a mensagem de status.
            }
            throw new Error(errorMessage);
        }
        return await response.json(); 

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
            const errorText = await response.text();
            let errorMessage = `Erro HTTP: ${response.status}`;
            try {
                 const errorData = JSON.parse(errorText);
                 errorMessage = errorData.mensagem || errorMessage;
            } catch (e) {
                // Se não for JSON, mantemos a mensagem de status.
            }
            throw new Error(errorMessage);
        }
        return await response.json(); 

    } catch (error) {
        console.error("Erro na comunicação com o Backend de Login:", error);
        return { sucesso: false, mensagem: error.message || "Erro de conexão com o servidor de login." };
    }
}