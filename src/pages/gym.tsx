import Head from "next/head"
import Volume from "../components/gym/volume"
import Header from "../components/header/header"

export default function Gym() {
    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            
            <Header />
            <Volume />

        </>
    )
}