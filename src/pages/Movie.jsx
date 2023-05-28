/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Movie() {
  const [movie, setMovie] = useState([])
  const url = `${import.meta.env.VITE_URL}/anime-movies`

  useEffect(() => {
    initMovie()
  }, [])
  const initMovie = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setMovie(res))
  }
  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='Watch anime movie subtitle English' />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, movie anime,streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Movie Anime List</title>
      </Helmet>
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
