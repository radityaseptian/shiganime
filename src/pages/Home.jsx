/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Home() {
  const [recent, setRecent] = useState([])
  const url = `${import.meta.env.VITE_URL}/recent-release`

  useEffect(() => {
    initRecent()
  }, [])
  const initRecent = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setRecent(res))
  }
  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='Watch anime subtitle English' />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Shiganime - Watch Anime Subtitle English</title>
      </Helmet>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <Content
            value={recent}
            pageCount={373}
            url={url}
            title={'Anime On-going'}
            linkHome={true}
          />
          <Footer />
        </div>
      </div>
    </>
  )
}
