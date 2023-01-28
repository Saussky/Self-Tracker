import Head from "next/head"
import Timer from "../components//general/timer"
import Counter from "../components/general/counter"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Tracker</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Link href="/general">General</Link>
    </>
  )
}
