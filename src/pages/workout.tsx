import Head from "next/head"
import Gym from "../components/workout/gym/gym"
import Selection from "../components/workout/selection"
import Header from "../components/header/header"

export default function Workout() {
    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            
            <Header />
            <Selection />

        </>
    )
}