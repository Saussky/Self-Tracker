import Head from "next/head"
import Timer from "../components/general/timer"
import Counter from "../components/general/counter"
import Header from "../components/header/header"

export default function General() {
    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <Header />
            <Timer />
            <Counter />
        </>
    )
}
