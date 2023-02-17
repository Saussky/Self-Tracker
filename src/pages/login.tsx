import Head from "next/head"
import Authentication from "../components/authentication/authentication"
import LoginForm from "../components/authentication/login"

export default function Login() {
    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            
            <Authentication />

        </>
    )
}