import React, { useState } from 'react';
import styles from "../../styles/authentication/LoginForm.module.css"
import SignUp from './signup';
import users from "../../../lib/db/authentication/users"
import { createHash } from 'crypto'
import router from 'next/router';

interface LoginFormProps {
    // todo
}

type LoginForm = {
    email: string,
    password: string
}
/*
    const [formState, setFormState] = useState({
        userId: '',
        category: 'theft',
        submissionDate: '',
        injuries: '',
        perpetrator: '',
        perpetratorDescription: '',
        dateNoticedMissing: '',
        locationStolenFrom: '',
        items: [],
        backgroundOfEvent: '',
        itemDescriptions: '',
        howItHappened: ''
    })
*/

export default function LoginForm(props: any) {
    const { method, setMethod } = props;

    const [formState, setFormState] = useState<LoginForm>({
        email: '',
        password: ''
    })

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormState((prevState) => ({...prevState, [name]:value}))
    }

    function handleMethodChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMethod(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const hashedPassword: string = createHash('sha256').update(formState.password).digest('hex');
        const email: string = formState.email
        
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
                <input type="email" name="email" value={formState.email} onChange={handleFormChange} />
            </label>
            <label className={styles.password}>
                Password:
                <input type="password" name="password" value={formState.password} onChange={handleFormChange} />
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