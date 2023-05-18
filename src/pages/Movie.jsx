import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'

export default function Movie() {
  const [rekomendasi, setRekomendasi] = useState([])
  const [movie, setMovie] = useState([])
  const url = 'https://gogoanime.consumet.stream/anime-movies'

  useEffect(() => {
    initRekomendasi()
    initMovie()
    document.title = 'Movie Anime List'
  }, [])
  const initMovie = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setMovie(res))
  }
  const initRekomendasi = async () => {
    await fetch('https://gogoanime.consumet.stream/popular')
      .then((res) => res.json())
      .then((res) => setRekomendasi(res))
  }
  return (
    <>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <RekomendasiContext.Provider value={rekomendasi}>
            <Content
              value={movie}
              pageCount={105}
              url={url}
              title={'Anime Movie'}
            />
          </RekomendasiContext.Provider>
          <Footer />
        </div>
      </div>
    </>
  )
}
