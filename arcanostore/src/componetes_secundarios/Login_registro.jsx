import '../css/Registro/login.css';
import React, { useState } from 'react';

import { fazerLogin, registrarUsuario } from '../services/apiService'; 

function LoginForm({ onLoginSuccess }) { 
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        // Chama a função real de serviço (importada)
        const resultado = await fazerLogin(formData); 
        setMessage(resultado);

        if (resultado.sucesso) {
            console.log("Login OK:", resultado);
            
            // Notifica o componente pai (AuthPage) sobre o sucesso
            onLoginSuccess(); 
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
                    name="email"
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className='btn_login'>Login</button>

            {message && (
                <div style={{ color: message.sucesso ? 'green' : 'red', marginTop: '10px' }}>
                    {message.mensagem}
                </div>
            )}
        </form>
    );
}
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

        // Chama a função de serviço (AGORA É A IMPORTADA)
        const resultadoAPI = await registrarUsuario(formData); 

        if (resultadoAPI.sucesso) {
            setStatus({ mensagem: `Sucesso: ${resultadoAPI.mensagem}`, sucesso: true });
            // Limpa o formulário após o sucesso
            setFormData({ 
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
 
const AuthPage = () => {
    // isLogin: controla qual formulário está visível
    const [isLogin, setIsLogin] = useState(true);
    // loginStatus: controla se o usuário está logado (opcional, pode ser removido se o pai gerencia tudo)
    const [loginStatus, setLoginStatus] = useState(false);

    // Lógica para verificar o estado inicial (do localStorage)
    React.useEffect(() => {
        // Verifica se há um token ou flag de login no localStorage ao carregar
        if (localStorage.getItem('usuarioLogado') === 'true') {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
        }
    }, []);

    /**
     * Função chamada pelo LoginForm em caso de sucesso.
     * Realiza as ações finais de autenticação.
     */
    const handleLoginSuccess = () => {
        setLoginStatus(true); 
        localStorage.setItem('usuarioLogado', 'true'); 
        alert("Login realizado com sucesso!");
        
        // Redirecionamento (ajuste para sua lógica de roteamento real)
        window.location.href = '/index.html'; 
    };

    // Se o usuário já estiver logado, pode-se renderizar uma mensagem ou redirecionar
    if (loginStatus) {
        return (
            <div className="login_Registro">
                <p>Você já está logado. Redirecionando...</p>
            </div>
        );
    }
    
    return (
        <div className="login_Registro">
            {/* Botões de alternância entre Login e Registro */}
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
            
            {/* Renderiza o formulário ativo */}
            {isLogin ? (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
                <RegistrationForm />
            )}
        </div>
    );
};

export default AuthPage;