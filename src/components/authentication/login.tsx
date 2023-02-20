import React, { useState } from 'react';
import styles from "../../styles/authentication/LoginForm.module.css"
import SignUp from './signup';
import users from "../../../lib/db/authentication/users"
import { createHash } from 'crypto'
import router from 'next/router';

interface LoginFormProps {
    // todo
}

export default function LoginForm(props: any) {
    const { method, setMethod } = props
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleMethodChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMethod(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, hashedPassword }),
        });

        if (response.status === 200) {
            console.log('logged in')
            const data = await response.json()
            document.cookie = `jwt=${data.token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/`;
            router.push('/');
        } else {
            const data = await response.json();
            console.log(data.message);
        }
    };

    // TODO: Handle form submission and authentication


    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <label className={styles.email}>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label className={styles.password}>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>

            {method === 'signup' && <SignUp />}
            
            <div className={styles.method}>
                <label>
                    <input
                        type="radio"
                        value="login"
                        checked={method === "login"}
                        onChange={handleMethodChange}
                    />
                    Login
                </label>
                <label>
                    <input
                        type="radio"
                        value="signup"
                        checked={method === "signup"}
                        onChange={handleMethodChange}
                    />
                    Sign up
                </label>
            </div>

            <button type="submit" className={styles.submitButton}>
                {method === 'login' ? 'Log in' : 'Sign up'}
            </button>
        </form>
    );
}