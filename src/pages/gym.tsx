import Head from "next/head"
import Volume from "../components/gym/volume"

export default function Gym() {
    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <Volume />

        </>
    )
}