import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; 
import logo from '../assets/logo.jpg'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username && !password) {
            setUsernameError('Please enter username');
            setPasswordError('Please enter password');
            return;
        } else if (!username) {
            setUsernameError('Please enter username');
            setPasswordError('');
            return;
        } else if (!password) {
            setUsernameError('');
            setPasswordError('Please enter password');
            return;
        }

        try {
            // Attempt to log in
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password
            });

            console.log(response.data);

            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            // Handle login error
        }
    };

    return (
        <div className="loginContainer">
            <img src={logo} alt="Logo" className="loginLogo" />
            <h2 className="loginTitle">Login</h2>
            <form onSubmit={handleSubmit} className="loginForm">
                <input
                    className={`loginUsernameInput ${usernameError && 'error'}`}
                    type="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <div className="errorMessage">{usernameError}</div>}
                <input
                    className={`loginPasswordInput ${passwordError && 'error'}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="errorMessage">{passwordError}</div>}
                <button type="submit" className="loginButton">Login</button>
            </form>

            <div className="signupText">
                <p>Don't have an account?</p>
                <button onClick={() => navigate('/signup')} className="signButton">Sign up</button>
            </div>
        </div>
    );
};

export default LoginPage;