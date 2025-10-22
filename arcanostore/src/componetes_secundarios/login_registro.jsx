import '../css/Registro/login.css';
import React, { useState } from 'react';
// IMPORTA as funções de comunicação com o PHP/API
import { registrarUsuario, fazerLogin } from './services/apiService';

// Componente para o formulário de Login (REFATORADO para usar fetch/API)
const LoginForm = () => {
    const [loginData, setLoginData] = useState({ username_or_email: '', password: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Tentando fazer login...');
        setLoading(true);
        
        // Chama a função de serviço de login
        const resultado = await fazerLogin(loginData); 

        if (resultado.sucesso) {
            setStatus(`Sucesso! Bem-vindo, ${resultado.nome || 'usuário'}.`);
            // Aqui você faria o redirecionamento ou salvaria o token de autenticação
        } else {
            setStatus(`Erro no Login: ${resultado.mensagem}`);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}> 
            <h1>Login</h1>
            <label htmlFor="login-username-email">Nome ou Email</label>
            <input 
                type="text" 
                id="login-username-email" 
                name="username_or_email" 
                value={loginData.username_or_email} 
                onChange={handleChange} 
                required 
            />
            
            <label htmlFor="login-password">Senha</label>
            <input 
                type="password" 
                id="login-password" 
                name="password" 
                value={loginData.password} 
                onChange={handleChange} 
                required 
            />
            
            <input type="submit" value={loading ? "Entrando..." : "Entrar"} disabled={loading} />
            {status && <p className={status.includes('Sucesso') ? 'success' : 'error'}>{status}</p>}
        </form>
    );
};

// Componente para o formulário de Registro (CORRIGIDO PARA USAR ESTADO E SERVIÇO)
const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        full_name: '', email: '', date_nas: '', 
        cpf: '', telefone: '', password: '', 
        confirm_password: ''
    });
    // MUDANÇA: Adiciona 'resultado' ao estado para ser acessível no return
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
        
        // Limpa o status anterior
        setStatus({ mensagem: '', sucesso: false });

        if (formData.password !== formData.confirm_password) {
            setStatus({ mensagem: "As senhas não coincidem!", sucesso: false });
            return;
        }

        setStatus({ mensagem: 'Enviando dados...', sucesso: false });
        setLoading(true);

        // Chama a função de serviço
        const resultadoAPI = await registrarUsuario(formData); // A variável agora é 'resultadoAPI'

        // Trata o resultado do PHP
        if (resultadoAPI.sucesso) {
            setStatus({ mensagem: `Sucesso: ${resultadoAPI.mensagem}.`, sucesso: true });
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
        <form onSubmit={handleSubmit}> 
            <h1>Registro</h1>
            
            {/* Exemplo de um campo (todos os outros inputs devem ter name, value, onChange) */}
            <label htmlFor="register-name">Nome Completo</label>
            <input type="text" id="register-name" name="full_name" value={formData.full_name} onChange={handleChange} required />
            
            <label htmlFor="register-email">Email</label>
            <input type="email" id="register-email" name="email" value={formData.email} onChange={handleChange} required />
            
            <label htmlFor="register-dataNascimento">Data de Nascimento</label>
            <input type="date" id="register-dataNascimento" name='date_nas' value={formData.date_nas} onChange={handleChange} required/>

            <label htmlFor="register-cpf">CPF</label>
            <input type="text" id="register-cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />

            <label htmlFor="register-telefone">Telefone</label>
            <input type="text" id="register-telefone" name="telefone" value={formData.telefone} onChange={handleChange} required /> 

            <label htmlFor="register-password">Senha</label>
            <input type="password" id="register-password" name="password" value={formData.password} onChange={handleChange} required />
            
            <label htmlFor="register-confirm-password">Confirmação de Senha</label>
            <input type="password" id="register-confirm-password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
            
            <input type="submit" value={loading ? "Cadastrando..." : "Cadastrar"} disabled={loading} />
            
            {/* CORREÇÃO DO ERRO: Agora 'status.sucesso' existe porque está no estado! */}
            {status.mensagem && <p className={status.sucesso ? 'success' : 'error'}>{status.mensagem}</p>}
        </form>
    );
};


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

export default AuthPage;