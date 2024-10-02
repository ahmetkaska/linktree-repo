import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/adminLogin.css';


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // useHistory yerine useNavigate kullanıyoruz

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '8bX$3qzP#L9f@7Jv') { // dummy login logic
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/linktree');  // history.push yerine navigate('/linktree') kullanıyoruz
        } else {
            setErrorMessage('Geçersiz kullanıcı adı veya şifre');
        }
    };

    return (
        <div className="container-admin">
            <div className="title">Admin Login</div>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <div className="error">{errorMessage}</div>}
                <button type="submit" className="button">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
