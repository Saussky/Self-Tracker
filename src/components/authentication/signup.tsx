import React, { useState } from "react";
import styles from "../../styles/authentication/LoginForm.module.css"
import { createHash } from "crypto"


export default function SignUp(props: any) {
    const { method, setMethod } = props

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [age, setAge] = useState<number>()
    const [country, setCountry] = useState<string>('')
    const [creationSuccessful, setCreationSuccesful] = useState<boolean>()


    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);

        const hashedPassword = createHash('sha256').update(password).digest('hex');
        console.log('password ', hashedPassword)
    }

    function handleAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAge(Number(event.target.value));
    }

    function handleCountryChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCountry(event.target.value)
    }

    function handleMethodChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMethod(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        console.log('password ', hashedPassword)
        

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, hashedPassword, age, country}),
        });

        if (response.status === 200) {
            console.log('weee')
            setCreationSuccesful(true)
            // TODO: Redirect to dashboard or other authorized content
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
            <label className={styles.password}>
                Age:
                <input type="number" value={age} onChange={handleAgeChange} />
            </label>
            <label className={styles.password}>
                Country:
                <input type="country" value={country} onChange={handleCountryChange} />
            </label>

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
                Sign Up
            </button>

            {creationSuccessful && 'Account Created!'}

        </form>
    )
}