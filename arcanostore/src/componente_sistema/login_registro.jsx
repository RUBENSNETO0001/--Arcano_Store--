import '../css/Registro/login.css';
import React, { useState } from 'react';

// Componente para o formulário de Login
const LoginForm = () => {
    return (
        <form action="db_login.php" method="post"> {/* Alterei para POST, que é mais seguro para login */}
            <h1>Login</h1>
            <label htmlFor="login-username-email">Nome ou Email</label>
            <input type="text" id="login-username-email" placeholder="Digite seu nome ou email:" name="username_or_email" required />
            
            <label htmlFor="login-password">Senha</label>
            <input type="password" id="login-password" placeholder="Digite sua senha:" name="password" required />
            
            <input type="submit" value="Entrar" />
        </form>
    );
};

// Componente para o formulário de Registro
const RegistrationForm = () => {
    return (
        <form action="db_registro.php" method="post"> {/* Alterei para POST, que é mais seguro para registro */}
            <h1>Registro</h1>
            <label htmlFor="register-name">Nome Completo</label>
            <input type="text" id="register-name" placeholder="Digite seu nome completo:" name="full_name" min={5} max={100}required />
            
            <label htmlFor="register-email">Email</label>
            <input type="email" id="register-email" placeholder="Digite seu email:" name="email" required /> {/* Alterado para type="email" */}
            
            <label htmlFor="register-dataNascimento">Data de Nascimento</label>
            <input type="date" id="register-dataNascimento" />

            <label htmlFor="register-cpf">CPF</label>
            <input type="email" id="register-cpf" placeholder="Digite seu cpf:" name="cpf" min={2} max={11} required /> {/* Alterado para type="email" */}
            
            <label htmlFor="register-password">Senha</label>
            <input type="password" id="register-password" placeholder="Digite uma senha:" name="password" min={6} max={24} required />
            
            <label htmlFor="register-confirm-password">Confirmação de Senha</label>
            <input type="password" id="register-confirm-password" placeholder="Confirme sua senha:" name="confirm_password" min={6} max={24} required />
            
            <input type="submit" value="Cadastrar" />
        </form>
    );
};

/**
 * Componente principal que gerencia a exibição do Login ou Registro.
 */
const AuthPage = () => {
    // Estado para controlar qual formulário deve ser exibido.
    // 'login' ou 'register'
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login_Registro">
            {/* Botões para alternar entre as telas */}
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
            
            {/* Renderiza o formulário baseado no estado 'isLogin' */}
            {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
    );
};

export default AuthPage;