import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from '../services/authService';
import  './css/Auth.css'

const Auth = () => {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await login(id);
               navigate('/dashboard')
            }
            else {
                await register(id, name, phone);
                setIsLogin(true);
            }
        }
        catch (err: any) {
            const msg = err.response?.data?.message || "somthing wrong happend try again";
            setError(msg);
        }
    }

    return (
        <div className="authContainer">
            <h2>{isLogin ? 'login' : 'register'}</h2>

            {error && <div className="errorMsg">{error}</div>}

            <form className="authForm" onSubmit={handleSubmit}>
                <input
                    className="authInput"
                    type="text"
                    placeholder="Enter your ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                {!isLogin && (
                    <>
                        <input
                            className="authInput"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            className="authInput"
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </>
                )}
                <button className="authButton" type="submit">
                    {isLogin ? 'login' : 'register'}</button>
            </form>

            <p className="toggleLink" onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
            }}>
                {isLogin ? 'dont have an account yet? register now!' : 'already in? login now!'}
            </p>
        </div>
    )
};
export default Auth;