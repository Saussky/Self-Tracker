import Head from "next/head"
import Timer from "../components/general/timer"
import GeneralContainer from "../components/general/general"
import Header from "../components/header/header"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/router";
import user from '../../lib/db/users';



export default function General({ data }: any) {
    console.log(data)

    return (
        <>
            <Head>
                <title>Tracker</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>

            <Header />
            <GeneralContainer />
        </>
    )
}

// export async function getServerSideProps(context: any) {
//   const result = await user.getUser('greg@ory.com');
  
//   const data = result.rows[0];

//   return {
//     props: {
//       data,
//     },
//   };
// }