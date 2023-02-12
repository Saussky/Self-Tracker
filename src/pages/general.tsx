import Head from "next/head"
import Timer from "../components/general/timer"
import GeneralContainer from "../components/general/general"
import Header from "../components/header/header"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/router";



export default function General() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Oops... something went wrong: {error.message}</div>;
    }
  
    if (!user) {
      router.push('/api/auth/login');
      return null;
    }
    
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
