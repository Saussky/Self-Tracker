import Head from "next/head"
import Gym from "../components/workout/gym/gym"
import Selection from "../components/workout/selection"
import Header from "../components/header/header"
import { GetServerSideProps } from "next";

interface Exercise {
    compound_exercises: string;
    push_exercises: string;
    pull_exercises: string;
    legs_exercises: string;
    core_exercises: string;
    other_exercises: string;
}

interface Props {
    exercises: Exercise[];
}

export default function Workout({ exercises }: Props) {
    console.log('props ', exercises[0])
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
    const token = req.headers.cookie?.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    const res = await fetch(`http://localhost:3000/api/workout/gym/exercise`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    const data = await res.json();
    return { props: { exercises: data.rows } };
};