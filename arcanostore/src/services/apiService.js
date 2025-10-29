const PHP_SERVER_BASE = 'http://localhost';
const PHP_API_URL_REGISTRO = '/--Arcano_Store--/arcanostore/backend_php/login_registro/registro.php';
const PHP_API_URL_LOGIN = '/--Arcano_Store--/arcanostore/backend_php/login_registro/login.php';

const apiCall = async (url, data) => {
    try {
        const fullUrl = `${PHP_SERVER_BASE}${url}`;
        
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Erro HTTP: ${response.status}`;
            
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.mensagem || errorMessage;
            } catch (e) {
                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        
        return await response.json();

    } catch (error) {
        console.error(`Erro na comunicação com a API em ${url}:`, error);
        
        return { 
            sucesso: false, 
            mensagem: error.message || "Erro de conexão com o servidor." 
        };
    }
};

export const registrarUsuario = async (userData) => {
    return apiCall(PHP_API_URL_REGISTRO, userData);
};

export const fazerLogin = async (loginData) => {
    return apiCall(PHP_API_URL_LOGIN, loginData);
};