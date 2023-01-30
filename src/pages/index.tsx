import Head from "next/head"
import Timer from "../components/general/timer"
import Counter from "../components/general/counter"
import Link from "next/link"
import Header from "../components/header/header"
import Card from "../components/card/card"

export default function Home() {
  return (
    <>
      <Head>
        <title>Tracker</title>
        <link href='http://fonts.googleapis.com/css?family=Lato:400,500,700' rel='stylesheet' type='text/css'></link>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />
      <Card />


      
    </>
  )
}
