import Head from 'next/head'
import Picture from '../components/picture'

export default function Home() {
  return (  
    <>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://use.typekit.net/fqp8jsw.css" />
        <title>Weather</title>
         <link rel="icon" href="/favicon.ico" /> {/* CHANGE THIS */}
      </Head>
      <div id="modal-root"></div>
      <Picture />
    </>
  )
}