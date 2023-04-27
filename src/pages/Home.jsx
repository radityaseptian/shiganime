import Navbar from '../components/Navbar'
import Content from '../components/Content'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'

export default function Home() {
  const [rekomendasi, setRekomendasi] = useState([])
  const [recent, setRecent] = useState([])
  const url = 'https://gogoanime.consumet.stream/recent-release'

  useEffect(() => {
    initRekomendasi()
    initRecent()
    document.title = 'Shiganime - Watch Anime Online'
  }, [])
  const initRecent = async () => {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => setRecent(res))
  }
  const initRekomendasi = async () => {
    await fetch('https://gogoanime.consumet.stream/popular', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => setRekomendasi(res))
  }
  return (
    <>
      <div className='bg-slate-100'>
        <Navbar />
        <RekomendasiContext.Provider value={rekomendasi}>
          <Content
            value={recent}
            pageCount={373}
            url={url}
            title={'Anime On-going'}
            linkHome={true}
          />
        </RekomendasiContext.Provider>
        <Footer bgColor='bg-slate-100' />
      </div>
    </>
  )
}
