/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [recent, setRecent] = useState([])
  const url = `${import.meta.env.VITE_URL}/recent-release`

  useEffect(() => {
    initRecent()
    document.title = 'Shiganime - Watch Anime Online'
  }, [])
  const initRecent = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setRecent(res))
  }
  return (
    <>
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
