/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'

export default function Movie() {
  const [movie, setMovie] = useState([])
  const url = `${import.meta.url}/anime-movies`

  useEffect(() => {
    initMovie()
    document.title = 'Movie Anime List'
  }, [])
  const initMovie = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setMovie(res))
  }
  return (
    <>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <Content
            value={movie}
            pageCount={105}
            url={url}
            title={'Anime Movie'}
          />
          <Footer />
        </div>
      </div>
    </>
  )
}
