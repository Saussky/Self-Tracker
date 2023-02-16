import { useState } from 'react';
import styles from "../../styles/authentication/LoginForm.module.css"
import users from "../../../lib/db/users"

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            console.log('ahhh')
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
            <button type="submit" className={styles.submitButton}>Log in</button>
        </form>
    );
}