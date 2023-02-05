import styles from "../../styles/Header.module.css"
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Login() {
    const { user, isLoading, error } = useUser();

    return (
        <>
        {isLoading ? (
            <span>Loading...</span>
         ) : user ? (
            <a href="/api/auth/logout">Logout</a>
         ) : (
            <a href={`/api/auth/login`}>
               Login
            </a>
         )}
         </>
    )
}
