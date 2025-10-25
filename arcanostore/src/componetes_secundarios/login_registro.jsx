import '../css/Registro/login.css';
import React, { useState } from 'react';
// Certifique-se que o caminho para apiService.js está correto
import { fazerLogin } from '../services/apiService'; 

// ------------------------------------------------------------------
// FUNÇÃO DE SERVIÇO DE REGISTRO (Deve ser importada do apiService.js)
// Como ela não está definida aqui, usaremos uma função placeholder 
// que deve ser substituída pela sua chamada real ao backend PHP de registro.
// ------------------------------------------------------------------
const registrarUsuario = async (data) => {
    // Substitua esta chamada pela sua implementação real:
    // Exemplo: return await fetch(`${PHP_SERVER_BASE}${PHP_API_URL_REGISTER}`, { ... });

    console.warn("AVISO: A função registrarUsuario está usando um placeholder. Verifique sua importação de apiService.");
    
    // Placeholder: Simulando uma falha ou sucesso no registro
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula latência de rede
    
    if (data.email === "teste@duplicado.com") {
        return { sucesso: false, mensagem: "Este email já está cadastrado." };
    }
    
    return { sucesso: true, mensagem: "Usuário registrado com sucesso (Placeholder)." };
};


// ==================================================================
// 1. COMPONENTE DE LOGIN
// ==================================================================
function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '' // Deve ser 'email' e 'password' para bater com o PHP (login.php)
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); 

        if (!formData.email || !formData.password) {
            setMessage({ sucesso: false, mensagem: "Por favor, preencha o Email e a Senha." });
            return;
        }

        // Chama a função de serviço de LOGIN
        const resultado = await fazerLogin(formData); 
        
        setMessage(resultado);

        if (resultado.sucesso) {
            console.log("Login OK:", resultado);
            // Aqui você faria o redirecionamento ou salvamento de token
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email" // NOME CORRETO ESPERADO PELO PHP
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password" // NOME CORRETO ESPERADO PELO PHP
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Entrar</button>

            {message && (
                <div style={{ color: message.sucesso ? 'green' : 'red', marginTop: '10px' }}>
                    {message.mensagem}
                </div>
            )}
        </form>
    );
}

// ==================================================================
// 2. COMPONENTE DE REGISTRO
// ==================================================================
const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        full_name: '', 
        email: '', 
        date_nas: '', 
        cpf: '', 
        telefone: '', 
        password: '', 
        confirm_password: ''
    });
    const [status, setStatus] = useState({ mensagem: '', sucesso: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setStatus({ mensagem: '', sucesso: false });

        if (formData.password !== formData.confirm_password) {
            setStatus({ mensagem: "As senhas não coincidem!", sucesso: false });
            return;
        }

        setStatus({ mensagem: 'Enviando dados...', sucesso: false });
        setLoading(true);

        // Chama a função de serviço de REGISTRO (usando a função placeholder acima)
        const resultadoAPI = await registrarUsuario(formData); 

        // Trata o resultado do PHP
        if (resultadoAPI.sucesso) {
            setStatus({ mensagem: `Sucesso: ${resultadoAPI.mensagem}`, sucesso: true });
            setFormData({ // Limpa os campos
                full_name: '', email: '', date_nas: '', 
                cpf: '', telefone: '', password: '', 
                confirm_password: ''
            });
        } else {
            setStatus({ mensagem: `Erro: ${resultadoAPI.mensagem}`, sucesso: false });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} method='POST'> 
            <h1>Registro</h1>
            <label htmlFor="register-name">Nome Completo</label>
            <input type="text" id="register-name" name="full_name" value={formData.full_name} onChange={handleChange} required />
            
            <label htmlFor="register-email">Email</label>
            <input type="email" id="register-email" name="email" value={formData.email} onChange={handleChange} required />
            
            <label htmlFor="register-dataNascimento">Data de Nascimento</label>
            <input type="date" id="register-dataNascimento" name='date_nas' value={formData.date_nas} onChange={handleChange} required/>

            <label htmlFor="register-cpf">CPF</label>
            <input type="text" id="register-cpf" name="cpf" value={formData.cpf} onChange={handleChange} required maxLength={11}/>

            <label htmlFor="register-telefone">Telefone</label>
            <input type="text" id="register-telefone" name="telefone" value={formData.telefone} onChange={handleChange} required maxLength={12}/> 

            <label htmlFor="register-password">Senha</label>
            <input type="password" id="register-password" name="password" value={formData.password} onChange={handleChange} required minLength={5}/>
            
            <label htmlFor="register-confirm-password">Confirmação de Senha</label>
            <input type="password" id="register-confirm-password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required minLength={5}/>
            
            <input type="submit" value={loading ? "Cadastrando..." : "Cadastrar"} disabled={loading} />
            
            {status.mensagem && <p className={status.sucesso ? 'success' : 'error'}>{status.mensagem}</p>}
        </form>
    );
};


// ==================================================================
// 3. COMPONENTE PRINCIPAL (ÚNICO DEFAULT EXPORT)
// ==================================================================
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login_Registro">
            <div className="toggle-buttons">
                <button 
                    onClick={() => setIsLogin(true)} 
                    style={{ fontWeight: isLogin ? 'bold' : 'normal' }}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)} 
                    style={{ fontWeight: !isLogin ? 'bold' : 'normal' }}
                >
                    Registro
                </button>
            </div>
            {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
    );
};

// ÚNICO DEFAULT EXPORT para evitar o erro de compilação
export default AuthPage;